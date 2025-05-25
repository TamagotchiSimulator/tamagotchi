import { useEffect, useState } from "react";
import "./App.css";
import { Game } from "./game";
import { Poodle } from "./animals/poodle";

const Animal = () => {
  const [game] = useState(() => new Game());
  const [animals, setAnimals] = useState<ReturnType<typeof game.getAnimals>>(
    []
  );

  useEffect(() => {
    console.log(animals);
  }, [animals]);

  useEffect(() => {
    const unsubscribe = game.onAnimalsChange(setAnimals);
    game.start();

    return () => {
      unsubscribe();
    };
  }, [game]);

  return (
    <>
      <div className="animal-container">
        <h1>Poodle</h1>
        <div className="animal-animal">
          <img
            src="src/poodle.svg"
            alt="Your animal"
            className="animal-image"
          />
          <h2>Animal Name</h2>
          <button
            onClick={() => {
              game.addAnimal(new Poodle("Steve"));
              console.log(game.getAnimals());
            }}
          >
            asdsa
          </button>
        </div>
        <div className="animal-stats">
          <div className="stat">
            <strong>Hunger:</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${animals[0]?.stats?.hunger}%` }}
              ></div>
            </div>
            <button className="action-button">Feed</button>
          </div>
          <div className="stat">
            <strong>Happiness:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "80%" }}></div>
            </div>
            <button className="action-button">Play</button>
          </div>
          <div className="stat">
            <strong>Sleep:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "50%" }}></div>
            </div>
            <button className="action-button">Rest</button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="animal-page">
      <button>Add Animal</button>

      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}

export default App;
