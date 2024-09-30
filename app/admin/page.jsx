"use client";
import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  };

  const deleteEmails = async (mongoId) => {
    const response = await axios.delete(`/api/email`, {
      params: { id: mongoId },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scroll-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3" scope="col">
                Email Subscription
              </th>
              <th className=" hidden sm:block px-6 py-3" scope="col">
                Date
              </th>
              <th className="px-6 py-3" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 text-left">
            {emails.map((item, index) => (
              <SubsTableItem
                key={item._id}
                mongoId={item._id}
                email={item.email}
                date={item.date}
                deleteEmails={deleteEmails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
