import Login from "@/components/auth/Login";
import { verifyToken } from "@/utils/auth";
import { getCookie } from "@/utils/cookies";
import { GetServerSideProps } from "next";

function Home() {
  return (
    <>
      <Login />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(context.req, "auth");

  if (token && verifyToken(token)) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pasamos las props necesarias al componente
  };
};

export default Home;
