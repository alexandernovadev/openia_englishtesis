// src/pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { verifyToken } from "../utils/auth";
import { getCookie } from "../utils/cookies";
import GenerateText from "@/components/exams/GenerateTexts";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Dashboard
        </h2>
        <p className="text-center text-white">Welcome to your dashboard!</p>
        <GenerateText />
      </div>
    </div>
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
