import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import DrawerExample from "./SheetSide";
import Notfound from "./Notfound";

export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status === filter)
      );
    }
  }, [filter, invoices]);

  if (filteredInvoices.length === 0) {
    return <Notfound />;
  }
  return (
    <div className="bg-gray-50 w-screen dark:bg-[#141625]">
      <div className="max-w-5xl h-[100vh]  mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">
              There are {filteredInvoices.length} total invoices
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <div className="cursor-pointer">
              <DrawerExample
                trigger={
                  <Button
                    variant="primary"
                    className="bg-[#7C5DFA] hover:bg-[#9277FF] h-12 px-2 gap-4 rounded-full font-bold text-[15px] cursor-pointer"
                  >
                    <div className="bg-white rounded-full p-[10px]">
                      <Plus className="h-4 w-4 text-[#7C5DFA]" />
                    </div>{" "}
                    New Invoice
                  </Button>
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y custom-scrollbar bg-scroll  overflow-y-scroll h-[600px]">
          {filteredInvoices &&
            filteredInvoices.map((invoice) => {
              return (
                <Link
                  key={invoice.id}
                  to={`/about/${invoice.id}`}
                  state={{ invoice }}
                >
                  <div className="bg-white dark:bg-[#1E2139] rounded-lg p-6 mb-[16px] shadow-sm hover:border-[#7C5DFA] hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <span className="text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px] w-[31px]">
                            #
                          </span>
                          <span className="text-[#0C0E16] text-xl font-bold dark:text-white">
                            {invoice.id}
                          </span>
                        </div>
                        <div className="text-[#888EB0] text-md font-normal">
                          <span>Due </span>
                          {invoice.paymentDue
                            ? new Date(invoice.paymentDue).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </div>
                        <div className="text-[#888EB0] text-md font-normal">
                          {invoice.clientName}
                        </div>
                        <div className="font-bold text-xl">
                          £{" "}
                          {(invoice.total || 0).toLocaleString("en-GB", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
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
                                  : (invoice.status || "").toLowerCase() ===
                                    "pending"
                                  ? "bg-orange-500"
                                  : "bg-gray-500"
                              }`}
                            ></span>
                          </div>

                          {invoice.status}
                        </button>
                        <ChevronRight className="text-[#7C5DFA]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
