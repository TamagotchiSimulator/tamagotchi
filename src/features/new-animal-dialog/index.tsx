import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";
import { AnimalType } from "../../animals";
import styles from "./styles.module.css";
import { useGameContext } from "../../contexts/use-game-context";
import { isAnimalType } from "../../helpers/animal-type-typeguard";

export const NEW_ANIMAL_DIALOG_QUERY_KEY = "new-animal-dialog";

export const NewAnimalDialog = () => {
  const { game } = useGameContext();
  const [isOpen, setIsNewAnimalDialogOpen] = useQueryState(
    NEW_ANIMAL_DIALOG_QUERY_KEY,
    parseAsBoolean.withDefault(false)
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [isOpen, setIsNewAnimalDialogOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const animalName = formData.get("animal-name");
    const animalType = formData.get("animal-type");

    if (animalName && isAnimalType(animalType)) {
      game.createAndAddAnimal(animalType, animalName.toString());
      formData.delete("animal-name");
      formData.delete("animal-type");
      setIsNewAnimalDialogOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog ref={dialogRef} data-testid="new-animal-dialog">
      <form method="create-new-animal" onSubmit={handleSubmit}>
        <h1>Create a new animal</h1>
        <label htmlFor="animal-name">Animal name</label>
        <input
          type="text"
          id="animal-name"
          name="animal-name"
          required
          maxLength={128}
          data-testid="animal-name-test-id"
        />
        <fieldset>
          <legend>Select Animal Type</legend>
          {Object.values(AnimalType).map((animalType) => (
            <div key={animalType} className={styles.radioGroupItem}>
              <input
                type="radio"
                id={animalType}
                name="animal-type"
                value={animalType}
                required
              />
              <label htmlFor={animalType} className={styles.radioLabel}>
                {animalType}
              </label>
              <div className={styles.photoPlaceholder}>Photo</div>
            </div>
          ))}
        </fieldset>
        <button type="submit" data-testid="create-button">
          Create
        </button>
        <button
          type="button"
          onClick={() => {
            setIsNewAnimalDialogOpen(false);
          }}
        >
          Close
        </button>
      </form>
    </dialog>
  );
};
