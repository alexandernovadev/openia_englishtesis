import MatchingExercise from "@/components/exams/MatchingExercise";
// Deprecated
const App: React.FC = () => {
  const items = {
    get: "home late",
    do: "exercise",
    feel: "tired",
    fall: "asleep",
    take: "a break",
    watch: "TV",
    work: "long hours",
    wake: "up about",
    stay: "up until midnight",
  };

  return (
    <div className="App">
      <MatchingExercise items={items} />
    </div>
  );
};

export default App;
