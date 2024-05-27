import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Lecture } from "@/interfaces/lecture";
import imagedDefault from "../../../public/default.webp";
import Image from "next/image";
import { LecureSkeleton } from "@/components/loadings/LecureSkeleton";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaBookAtlas } from "react-icons/fa6";
import { SiGoogletranslate } from "react-icons/si";

const LectureDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [lecture, setLecture] = useState<Lecture>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // TODO This should be in Redux
  const [wordActive, setWordActive] = useState("");

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
    setWordActive(word);
  };

  const openDictionaryCambridge = () => {
    window.open(
      `https://dictionary.cambridge.org/us/dictionary/english-spanish/${wordActive}#dataset_caldes`,
      "_blank",
      "width=520,height=500"
    );
  };

  const openDictionaryGoogleTranslate = () => {
    window.open(
      `https://translate.google.com/?sl=en&tl=es&text=${wordActive}&op=translate`,
      "_blank",
      "width=520,height=500"
    );
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(wordActive);
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
            className={`cursor-pointer hover:underline ${
              tag == "p" && "text-2xl font-semibold"
            }  ${tag == "h2" && "text-4xl font-medium"} `}
            onClick={() => handleWordClick(word)}
          >
            {word}{" "}
          </span>
        ))
      );
    });
  };

  if (loading) {
    return <LecureSkeleton />;
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
      <section className=" text-green-400 underline">
        <Link href="/lectures">
          <span className="flex items-center ">
            <IoArrowBackCircle className="mt-1 mx-3" /> <span>Lecturas</span>
          </span>
        </Link>
      </section>
      <div className="bg-gray-900 p-2 min-h-screen text-white">
        {lecture ? (
          <>
            <div className="flex flex-row justify-center items-center gap-3">
              {lecture.img ? (
                <img
                  src={`data:image/png;base64,${lecture.img}`}
                  alt="Lecture Image"
                  className="object-cover rounded-lg my-2"
                  width={180}
                />
              ) : (
                <Image
                  src={imagedDefault}
                  alt="Lecture Image"
                  className="object-cover rounded-lg my-2"
                  width={180}
                  height={200}
                />
              )}

              <section className="p-1 flex flex-col">
                <span className="text-4xl font-bold mb-4">
                  {renderMarkdownWithClickableWords("#" + title)}
                </span>
                <div className="flex flex-row items-center text-[10px]">
                  <span>Level</span>
                  <span className=" font-bold mb-1 mx-2 text-white bg-green-600 rounded-lg p-1">
                    {lecture.level}
                  </span>
                  <span className="text-gray-400 text-[12px] mx-3">
                    Created at:{" "}
                    {new Date(lecture.createdAt!).toLocaleDateString()}
                  </span>
                </div>
              </section>
            </div>

            <div className="prose prose-invert overflow-scroll h-[580px] pb-32">
              {renderMarkdownWithClickableWords(remainingContent)}
            </div>

            <section className="w-full bg-gray-800 sticky bottom-0 rounded-xl p-2 border-white border">
              {wordActive.length == 0 ? (
                <h3>Select Word</h3>
              ) : (
                <section className="flex items-center gap-3">
                  <h3 className="capitalize text-yellow-600 text-4xl">
                    {wordActive.replace(/^[.,-]+/, "").replace(/[.,-]+$/, "")}
                  </h3>
                  <span onClick={speakWord} className="cursor-pointer mt-2">
                    <HiMiniSpeakerWave />
                  </span>{" "}
                  <span
                    onClick={openDictionaryCambridge}
                    className="cursor-pointer mt-2"
                  >
                    <FaBookAtlas />
                  </span>
                  <span
                    onClick={openDictionaryGoogleTranslate}
                    className="cursor-pointer mt-2"
                  >
                    <SiGoogletranslate />
                  </span>
                </section>
              )}
            </section>
          </>
        ) : (
          <div>Lecture not found</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LectureDetail;
