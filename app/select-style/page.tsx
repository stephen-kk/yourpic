// app/page.tsx
import StyleCard from "@/components/StyleCard";

const styles = [
  { image: "/styles/auto.jpg", label: "Auto" },
  { image: "/styles/3d-anime.jpg", label: "3D Anime" },
  { image: "/styles/3d-model.jpg", label: "3D Model" },
  { image: "/styles/japanese-anime.jpg", label: "Japanese Anime" },
  { image: "/styles/movie.jpg", label: "Movie" },
  { image: "/styles/comic.jpg", label: "Comic" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121e2d] text-white p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Select Style</h1>
      <div className="flex flex-wrap gap-4">
        {styles.map((style) => (
          <StyleCard
            key={style.label}
            image={style.image}
            label={style.label}
          />
        ))}
      </div>
    </div>
  );
}
