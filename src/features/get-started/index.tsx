/**
 * Renders the initial screen when the user has not added
 * any animals yet.
 */

import { Card } from "../../components/card";
import { useNewAnimalDialog } from "../../hooks/use-new-animal-dialog";

export const GetStarted = () => {
  const { setIsNewAnimalDialogOpen } = useNewAnimalDialog();

  return (
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
  );
};
