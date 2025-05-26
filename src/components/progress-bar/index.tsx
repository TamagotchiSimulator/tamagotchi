import styles from "./styles.module.css";

interface ProgressBarProps {
  value: number;
  warningThreshold: number;
  dangerThreshold: number;
  inverse?: boolean;
}

export const ProgressBar = ({
  value,
  warningThreshold,
  dangerThreshold,
  inverse,
}: ProgressBarProps) => {
  const isDanger = inverse
    ? value <= dangerThreshold
    : value >= dangerThreshold;

  const isWarning = inverse
    ? value <= warningThreshold
    : value >= warningThreshold;
  return (
    <div className={styles["progress-bar"]}>
      <div
        className={`${styles["progress-bar-fill"]} ${
          isDanger
            ? styles["progress-bar-fill--danger"]
            : isWarning
            ? styles["progress-bar-fill--warning"]
            : ""
        }`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
