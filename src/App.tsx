import "./App.css";
import { useGameContext } from "./contexts/use-game-context";
import { NewAnimalDialog } from "./features/new-animal-dialog";
import { AnimalCard } from "./features/animal-card";
import { AnimalList } from "./features/animal-list";
import { GetStarted } from "./features/get-started";
import { useNewAnimalDialog } from "./hooks/use-new-animal-dialog";

function App() {
  const { animals } = useGameContext();
  const { setIsNewAnimalDialogOpen } = useNewAnimalDialog();

  return (
    <div className="page">
      {animals.length === 0 ? (
        <GetStarted />
      ) : (
        <div className="animal-list-container">
          <AnimalList>
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </AnimalList>

          <button onClick={() => setIsNewAnimalDialogOpen(true)}>
            Add new animal
          </button>
        </div>
      )}
      <NewAnimalDialog />
    </div>
  );
}

export default App;
