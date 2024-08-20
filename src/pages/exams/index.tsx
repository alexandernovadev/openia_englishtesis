import MultipleChoiceQuestion from "@/components/exams/MultipleQuestion";
import SingleChoiceQuestion from "@/components/exams/SingleChoiceQuestion";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { Exam } from "@/interfaces/Exam";
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Title 
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Questions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-800 divide-y divide-gray-700">
              {examData &&
                examData.map((exam) => (
                  <tr key={exam._id} className="hover:bg-zinc-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{exam.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {new Date(exam.createdAt!).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{exam.questions.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/exams/${exam._id}`}
                        className="w-[200px] text-xl p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ExamsPage;
