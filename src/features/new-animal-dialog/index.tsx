import { useEffect, useRef } from "react";
import { AnimalType } from "../../animals";
import styles from "./styles.module.css";
import { useGameContext } from "../../contexts/use-game-context";
import { isAnimalType } from "../../helpers/animal-type-typeguard";
import { useNewAnimalDialog } from "../../hooks/use-new-animal-dialog";
import { getAnimalImage } from "../../helpers/get-animal-image";

export const NEW_ANIMAL_DIALOG_QUERY_KEY = "new-animal-dialog";

export const NewAnimalDialog = () => {
  const { createAndAddAnimal } = useGameContext();
  const { isNewAnimalDialogOpen, setIsNewAnimalDialogOpen } =
    useNewAnimalDialog();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isNewAnimalDialogOpen) {
      dialogRef.current?.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [isNewAnimalDialogOpen, setIsNewAnimalDialogOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const animalName = formData.get("animal-name");
    const animalType = formData.get("animal-type");

    if (animalName && isAnimalType(animalType)) {
      createAndAddAnimal(animalType, animalName.toString());
      formData.delete("animal-name");
      formData.delete("animal-type");
      setIsNewAnimalDialogOpen(false);
    }
  };

  if (!isNewAnimalDialogOpen) {
    return null;
  }

  return (
    <dialog ref={dialogRef} data-testid="new-animal-dialog">
      <form
        className={styles.form}
        method="create-new-animal"
        onSubmit={handleSubmit}
      >
        <h1>Create a new animal</h1>
        <div className={styles["form__label-input"]}>
          <label htmlFor="animal-name">Animal name</label>
          <input
            type="text"
            id="animal-name"
            name="animal-name"
            placeholder="Sandy"
            required
            maxLength={128}
            data-testid="animal-name-test-id"
          />
        </div>
        <fieldset>
          <legend>Select Animal Type</legend>
          <div className={styles["animal-selector"]}>
            {Object.values(AnimalType).map((animalType) => (
              <label
                key={animalType}
                className={styles["animal-selector__option"]}
              >
                <input
                  type="radio"
                  id={animalType}
                  name="animal-type"
                  value={animalType}
                  required
                  data-testid={`${animalType}--testId`}
                />
                <div className={styles["animal-selector__content"]}>
                  <div className={styles["animal-selector__photo"]}>
                    <img src={getAnimalImage(animalType)} alt={animalType} />
                  </div>
                  <span className={styles["animal-selector__label"]}>
                    {animalType.toLocaleUpperCase()}
                  </span>
                </div>
              </label>
            ))}
          </div>
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
          Cancel
        </button>
      </form>
    </dialog>
  );
};
