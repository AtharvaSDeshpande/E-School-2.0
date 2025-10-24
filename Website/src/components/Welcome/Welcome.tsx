import styles from "./Welcome.module.css";
function Welcome() {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.welcomeHeader}>WELCOME TO E-School</h1>
      <div className={styles.welcomeSubHeader}>
        Your All-in-One Educational Hub
      </div>
    </div>
  );
}

export default Welcome;
