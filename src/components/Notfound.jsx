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

export default function Notfound() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status === filter)
      );
    }
  }, [filter, invoices]);

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
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="./notFound.svg"
            alt="Empty state illustration"
            width={300}
            height={300}
            className="mb-8"
          />
          <h2 className="mb-4 text-2xl font-bold">There is nothing here</h2>
          <p className="text-center text-gray-500">
            Create an invoice by clicking the
            <span className="mx-1 text-violet-500">New Invoice</span>
            button and get started
          </p>
        </div>
      </div>
    </div>
  );
}
