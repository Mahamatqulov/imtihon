import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MdOutlineDelete } from "react-icons/md";
import { useRef, useState } from "react";
import { objectCreater } from "../lib/utils/object-create";
import { Toaster, toast } from "sonner";

export default function DrawerExample({ trigger }) {
  const drawerRef = useRef(null);
  const formRef = useRef(null);
  const [items, setItems] = useState([]);

  const handleDiscard = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setItems([]);
  };

  const addNewItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0.0 }]);
  };
  const hanlReolaod = () => {
    window.location.reload();
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const itemNames = formData.getAll("itemName");
    const quantities = formData.getAll("qty");
    const prices = formData.getAll("price");

    const items = itemNames.map((name, index) => ({
      name,
      quantity: Number(quantities[index]),
      price: Number(prices[index]),
      total: Number(prices[index]) * Number(quantities[index]),
    }));
    const submitter = e.nativeEvent.submitter;
    const status = submitter.dataset.status;

    const invoiceData = objectCreater({
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: data.invoiceDate,
      description: data.projectDescription,
      paymentTerms: data.paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,

      status,
      senderStreet: data.senderStreet,
      senderCity: data.senderCity,
      senderPostCode: data.senderPostCode,
      senderCountry: data.senderCountry,
      street: data.streetAddress,
      city: data.city,
      postCode: data.postCode,
      country: data.country,
      items,
    });

    console.log("Yangi Invoice:", invoiceData);

    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error("Serverga ma'lumot yuborishda xatolik!");
      }

      const result = await response.json();
      toast.success("Yangi malumot qo'shildi!");
      console.log("Yangi Invoice qo‘shildi:", result);
      hanlReolaod();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  }

  return (
    <Sheet>
      <Toaster richColors position="top-right" />
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="left"
        className="p-24  pr-0 min-w-[800px]  bg-base-200 text-base-content bg-white dark:bg-[#1E2139]"
      >
        <form
          onSubmit={getFormData}
          className="flex-1 custom-scrollbar bg-scroll  overflow-y-scroll h-[630px] space-y-6 md:space-y-8"
        >
          <div className="mx-auto p-6   shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">New Invoice</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#7C5DFA]">
                Bill From
              </h3>
              <label className="">
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Street Address
                </span>
                <input
                  type="text"
                  name="senderAddress"
                  mainName="Street Address"
                  className="input w-full  max-w-none mt-2 mb-5 border border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <div className="grid grid-cols-3 gap-5 mt-2">
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    City
                  </span>
                  <input
                    type="text"
                    name="senderCity"
                    mainName="City"
                    className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    Post Code
                  </span>
                  <input
                    type="text"
                    name="senderPostCode"
                    mainName="Post Code"
                    className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    Country
                  </span>
                  <input
                    type="text"
                    name="senderCountry"
                    mainName="Country"
                    className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#7C5DFA]">Bill To</h3>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Client's Name
                </span>
                <input
                  type="text"
                  name="clientName"
                  mainName="Client’s Name"
                  className="input w-full mb-5 border border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Client's Email
                </span>
                <input
                  type="email"
                  name="clientEmail"
                  mainName="Clients Email"
                  placeholder="alexgrim@mail.com"
                  className="input w-full mt-2 mb-5 border border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Street Address
                </span>
                <input
                  type="text"
                  name="streetAddress"
                  mainName="Street Address"
                  className="input w-full mt-2 mb-5 border border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    City
                  </span>
                  <input
                    type="text"
                    name="city"
                    mainName="City"
                    className="input w-full border mt-2 mb-10 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    Post Code
                  </span>
                  <input
                    type="text"
                    name="postCode"
                    mainName="Post Code"
                    className="input w-full border mt-2 mb-10 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
                <label>
                  <span className="text-[#7E88C3] font-normal text-[15px]">
                    Country
                  </span>
                  <input
                    type="text"
                    name="country"
                    mainName="Country"
                    className="input w-full border mt-2 mb-10 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Invoice Date
                </span>
                <input
                  type="date"
                  name="invoiceDate"
                  mainName="Invoice Date"
                  className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Payment Terms
                </span>
                <select
                  name="paymentTerms"
                  mainName="Payment Terms"
                  className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-3 rounded-md"
                >
                  <option>Net 30 Days</option>
                  <option>Net 14 Days</option>
                  <option>Net 7 Days</option>
                  <option>Net 1 Days</option>
                </select>
              </label>
            </div>

            <label>
              <span className="text-[#7E88C3] font-normal text-[15px]">
                Project Description
              </span>
              <input
                type="text"
                name="projectDescription"
                mainName="Project Description"
                placeholder="Project Description"
                className="input w-full mb-6 border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
              />
            </label>

            <table>
              <thead>
                <tr className=" text-[#7E88C3] dark:text-white flex gap-10">
                  <th className="p-3">Item Name</th>
                  <th className="ml-[120px] flex gap-12">
                    <th className="p-3">QTY</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Total</th>
                  </th>
                </tr>
              </thead>
            </table>

            <div>
              {items.length === 0 ? (
                <p className="text-gray-500 text-center"></p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg w-full"
                  >
                    <input
                      type="text"
                      name="itemName"
                      mainName="Item Name"
                      className="input border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <input
                      type="text"
                      name="qty"
                      mainName="Qty."
                      className="input w-[40px] border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <input
                      type="text"
                      name="price"
                      mainName="Price"
                      className="input  w-[60px] border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <span className=" w-[30px] mt-2  dark:bg-[#252945] p-2 rounded-md">
                      {item.qty * item.price}
                    </span>
                    <Button className=" ">
                      <MdOutlineDelete
                        onClick={() => removeItem(index)}
                        className="text-2xl"
                      />
                    </Button>
                  </div>
                ))
              )}
            </div>
            <Button
              type="button"
              onClick={addNewItem}
              className="btn btn-block dark:bg-[#252945] rounded-full py-3 font-extrabold  text-[#7E88C3] bg-[#F9FAFE] px-10 w-full mb-4"
            >
              + Add New Item
            </Button>

            <div className="flex justify-between rounded-xl bg-white py-8 px-4 bg-inherit dark:bg-[#252945] sticky bottom-0 left-0">
              <Button
                type="button"
                onClick={handleDiscard}
                className="btn btn-outline"
              >
                Discard
              </Button>
              <div className="flex gap-2">
                <Button type="submit" data-status="draft" className="">
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  data-status="pending"
                  className=" btn bg-[#9277FF]"
                >
                  Save & Send
                </Button>
              </div>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
