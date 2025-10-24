import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        © {currentYear} E - School. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
