import { GetServerSideProps } from "next";
import { verifyToken } from "../utils/auth";
import { getCookie } from "../utils/cookies";
import GenerateTexts from "../components/exams/GenerateTexts";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { IoIosSave } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [level, setLevel] = useState("A1");
  const [paragraphs, setParagraphs] = useState(1);
  const [content, setContent] = useState("");
  const [topic, setTopicUserDB] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    setContent(generatedText);
  }, [generatedText]);

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/lectures", {
        lectureID: new Date().getTime().toString(), // Generar un ID único
        content,
        level,
        topic: "Generated Topic", // Puedes ajustar esto según sea necesario
      });

      console.log("Lecture saved successfully", response.data);
    } catch (error) {
      console.error("Error saving the lecture", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-900 p-4 w-full h-full">
        <section className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6 mx-5 text-center text-white">
            Lectures <br /> Generator
          </h2>

          <div className="flex gap-4 justify-center items-center">
            <section className="flex flex-col items-center">
              <h6 title="Levels" className="cursor-pointer">
                Levels{" "}
              </h6>
              <select
                name="levels"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </section>

            <section className="flex flex-col items-center">
              <h6 title="paragraphs" className="cursor-pointer">
                Levels{" "}
              </h6>
              <select
                name="paragraphs"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
                className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </section>

            <section className="flex flex-col items-center">
              <h4 title="Save" className="cursor-pointer">
                &nbsp;
              </h4>
              <button
                onClick={handleSave}
                className="text-4xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <IoIosSave />
              </button>
            </section>
          </div>
        </section>

        <GenerateTexts
          level={level}
          paragraphs={paragraphs}
          setTopicUserDB={setTopicUserDB}
          onTextUpdate={setGeneratedText}
        />
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
