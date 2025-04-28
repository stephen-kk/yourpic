"use client";

import { useState } from "react";

const styles = [
  { key: "auto", label: "Auto", image: "/styles/auto.jpg" },
  { key: "anime", label: "3D Anime", image: "/styles/anime.jpg" },
  { key: "model", label: "3D Model", image: "/styles/model.jpg" },
  { key: "japanese-anime", label: "Japanese Anime", image: "/styles/japanese-anime.jpg" },
  { key: "movie", label: "Movie", image: "/styles/movie.jpg" },
  { key: "comic", label: "Comic", image: "/styles/comic.jpg" },
];

export default function HomePage() {
  const [selectedStyle, setSelectedStyle] = useState("auto");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return alert("Please enter a description");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResultImage(data.imageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Generation failed:", err.message);
      } else {
        setError("Unknown error");
        console.error("Unknown error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white p-4 flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-cyan-400">Select Style</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {styles.map((style) => (
            <button
              key={style.key}
              onClick={() => setSelectedStyle(style.key)}
              className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-md border-2 transition-transform ${selectedStyle === style.key ? "border-cyan-400" : "border-transparent"} hover:scale-105`}
            >
              <img src={style.image} alt={style.label} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                {style.label}
              </div>
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-cyan-400">Creation Description</h2>
        <textarea
          className="w-full border-2 border-cyan-400 bg-[#0a0f1b] text-white p-4 rounded-xl"
          placeholder="Describe the picture in your idea or dream, such as 'a cat playing with a girl in the sunset...'"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="mt-6">
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold disabled:opacity-50"
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
          <div className="mt-8 text-center">
            <img src={resultImage} alt="Generated Result" className="mx-auto rounded-lg max-h-96 object-contain" />
            <a
              href={resultImage}
              download
              className="inline-block mt-4 text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-medium"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}