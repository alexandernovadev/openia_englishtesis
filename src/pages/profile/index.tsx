import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DashboardLayout from "@/components/layouts/DashBoardLayout";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center p-6 bg-zinc-800 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4 text-green-500">User Profile</h1>
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 capitalize">{user.username}</p>
          <p className="text-lg text-zinc-400 mb-2">{user.email}</p>
          <p className="text-md text-zinc-500">
            Role: <span className="capitalize">{user.role}</span>
          </p>
          <p className="text-md text-zinc-500">
            Language Preference: <span>{user.languagePreference}</span>
          </p>
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
