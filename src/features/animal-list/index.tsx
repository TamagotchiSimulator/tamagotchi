/**
 * Gives us a nice little container for our animals
 */
import styles from "./styles.module.css";
interface AnimalListProps {
  children: React.ReactNode;
}

export const AnimalList = ({ children }: AnimalListProps) => {
  return <div className={styles["animal-list"]}>{children}</div>;
};
