import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { GiVendingMachine } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import logo from "../../../public/images/logo.webp";
import { SlDocs } from "react-icons/sl";
import { GiGearHammer } from "react-icons/gi";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="w-16 bg-gray-800 flex flex-col items-center pb-4 space-y-4 p-2">

        <Link href="/profile">
          <div className="text-green-500 cursor-pointer">
            <RxAvatar className="text-4xl" />
          </div>
        </Link>
   
        <Link href="/exams">
          <div className="text-amber-500 cursor-pointer">
            <SlDocs className="text-4xl" />
          </div>
        </Link>
        <Link href="/lectures">
          <div className="text-pink-500 cursor-pointer">
            <FaBookReader className="text-4xl" />
          </div>
        </Link>
        <hr />
        <h6 style={{fontSize:12}}>Admin</h6>
        <Link href="/examsgenerator">
          <div className="text-purple-500 cursor-pointer">
            <GiGearHammer className="text-4xl" />
          </div>
        </Link>
        <Link href="/lecturegenerator">
          <div className="text-yellow-500 cursor-pointer">
            <GiVendingMachine className="text-4xl" />
          </div>
        </Link>

     
      </div>
      <div className="w-full h-full my-6 flex justify-center ">
        <section className="w-full max-w-[1080px]">{children}</section>
      </div>
    </div>
  );
};

export default DashboardLayout;
