import "./App.css";
import { useGameContext } from "./contexts/use-game-context";
import { Card } from "./components/card";
import {
  NEW_ANIMAL_DIALOG_QUERY_KEY,
  NewAnimalDialog,
} from "./features/new-animal-dialog";
import { useQueryState } from "nuqs";
import { parseAsBoolean } from "nuqs";
import { AnimalCard } from "./features/animal-card";
import { AnimalList } from "./features/animal-list";

function App() {
  const { animals } = useGameContext();
  const [, setIsNewAnimalDialogOpen] = useQueryState(
    NEW_ANIMAL_DIALOG_QUERY_KEY,
    parseAsBoolean.withDefault(false)
  );

  return (
    <div className="page">
      {animals.length === 0 ? (
        <Card title="Welcome to the magical world of animal care!">
          <p>To get started, let's choose our first pet.</p>
          <button
            onClick={() => {
              setIsNewAnimalDialogOpen((prev) => !prev);
            }}
          >
            Get started
          </button>
        </Card>
      ) : (
        <>
          <AnimalList>
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </AnimalList>

          <button onClick={() => setIsNewAnimalDialogOpen(true)}>
            Add new animal
          </button>
        </>
      )}
      <NewAnimalDialog />
    </div>
  );
}

export default App;
