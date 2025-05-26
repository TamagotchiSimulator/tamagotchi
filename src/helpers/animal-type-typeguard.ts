/**
 * We usually will have the animal type as a string, but when we want
 * to create an animal, we'll need to ensure that we are using a valid
 * animal type
 */
import { AnimalType } from "../animals";
export function isAnimalType(value: unknown): value is AnimalType {
  return (
    typeof value === "string" &&
    Object.values(AnimalType).includes(value as AnimalType)
  );
}
