import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
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

  const handleWordClick = (word: string) => {
    speakWord(word);
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  const renderMarkdownWithClickableWords = (content: string) => {
    return content.split("\n").map((line, lineIndex) => {
      // Determine the appropriate tag based on the Markdown syntax
      let tag = "p";
      if (line.startsWith("# ")) {
        tag = "h1";
        line = line.slice(2);
      } else if (line.startsWith("## ")) {
        tag = "h2";
        line = line.slice(3);
      } else if (line.startsWith("### ")) {
        tag = "h3";
        line = line.slice(4);
      } else if (line.startsWith("#### ")) {
        tag = "h4";
        line = line.slice(5);
      } else if (line.startsWith("##### ")) {
        tag = "h5";
        line = line.slice(6);
      } else if (line.startsWith("###### ")) {
        tag = "h6";
        line = line.slice(7);
      }

      return React.createElement(
        tag,
        { key: lineIndex },
        line.split(" ").map((word, wordIndex) => (
          <span
            key={`${lineIndex}-${wordIndex}`}
            className="cursor-pointer hover:underline"
            onClick={() => handleWordClick(word)}
          >
            {word}{" "}
          </span>
        ))
      );
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mt-5 bg-gray-900 w-full h-screen p-5">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-48 bg-gray-800 rounded"></div>
            <div className="flex flex-row justify-center items-center gap-3">
              <div className="h-48 w-48 bg-gray-800 rounded-full"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-10 bg-gray-800 rounded"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
            </div>
          </div>
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
                  className="object-cover rounded-full my-2"
                  width={180}
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

              <h1 className="text-6xl font-bold mb-4">
                {renderMarkdownWithClickableWords("#" + title)}
              </h1>
            </div>

            <div className="prose prose-invert overflow-scroll h-[400px]">
              {renderMarkdownWithClickableWords(remainingContent)}
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
