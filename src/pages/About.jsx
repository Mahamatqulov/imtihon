import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { GoChevronLeft } from "react-icons/go";
import Sidebar from "../components/Sidebar";

import { Button } from "@/components/ui/button";
import InvoiceEdit from "../components/InvoiceEdit";
import { useNavigate } from "react-router-dom";
export default function About() {
  const { id } = useParams();
  const location = useLocation();
  const [invoice, setInvoice] = useState(location.state?.invoice);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!invoice) return;

    try {
      const response = await fetch(`http://localhost:3000/data/${invoice.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ma'lumotni o‘chirishda xatolik yuz berdi!");
      }

      localStorage.removeItem("invoice");
      setInvoice(null);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  const handlePaid = async () => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      if (!response.ok) {
        throw new Error("Xatolik yuz berdi!");
      }

      const result = await response.json();
      setInvoice(result);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleInvoiceUpdate = (updatedInvoice) => {
    setInvoice(updatedInvoice);
  };

  useEffect(() => {
    if (!invoice) {
      const savedInvoice = JSON.parse(localStorage.getItem("invoice"));
      if (savedInvoice) {
        setInvoice(savedInvoice);
      }
    } else {
      localStorage.setItem("invoice", JSON.stringify(invoice));
    }
  }, [invoice]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="lg:flex h-full">
      <Sidebar />
      <div className="max-w-4xl w-full mx-auto py-8 px-6">
        <Link to={`/`} className="font-extrabold flex items-center mb-6">
          <GoChevronLeft className="text-purple-600 text-xl" /> Go back
        </Link>

        <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-semibold">Status</span>
            <button
              className={`px-7 py-2 capitalize w-[115px] bg-opacity-50 text-center rounded-md font-extrabold text-md flex gap-2 items-center justify-center
                ${
                  invoice.status === "paid" ? "bg-green-100 text-[#33D69F]" : ""
                }
                ${
                  invoice.status === "pending"
                    ? "bg-orange-100 text-[#FF8F00]"
                    : ""
                }
                ${
                  invoice.status === "draft" ? "bg-gray-100 text-[#373B53]" : ""
                }`}
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    (invoice.status || "").toLowerCase() === "paid"
                      ? "bg-green-500"
                      : (invoice.status || "").toLowerCase() === "pending"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                ></span>
              </div>

              {invoice.status}
            </button>
          </div>
          <div className="flex gap-4">
            <InvoiceEdit
              trigger={
                <Button className="btn text-black rounded-full bg-[#F9FAFE]">
                  Edit
                </Button>
              }
              onUpdate={handleInvoiceUpdate}
            />
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full"
            >
              Delete
            </button>
            {isOpen && (
              <div
                className="fixed inset-0 flex items-center  rounded-md justify-center bg-gray-500/75"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-white rounded-md shadow-xl sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h3 className="text-base font-extrabold text-gray-900">
                          Confirm Deletion
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Are you sure you want to delete invoice{" "}
                          <span className="">#{id}</span> This action cannot be
                          undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-5 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-3 bg-white px-4 py-2 rounded-full text-gray-900 border sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {invoice?.status !== "paid" ? (
              <button
                onClick={handlePaid}
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full"
              >
                Mark as Paid
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E2139] p-8 rounded-lg custom-scrollbar bg-scroll  overflow-y-scroll h-[500px] shadow-md mt-6">
          <div className="flex justify-between ">
            {" "}
            <div>
              <h2 className="text-2xl font-bold text-[#0C0E16] dark:text-[#ffffff]">
                #{id}
              </h2>
              <p className="text-gray-500">{invoice.description}</p>
            </div>
            <div>
              <p className="text-gray-500 w-[170px] text-right">
                {invoice.senderAddress.street}
              </p>
              <p className="text-gray-500 w-[170px] text-right">
                {invoice.senderAddress.city}
              </p>
              <p className="text-gray-500 w-[170px] text-right">
                {invoice.senderAddress.postCode}
              </p>
              <p className="text-gray-500 w-[170px] text-right">
                {invoice.senderAddress.country}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-6 ">
            <div className="g">
              <div className="mb-5">
                <p className="text-gray-500 font-normal mb-2 ">Invoice Date</p>
                <p className="font-bold text-lg">
                  {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500 font-normal mb-2">Payment Due</p>
                <p className="font-bold text-lg">
                  {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Bill To</p>
              <p className="font-bold text-lg">
                {invoice.clientAddress.street}
              </p>
              <p className="text-gray-500 pt-1">{invoice.clientAddress.city}</p>
              <p className="text-gray-500 pt-1">
                {invoice.clientAddress.postCode}
              </p>
              <p className="text-gray-500 pt-1">
                {invoice.clientAddress.country}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Sent to</p>
              <p className="font-bold text-lg">{invoice.clientEmail}</p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-[#252945] rounded-t-lg mt-6 p-6">
            <table className="w-full text-left mt-6">
              <thead>
                <tr className="text-[#7E88C3] dark:text-white">
                  <th className="p-3">Item Name</th>
                  <th className="p-3">QTY</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice?.items?.length > 0 ? (
                  invoice.items.map((value, index) => (
                    <tr
                      key={index}
                      className="bg-gray-100 dark:bg-[#252945] text-gray-900 dark:text-white"
                    >
                      <td className="p-3 font-bold">
                        {value.name || "Unknown"}
                      </td>
                      <td className="p-3 font-extrabold text-gray-500 dark:text-[#DFE3FA]">
                        {value.quantity || 0}
                      </td>
                      <td className="p-3 font-extrabold text-gray-500 dark:text-[#DFE3FA]">
                        £{value.price || 0}
                      </td>
                      <td className="p-3 font-extrabold">
                        £{(value.total || 0).toFixed()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-3 text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-[#373B53] text-white p-6 rounded-b-lg flex justify-between items-center">
            <span className="text-lg font-semibold">Amount Due</span>
            <span className="text-2xl font-bold">
              £{(invoice.total || 0).toFixed()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
