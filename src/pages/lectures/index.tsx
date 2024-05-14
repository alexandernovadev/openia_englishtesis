import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import Image from "next/image";
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
        <div className="bg-gray-900 w-full h-screen text-center mt-4 text-white">
          Loading...
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

  return (
    <DashboardLayout>
      <div className="bg-gray-900 p-5 h-screen">
        <h1 className="text-2xl font-bold mb-4 text-white">Lecture List</h1>
        <section className="overflow-scroll h-[94%]">
          <ul className="space-y-4">
            {lectures.map((lecture: any) => (
              <li
                key={lecture.lectureID}
                className="p-4 bg-gray-800 shadow rounded-lg flex items-center space-x-4 cursor-pointer"
                onClick={() => handleLectureClick(lecture._id)}
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-gray-500 rounded-full">
                    <img
                      src={`https://api.multiavatar.com/${lecture.lectureID}`}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {lecture.content.split("\n")[0].replace(/#/g, "")}
                  </h2>
                  <p className="text-gray-400">ID: {lecture.lectureID}</p>
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
