import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";
import { GiThink } from "react-icons/gi";
import { Feedback } from "@/interfaces/ExamResult";

interface Props {
  feedback: string;
  status: Feedback["status"];
}

export const AlertsResponse = ({ feedback, status }: Props) => {
  let bgColorClass = "";
  let borderColorClass = "";
  let iconColorClass = "";
  let message = "";
  let icon = <FaCheckCircle className="fill-current h-6 w-6 mr-4" />;

  switch (status) {
    case "WELLDONE":
      bgColorClass = "bg-green-100";
      borderColorClass = "border-green-500";
      iconColorClass = "text-green-500";
      message = "Well Done!";
      icon = <FaCheckCircle className="fill-current h-6 w-6 mr-4" />;
      break;
    case "WRONG":
      bgColorClass = "bg-red-100";
      borderColorClass = "border-red-500";
      iconColorClass = "text-red-500";
      message = "Incorrect";
      icon = <BiSolidErrorAlt className="fill-current h-6 w-6 mr-4" />;
      break;
    case "SO-SO":
      bgColorClass = "bg-yellow-100";
      borderColorClass = "border-yellow-500";
      iconColorClass = "text-yellow-500";
      message = "Needs Improvement";
      icon = <GiThink className="fill-current h-6 w-6 mr-4" />;
      break;
    default:
      bgColorClass = "bg-gray-100";
      borderColorClass = "border-gray-500";
      iconColorClass = "text-gray-500";
      message = "Feedback";
  }

  return (
    <div
      className={`${bgColorClass} border-t-4 mt-8 ${borderColorClass} rounded-b text-teal-900 px-4 py-3 shadow-md`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">{icon}</div>
        <div>
          <p className="font-bold">{message}</p>
          <p className="text-sm">{feedback}</p>
        </div>
      </div>
    </div>
  );
};
