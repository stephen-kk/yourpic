// app/page.tsx
"use client";

import { useEffect, useState } from "react";

const styles = [
  { key: "auto", label: "Auto", image: "/styles/auto.jpg" },
  { key: "anime", label: "Anime", image: "/styles/anime.jpg" },
  { key: "model", label: "Model", image: "/styles/model.jpg" },
  { key: "japanese-anime", label: "Japanese Anime", image: "/styles/japanese-anime.jpg" },
  { key: "movie", label: "Movie", image: "/styles/movie.jpg" },
  { key: "comic", label: "Comic", image: "/styles/comic.jpg" }
];

export default function ImageToolsPage() {
  const [selectedStyle, setSelectedStyle] = useState("auto");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("lastPrompt", prompt);
    localStorage.setItem("lastStyle", selectedStyle);
  }, [prompt, selectedStyle]);

  useEffect(() => {
    const savedPrompt = localStorage.getItem("lastPrompt");
    const savedStyle = localStorage.getItem("lastStyle");
    if (savedPrompt) setPrompt(savedPrompt);
    if (savedStyle) setSelectedStyle(savedStyle);
  }, []);

  const handleCreate = async () => {
    if (!prompt.trim()) return alert("Please enter a description");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResultImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
      console.error("Generation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-sky-600 dark:text-sky-400">Select Style</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {styles.map((style) => (
            <button
              key={style.key}
              onClick={() => setSelectedStyle(style.key)}
              className={`relative rounded-xl overflow-hidden ring-2 transition-all aspect-[4/5] w-full h-full ${
                selectedStyle === style.key ? "ring-sky-400" : "ring-transparent"
              }`}
            >
              <img src={style.image} alt={style.label} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-[10px] bg-black/60 px-2 py-0.5 rounded z-10 whitespace-nowrap">
                {style.label}
              </div>
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2 text-sky-600 dark:text-sky-400">Creation</h2>
        <textarea
          className="w-full border-2 border-sky-400 dark:border-sky-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-4 text-sm"
          placeholder="Describe the picture in your idea or dream, such as 'a cat playing with a girl in the sunset...'"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-300">Try these:</span>
          {["I lay on the grass", "E.T. in the Mars", "A cute parrot"].map((tag, index) => (
            <button
              key={index}
              onClick={() => setPrompt(tag)}
              className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 px-3 py-1 rounded-full text-gray-700 dark:text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create now"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {resultImage && (
          <div className="mt-6 text-center">
            <img src={resultImage} alt="Generated Result" className="mx-auto rounded-lg max-h-96 object-contain" />
            <a
              href={resultImage}
              download
              className="inline-block mt-4 text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg font-medium"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
