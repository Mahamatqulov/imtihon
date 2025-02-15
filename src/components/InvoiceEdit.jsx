import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function InvoiceEdit({ trigger, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);

  async function updateInvoice(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedData = {
      clientName: formData.get("clientName"),
      clientEmail: formData.get("clientEmail"),
      senderAddress: {
        street: formData.get("senderStreet"),
        city: formData.get("senderCity"),
        postCode: formData.get("senderPostCode"),
        country: formData.get("senderCountry"),
      },
      clientAddress: {
        street: formData.get("clientStreet"),
        city: formData.get("clientCity"),
        postCode: formData.get("clientPostCode"),
        country: formData.get("clientCountry"),
      },
      createdAt: formData.get("invoiceDate"),
      paymentTerms: formData.get("paymentTerms"),
      description: formData.get("projectDescription"),
      items,
    };

    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Yangilashda xatolik!");

      const result = await response.json();

      setData(result);
      setItems(updatedData.items);

      alert(" Invoice muvaffaqiyatli yangilandi!");
      if (onUpdate) {
        onUpdate(result);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi!");
    }
  }
  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/data/${id}`, {});
        if (!response.ok) throw new Error("Ma'lumotni yuklashda xatolik!");
        const invoiceData = await response.json();
        setData(invoiceData);
        setItems(invoiceData.items);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const addNewItem = (e) => {
    e.preventDefault();
    setItems((prevItems) => [...prevItems, ...updatedData.items]);
  };

  const removeItem = (index) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== items[index].id)
    );
  };

  if (loading) return <p className="text-center mt-5">Yuklanmoqda...</p>;

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[800px] p-24 pr-0 bg-white dark:bg-[#1E2139] shadow-lg  transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-10`}
      >
        <h2 className="text-2xl ml-6 font-bold mb-4">Edit #{id}</h2>

        <form
          ref={formRef}
          onSubmit={updateInvoice}
          className="flex-1 custom-scrollbar bg-scroll  overflow-y-scroll h-[550px] space-y-6 md:space-y-8"
        >
          <div className="mx-auto p-6   shadow-md rounded-lg">
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
                  name="senderStreet"
                  mainName="Street Address"
                  defaultValue={data?.senderAddress?.street}
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
                    defaultValue={data?.senderAddress?.city}
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
                    defaultValue={data?.senderAddress?.postCode}
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
                    defaultValue={data?.senderAddress?.country}
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
                  mainName=" Client's Name"
                  defaultValue={data?.clientName}
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
                  mainName="Client's Email"
                  defaultValue={data?.clientEmail}
                  className="input w-full mt-2 mb-5 border border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Street Address
                </span>
                <input
                  type="text"
                  name="clientAddress"
                  mainName="clientAddress"
                  defaultValue={data?.clientAddress?.street}
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
                    defaultValue={data?.clientAddress?.city}
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
                    defaultValue={data?.clientAddress?.postCode}
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
                    defaultValue={data?.clientAddress?.country}
                    className="input w-full border mt-2 mb-10 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  invoiceData Date
                </span>
                <input
                  type="date"
                  name="invoiceDate"
                  defaultValue={data?.createdAt}
                  mainName=" invoice Data"
                  className="input w-full border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                />
              </label>
              <label>
                <span className="text-[#7E88C3] font-normal text-[15px]">
                  Payment Terms
                </span>
                <select
                  defaultValue={data?.paymentTerms}
                  name="paymentTerms"
                  mainName=" Payment Terms"
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
                name="description"
                defaultValue={data?.description}
                mainName="  Project Description"
                className="input w-full mb-6 border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
              />
            </label>

            <table>
              <thead>
                <tr className=" text-[#7E88C3] dark:text-white flex gap-10">
                  <th className="p-3">Item Name</th>
                  <div className="ml-[115px] flex gap-10">
                    <th className="p-3">QTY</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Total</th>
                  </div>
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
                      defaultValue={item.name}
                      mainName="Item name"
                      className="input border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <input
                      type="text"
                      name="qty"
                      mainName="qty"
                      defaultValue={item.quantity}
                      className="input w-[30px] border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <input
                      type="text"
                      name="price"
                      mainName="price"
                      defaultValue={(item.price || 0).toFixed(2)}
                      className="input  w-[80px] border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <span className="">
                      £
                      {(Number(item.quantity) || 0) * (Number(item.price) || 0)}
                    </span>
                    <Button onClick={() => removeItem(index)} className=" ">
                      <MdOutlineDelete className="text-2xl" />
                    </Button>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={addNewItem}
              className="btn btn-block mt-4 dark:bg-[#252945] rounded-full py-3 font-extrabold  text-[#7E88C3] bg-[#F9FAFE] px-10 w-full mb-4"
            >
              + Add New Item
            </button>
            <div className="flex justify-end  rounded-xl bg-white py-8 pr-4 bg-inherit dark:bg-[#252945] gap-6 mt-4 sticky bottom-0 left-0">
              <button
                className="border border-gray-300 py-2 px-4 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Discard
              </button>
              <div className="flex gap-2">
                <button
                  type="submit"
                  data-status="pending"
                  className="bg-[#9277FF] text-white py-2 px-4 rounded-full"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
