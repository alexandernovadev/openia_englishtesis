import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { IoIosSave } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { verifyToken } from "@/utils/auth";
import GenerateExams from "@/components/exams/GenerateExams";
import ConfettiExplosion from "react-confetti-explosion";
import { Exam } from "@/interfaces/Exam";

import topicsA1 from "../../data/a1et.json";
import topicsA2 from "../../data/a2et.json";
import topicsB1 from "../../data/b1et.json";
import topicsB1plus from "../../data/b1+et.json";
import topicsB2 from "../../data/b2et.json";

const topicsMap = {
  A1: topicsA1,
  A2: topicsA2,
  B1: topicsB1,
  "B1+": topicsB1plus,
  B2: topicsB2,
};

const ExamGenerator = () => {
  const [level, setLevel] = useState("A1");
  const [difficulty, setDifficulty] = useState<Exam["difficulty"]>("HARD");
  const [ammountQuestions, setAmmountQuestions] = useState(5);
  const [examGPT, setExamGPT] = useState<Exam>();
  const [titleLecture, setTitleLecture] = useState("");
  const [generatedText, setGeneratedText] = useState<Object>();
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const [topicUser, setTopicUser] = useState(
    "Examen tipo toefl sobre gramatica B2, "
  );
  const router = useRouter();
  const { lectureID, lectureContent } = router.query;

  useEffect(() => {
    if (lectureID) {
      console.log("Lecture ID:", lectureID);
      setTitleLecture(decodeURIComponent(lectureContent as string));
    }
  }, [lectureID, lectureContent]);

  useEffect(() => {
    // @ts-ignore
    setExamGPT(generatedText);
  }, [generatedText]);

  const formatToSendToMongo = (examByGpt: Object) => {
    const dataExam = {
      ...examByGpt,
      difficulty,
      level: level as Exam["level"],
      score: 100,
      lectureID,
    } as Exam;

    setExamGPT(dataExam);
  };

  const handleSave = async () => {
    try {
      const lectureResponse = await axios.post("/api/exams", examGPT);
      console.log("Exam saved successfully", lectureResponse.data);
      setShowConfetti(true); // Show confetti
    } catch (error) {
      console.error("Exam during save process:", error);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        router.push("/exams");
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
            <h4 className="text-2xl font-bold mx-5 text-center text-white border p-2 rounded-lg">
              Exams <br /> Generator
            </h4>
            {(level === "A1" ||
              level === "A2" ||
              level === "B1" ||
              level === "B1+" ||
              level === "B2") && (
              <section>
                <h6 title="Promts" className="cursor-pointer">
                  Suggested Promts
                </h6>
                <select
                  name="propmttopic"
                  className="max-w-[500px] px-4 py-2 mb-2 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 text-white"
                  value={topicUser}
                  onChange={(e) => setTopicUser(e.target.value)}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {Object.entries(topicsMap[level]).map(([category, items]) => (
                    <optgroup
                      key={category}
                      label={category.replace(/_/g, " ")}
                    >
                      {items.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </section>
            )}

            {generatedImage && (
              <div className="flex justify-center">
                <img
                  src={`data:image/png;base64,${generatedImage}`}
                  alt="Lecture Image"
                  className="object-cover rounded-full"
                  width={64}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center items-center">
            <section className="flex flex-col items-center">
              <h6 title="Levels" className="cursor-pointer">
                Levels
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
                <option value="B1+">B1+</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </section>

            <section className="flex flex-col items-center">
              <h6 title="ammountQuestions" className="cursor-pointer">
                # Questions
              </h6>
              <select
                name="ammountQuestions"
                value={ammountQuestions}
                onChange={(e) =>
                  setAmmountQuestions(parseInt(e.target.value, 10))
                }
                className="bg-zinc-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </section>

            <section className="flex flex-col items-center">
              <h6 title="difficulty" className="cursor-pointer">
                Difficulty
              </h6>
              <select
                name="difficulty"
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as Exam["difficulty"])
                }
                className="bg-zinc-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={"HARD"}>Hard</option>
                <option value={"EASY"}>Easy</option>
                <option value={"MEDIUM"}>Middle</option>
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

        <GenerateExams
          level={level}
          lecture={titleLecture}
          ammountQuestions={ammountQuestions}
          sendExamJSON={formatToSendToMongo}
          topicUser={topicUser}
          setTopicUser={setTopicUser}
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

export default ExamGenerator;
