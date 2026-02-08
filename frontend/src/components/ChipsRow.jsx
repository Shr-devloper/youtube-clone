import "../styles/chips.css";

const chips = [
  "All", "Music", "Mixes", "Mantras", "Reverberation",
  "Arijit Singh", "Shreya Ghoshal", "Live",
  "Meditation music", "Playlists", "Raga music"
];

const ChipsRow = () => {
  return (
    <div className="chips-row">
      {chips.map((chip, i) => (
        <button key={i} className={chip === "All" ? "chip active" : "chip"}>
          {chip}
        </button>
      ))}
    </div>
  );
};

export default ChipsRow;
