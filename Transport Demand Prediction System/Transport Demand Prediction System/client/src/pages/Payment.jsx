import { useNavigate } from "react-router-dom";

export default function LanguageSelect() {
  const nav = useNavigate();

  return (
    <div className="container">
      <h1>BabyBeat 🔥</h1>

      <button onClick={() => nav("/login")}>
        Continue →
      </button>
    </div>
  );
}