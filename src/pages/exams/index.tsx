import MultipleChoiceQuestion from "@/components/exams/MultipleQuestion";
import SingleChoiceQuestion from "@/components/exams/SingleChoiceQuestion";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { Exam, Question } from "@/interfaces/Exam";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ExamsPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [examData, setExamData] = useState<Exam[]>([]);
  const router = useRouter();

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const getExam = async () => {
    try {
      const lectureResponse = await axios.get("/api/exams");
      console.log("Exam getting successfully", lectureResponse.data);
      setExamData(lectureResponse.data);
    } catch (error) {
      console.error("Exam during save process:", error);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  return (
    <DashboardLayout>
      <div className="my-2 mx-4">
        <h1 className="font-bold text-5xl">Exams</h1>

        {isLoad && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <section className="h-[680px] overflow-scroll my-6">
          {examData &&
            examData.map((exam) => (
              <div
                key={exam._id}
                className="my-3 bg-zinc-800 shadow rounded-lg flex items-center space-x-4"
              >
                {" "}
                <div className="px-2 py-2 flex flex-col">
                  <h2 className="text-2xl font-bold mb-2">{exam.title}</h2>
                  <p className="text-zinc-600">
                    Created at: {new Date(exam.createdAt!).toLocaleDateString()}
                  </p>
                  <>Prguntas : {exam.questions.length}</>
                  <Link
                    href={`/exams/${exam._id}`}
                    className="w-[200px] text-xl p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            ))}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ExamsPage;
