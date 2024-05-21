import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import ReactMarkdown from "react-markdown";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Lecture } from "@/interfaces/lecture";
import imagedDefault from "../../../public/default.webp";
import Image from "next/image";

const LectureDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [lecture, setLecture] = useState<Lecture>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axios.get(`/api/lectures/${id}`);
        setLecture(response.data);
      } catch (err) {
        setError("Failed to fetch lecture details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLecture();
    }
  }, [id]);

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
    return (
      <DashboardLayout>
        <div className="bg-gray-900 w-full h-screen text-center mt-4 text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  const contentLines = lecture!.content.split("\n");
  const title = contentLines.shift()?.replace(/#/g, "") ?? "No Title";
  const remainingContent = contentLines.join("\n");

  return (
    <DashboardLayout>
      <section className="pb-2 pt-5 px-5 text-green-400 underline">
        <Link href="/lectures">
          <span className="flex items-center">
            <IoArrowBackCircle /> Lecturas
          </span>
        </Link>
      </section>
      <div className="bg-gray-900 p-5 min-h-screen text-white">
        {lecture ? (
          <>
            <section className="py-2">
              <div>
                Level{" "}
                <span className="text-xl font-bold mb-4 text-white bg-green-600 rounded-lg p-1">
                  {lecture.level}
                </span>
              </div>
              <div>
                {/*create at and */}
                <span className="text-gray-400">
                  Created at:{" "}
                  {new Date(lecture.createdAt!).toLocaleDateString()}
                </span>
              </div>
            </section>
            <div className="flex flex-row justify-center items-center gap-3">
              {lecture.img ? (
                <img
                  src={`data:image/png;base64,${lecture.img}`}
                  alt="Lecture Image"
                  className=" object-cover rounded-full my-2 "
                  width={180}
                />
              ) : (
                <Image
                  src={imagedDefault}
                  alt="Lecture Image"
                  className=" object-cover rounded-full my-2 "
                  width={180}
                  height={200}
                />
              )}

              <h1 className="text-6xl font-bold mb-4">{title}</h1>
            </div>

            <div className="prose prose-invert">
              <ReactMarkdown>{remainingContent}</ReactMarkdown>
            </div>
          </>
        ) : (
          <div>Lecture not found</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LectureDetail;
