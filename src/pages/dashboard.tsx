// src/pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { verifyToken } from "../utils/auth";
import { getCookie } from "../utils/cookies";
import  GenerateTexts  from "../components/exams/GenerateTexts";
import DashboardLayout from "@/components/layouts/DashBoardLayout";

const Dashboard: React.FC = () => {
  return (

    <DashboardLayout>
      <div className="bg-gray-900 p-4 w-full h-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Generate Lectures
        </h2>
        <GenerateTexts />

      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(context.req, "auth");

  if (!token || !verifyToken(token)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pasamos las props necesarias al componente
  };
};

export default Dashboard;
