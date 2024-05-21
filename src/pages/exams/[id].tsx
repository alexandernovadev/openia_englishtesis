import DashboardLayout from "@/components/layouts/DashBoardLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircle, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { Exam } from "@/interfaces/Exam";
import SingleChoiceQuestion from "@/components/exams/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/exams/MultipleQuestion";

const ExamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [examData, setExamData] = useState<Exam>();
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [isGraded, setIsGraded] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchExamData = async () => {
        try {
          const response = await fetch(`/api/exams/${id}`);
          const data = await response.json();
          setExamData(data);
          console.log(`${JSON.stringify(data, null, 2)}`);
        } catch (error) {
          console.error("Failed to fetch exam data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchExamData();
    }
  }, [id]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleCalificate = () => {
    console.log("User's answers:", answers);
    setIsGraded(true);
  };

  const RenderQuestion = (question: any) => {
    const userAnswer = answers[question._id];
    let isCorrect = false;

    if (question.type === "UNIQUE") {
      isCorrect = userAnswer === question.correctAnswer;
    } else if (question.type === "MULTIPLE") {
      isCorrect = Array.isArray(userAnswer) && Array.isArray(question.correctAnswer) && 
                  userAnswer.sort().toString() === question.correctAnswer.sort().toString();
    }

    return (
      <div key={question._id} className="relative">
        {isGraded && (
          <div className="absolute top-0 right-0 m-2">
            {isCorrect ? (
              <IoCheckmarkCircle className="text-green-500" size={24} />
            ) : (
              <IoCloseCircle className="text-red-500" size={24} />
            )}
          </div>
        )}
        {question.type === "UNIQUE" ? (
          <SingleChoiceQuestion
            question={question}
            onChange={(value) => handleAnswerChange(question._id, value)}
            selectedAnswer={userAnswer}
            correctAnswer={question.correctAnswer}
            isGraded={isGraded}
            disabled={isGraded}
          />
        ) : (
          <MultipleChoiceQuestion
            question={question}
            onChange={(value) => handleAnswerChange(question._id, value)}
            selectedAnswer={userAnswer}
            correctAnswer={question.correctAnswer}
            isGraded={isGraded}
            disabled={isGraded}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <section className="pb-2 pt-5 px-5 text-green-400 underline">
          <Link href="/exams">
            <span className="flex items-center">
              <IoArrowBackCircle /> Exams
            </span>
          </Link>
        </section>
        <div className="bg-gray-900 p-5 min-h-screen text-white flex items-center justify-center">
          <div className="animate-pulse text-xl font-bold">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <section className="pb-2 pt-5 px-5 text-green-400 underline">
        <Link href="/exams">
          <span className="flex items-center">
            <IoArrowBackCircle /> Exams
          </span>
        </Link>
      </section>
      <div className="bg-gray-900 p-3 h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">{examData?.title}</h1>
        <p className="text-2xl">Difficulty: {examData?.difficulty}</p>
        <p className="text-2xl">Level: {examData?.level}</p>
        <section className="h-[500px] overflow-auto">
          {examData?.questions.map((q) => RenderQuestion(q))}
        </section>
        {!isGraded && (
          <button
            onClick={handleCalificate}
            className="text-xl p-1 my-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calificate
          </button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExamDetail;
