import { useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashBoardLayout";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    setImage(null);
    try {
      const response = await axios.post("/api/lectures/imagenarator", {
        prompt,
      });
      setImage(response.data.image);

      console.log(response.data.image);
      
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="py-2">Generate Image</h1>
        <input
          type="text"
          value={prompt}
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
        />
        <button onClick={handleGenerateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
        {image && (
          <div>
            <h2>Generated Image</h2>
            <img src={`data:image/png;base64,${image}`} alt="Generated" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GenerateImage;
