import styles from "./style.module.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        {title && <h1 className={styles["card-title"]}>{title}</h1>}
        {children}
      </div>
    </div>
  );
};
