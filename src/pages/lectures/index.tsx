import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import Image from "next/image";
import imagedDefault from "../../../public/default.webp";
import { useRouter } from "next/router";

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get("/api/lectures");
        setLectures(response.data);
      } catch (err) {
        setError("Failed to fetch lectures");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-gray-900 p-5 h-screen">
          <h1>Lectures</h1>
          <section className="overflow-scroll h-[94%]">
            <ul className="space-y-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-800 shadow rounded-lg flex items-center space-x-4 animate-pulse"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-gray-500 rounded-full"></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-700 bg-gray-700 rounded h-6 w-32"></h2>
                      <p className="text-gray-600 bg-gray-600 rounded h-4 w-24 mt-2"></p>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  const handleLectureClick = (lectureID: string) => {
    router.push(`/lectures/${lectureID}`); // Navigate to /lectures/ID
  };

  const handleExamGenerateClick = (
    lectureContent: string,
    lectureID: string
  ) => {
    router.push({
      pathname: "/examsgenerator",
      query: { lectureID, lectureContent: encodeURIComponent(lectureContent) },
    });
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-900 p-5 h-screen">
        <h1>Lectures</h1>
        <section className="overflow-scroll h-[94%]">
          <ul className="space-y-4">
            {lectures.map((lecture: any) => (
              <li
                key={lecture.lectureID}
                className="p-4 bg-gray-800 shadow rounded-lg flex items-center space-x-4 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-gray-500 rounded-full overflow-hidden">
                    {lecture.img ? (
                      <Image
                        src={`data:image/png;base64,${lecture.img}`}
                        alt="Generated"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Image
                        src={imagedDefault}
                        alt="Lecture Image"
                        className="object-cover rounded-full my-2"
                        width={180}
                        height={200}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {lecture.content.split("\n")[0].replace(/#/g, "")}
                  </h2>

                  <p className="text-gray-400">ID: {lecture.lectureID}</p>

                  <div className="flex flex-row space-x-2 mt-2">
                    <button
                      onClick={() =>
                        handleExamGenerateClick(lecture.content, lecture._id)
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Generate Exam
                    </button>
                    <button
                      onClick={() => handleLectureClick(lecture._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default LectureList;
