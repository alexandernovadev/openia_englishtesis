import React from "react";
import DashboardLayout from "../layouts/DashBoardLayout";

export const LecureSkeleton = () => {
  return (
    <DashboardLayout>
      <div className="mt-5 bg-gray-900 w-full h-screen p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-800 rounded"></div>
          <div className="flex flex-row justify-center items-center gap-3">
            <div className="h-48 w-48 bg-gray-800 rounded-full"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-10 bg-gray-800 rounded"></div>
              <div className="h-6 bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
