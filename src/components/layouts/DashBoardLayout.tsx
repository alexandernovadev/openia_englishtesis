import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
        {/* Icons */}
        <div className="text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 4v16h18V4H3zm16 14H5V8h14v10zM9 10h6v2H9v-2z" />
          </svg>
        </div>
        <div className="text-green-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </div>
        <div className="text-blue-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7l-5 5h10z" />
          </svg>
        </div>
        <div className="text-orange-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16l8-8z" />
          </svg>
        </div>
        <div className="text-purple-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="text-pink-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2v20m-7-7h14" />
          </svg>
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
