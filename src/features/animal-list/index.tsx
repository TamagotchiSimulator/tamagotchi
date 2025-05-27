/**
 * Gives us a nice little container for our animals
 */
import { useGameContext } from "../../contexts/use-game-context";
import { AnimalCard } from "../animal-card";
import styles from "./styles.module.css";

export const AnimalList = () => {
  const { animals } = useGameContext();
  return (
    <div className={styles["animal-list"]}>
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};
