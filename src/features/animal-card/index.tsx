import { Animal } from "../../animals";
import { Card } from "../../components/card";
import { ProgressBar } from "../../components/progress-bar";
import styles from "./styles.module.css";
import { getAnimalImage } from "../../helpers/get-animal-image";

interface AnimalCardProps {
  animal: Animal;
}
export const AnimalCard = ({ animal }: AnimalCardProps) => {
  const { happiness, hunger, sleep } = animal.stats;

  return (
    <Card
      title={`${animal.name} (${animal.type}) ${animal.isDead() ? "🪦" : ""}`}
    >
      <div className={styles["animal-card"]}>
        <div className={styles["animal-card-image-container"]}>
          <img
            src={getAnimalImage(animal.type)}
            alt="Poodle"
            className={animal.isDead() ? styles["animal-card-image--dead"] : ""}
          />
        </div>
        <div className={styles["animal-stats"]}>
          <span className="stat-label">Hunger</span>
          <ProgressBar
            value={hunger}
            warningThreshold={75}
            dangerThreshold={90}
          />
          <span className="">Happiness</span>
          <ProgressBar
            value={happiness}
            warningThreshold={35}
            dangerThreshold={10}
            inverse
          />
          <span className="">Tiredness</span>
          <ProgressBar
            value={sleep}
            warningThreshold={75}
            dangerThreshold={90}
          />
        </div>
        <div className={styles["animal-card-actions"]}>
          <button onClick={() => animal.feed()} disabled={animal.isDead()}>
            Feed
          </button>
          <button onClick={() => animal.play()} disabled={animal.isDead()}>
            Play
          </button>
          <button onClick={() => animal.sleep()} disabled={animal.isDead()}>
            Sleep
          </button>
        </div>
      </div>
    </Card>
  );
};
