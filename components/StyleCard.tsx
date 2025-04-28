interface StyleCardProps {
    image: string;
    label: string;
    selected: boolean;
    onClick: () => void;
  }
  
  export default function StyleCard({ image, label, selected, onClick }: StyleCardProps) {
    return (
      <button
        onClick={onClick}
        className={`relative rounded-xl overflow-hidden ring-2 transition-all w-full h-full ${
          selected ? "ring-sky-400" : "ring-transparent"
        }`}
      >
        <img
          src={image}
          alt={label}
          className="w-full h-20 object-cover"
        />
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm bg-black/60 px-2 py-0.5 rounded">
          {label}
        </div>
      </button>
    );
  }
  