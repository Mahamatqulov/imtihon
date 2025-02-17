import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useMemo } from "react";

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
      clientName: formData.get("clientName") || data?.clientName || "",
      clientEmail: formData.get("clientEmail") || data?.clientEmail || "",
      senderAddress: {
        street:
          formData.get("senderStreet") || data?.senderAddress?.street || "",
        city: formData.get("senderCity") || data?.senderAddress?.city || "",
        postCode:
          formData.get("senderPostCode") || data?.senderAddress?.postCode || "",
        country:
          formData.get("senderCountry") || data?.senderAddress?.country || "",
      },
      clientAddress: {
        street:
          formData.get("clientStreet") || data?.clientAddress?.street || "",
        city: formData.get("clientCity") || data?.clientAddress?.city || "",
        postCode:
          formData.get("clientPostCode") || data?.clientAddress?.postCode || "",
        country:
          formData.get("clientCountry") || data?.clientAddress?.country || "",
      },
      createdAt:
        formData.get("invoiceDate") ||
        data?.createdAt ||
        new Date().toISOString().split("T")[0],
      paymentTerms:
        formData.get("paymentTerms") || data?.paymentTerms || "Net 30 Days",
      description:
        formData.get("projectDescription") ||
        data?.description ||
        "No description",

      items: items.map((item, index) => ({
        id: item.id || Date.now() + index,
        name: formData.get(`itemName-${index}`) ?? item.name ?? "New Item",
        quantity: Number(formData.get(`qty-${index}`)) ?? item.quantity ?? 1,
        price: Number(formData.get(`price-${index}`)) ?? item.price ?? 0,
        total:
          (Number(formData.get(`qty-${index}`)) ?? 1) *
          (Number(formData.get(`price-${index}`)) ?? 0),
      })),
      totalAmount: totalAmount,
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

      toast.success("Malumotlar yangilandi!");
      if (onUpdate) {
        onUpdate(result);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Xatolik yuz berdi!");
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
  const totalAmount = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.total ?? 0), 0);
  }, [items]);

  const addNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };
  const handleItemChange = (index, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
              total:
                field === "quantity"
                  ? Number(value) * item.price
                  : field === "price"
                  ? item.quantity * Number(value)
                  : item.total,
            }
          : item
      )
    );
  };

  const removeItem = (index) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== items[index].id)
    );
  };

  if (loading) return <p className="text-center mt-5">Yuklanmoqda...</p>;

  return (
    <>
      <Toaster richColors position="top-right" />
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full  max-w-3xl  p-24 pr-0 bg-white dark:bg-[#1E2139] shadow-lg transition-transform transform ${
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
                  name="clientStreet"
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
                    name="clientCity"
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
                    name="clientPostCode"
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
                    name="clientCountry"
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
                className="input w-full mb-6 border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
              />
            </label>

            <table>
              <thead>
                <tr className=" text-[#7E88C3] dark:text-white flex gap-10">
                  <th className="p-3">Item Name</th>
                  <th className="ml-[115px] flex gap-10">
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
                    className="flex items-center justify-around  rounded-lg "
                  >
                    <input
                      type="text"
                      name={`itemName-${index}`}
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      className="input border mt-2 border-gray-300 dark:bg-[#252945] p-2 rounded-md"
                    />

                    <input
                      type="number"
                      name={`qty-${index}`}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="input  border max-w-[50px] mt-2 border-gray-300 dark:bg-[#252945] px-3 py-2 rounded-md"
                    />

                    <input
                      type="number"
                      name={`price-${index}`}
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", Number(e.target.value))
                      }
                      className="input  border max-w-[90px] mt-2 border-gray-300 dark:bg-[#252945] px-4 py-2 rounded-md"
                    />

                    <span className=" text-center dark:bg-[#252945] p-2 rounded-md">
                      £{(item.total || 0).toFixed(2)}
                    </span>

                    <Button onClick={() => removeItem(index)} className=" ">
                      <MdOutlineDelete className="text-2xl" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
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
