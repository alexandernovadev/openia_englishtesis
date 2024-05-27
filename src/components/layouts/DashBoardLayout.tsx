// src/components/layouts/DashboardLayout.tsx
import React from "react";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { GiVendingMachine } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { GiGearHammer } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { logout } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/router";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const role = useSelector((state: RootState) => state.user.role);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    logout(dispatch, clearUser);

    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Failed to logout:", error);
    }

    router.push("/auth/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-gray-800 flex flex-col items-center pb-4 space-y-4 p-2 relative">
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

        {role === "administrator" && (
          <>
            <hr />
            <h6 style={{ fontSize: 12 }}>Admin</h6>

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
          </>
        )}

        <div className="flex-1"></div>
        <div className=" w-full">
          <button
            onClick={handleLogout}
            className="text-red-500 cursor-pointer mt-auto w-full"
            title="Logout"
          >
            <IoLogOutOutline className="text-4xl" />
          </button>
        </div>
      </div>
      <div className="w-full h-full my-6 flex justify-center">
        <section className="w-full max-w-[1080px]">{children}</section>
      </div>
    </div>
  );
};

export default DashboardLayout;
