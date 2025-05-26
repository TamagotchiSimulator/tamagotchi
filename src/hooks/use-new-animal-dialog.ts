/**
 * A resuable hook that handles the nuqs state for the new animal dialog.
 */

import { parseAsBoolean, useQueryState } from "nuqs";
import { NEW_ANIMAL_DIALOG_QUERY_KEY } from "../features/new-animal-dialog";

export const useNewAnimalDialog = () => {
  const [isNewAnimalDialogOpen, setIsNewAnimalDialogOpen] = useQueryState(
    NEW_ANIMAL_DIALOG_QUERY_KEY,
    parseAsBoolean.withDefault(false)
  );

  return {
    isNewAnimalDialogOpen,
    setIsNewAnimalDialogOpen,
  };
};
