import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { IoIosSave } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { verifyToken } from "@/utils/auth";
import GenerateTexts from "@/components/exams/GenerateTexts";
import ConfettiExplosion from "react-confetti-explosion";

const LectureGenerator = () => {
  const [level, setLevel] = useState("A1");
  const [paragraphs, setParagraphs] = useState(1);
  const [content, setContent] = useState("");
  const [topic, setTopicUserDB] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setContent(generatedText);
  }, [generatedText]);

  const handleSave = async () => {
    try {
      const lectureResponse = await axios.post("/api/lectures", {
        content,
        level,
        topic,
        img: generatedImage,
      });

      console.log("Lecture saved successfully", lectureResponse.data);
      setShowConfetti(true);
    } catch (error) {
      console.error("Error during save process:", error);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        router.push("/lectures");
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [showConfetti, router]);

  return (
    <DashboardLayout>
      {showConfetti && <ConfettiExplosion />}
      <div className="bg-zinc-900 p-4 w-full h-full">
        <section className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold mx-5 text-center text-white">
              Lectures <br /> Generator
            </h2>

            {generatedImage && (
              <div className="flex justify-center ">
                <img
                  src={`data:image/png;base64,${generatedImage}`}
                  alt="Lecture Image"
                  className=" object-cover rounded-full"
                  width={64}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center items-center">
            <section className="flex flex-col items-center">
              <h6 title="Levels" className="cursor-pointer">
                Levels{" "}
              </h6>
              <select
                name="levels"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="bg-zinc-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Paragraphs{" "}
              </h6>
              <select
                name="paragraphs"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
                className="bg-zinc-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </section>

            {content && (
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
            )}
          </div>
        </section>

        <GenerateTexts
          level={level}
          paragraphs={paragraphs}
          setTopicUserDB={setTopicUserDB}
          onTextUpdate={setGeneratedText}
          setGeneratedImage={setGeneratedImage}
          generatedImage={generatedImage}
        />
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.auth;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.role !== "administrator") {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LectureGenerator;
