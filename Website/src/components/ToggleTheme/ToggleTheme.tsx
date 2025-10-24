import { useEffect, useState } from "react";
import styles from "./ToggleTheme.module.css";
import { DarkMode, LightMode } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import { useThemeQuery } from "../../hooks/useTheme";

const ToggleTheme = () => {
  const [isDarkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  const { theme, setTheme, isLoading } = useThemeQuery();

  useEffect(() => {
    if (!isLoading) {
      const savedTheme = theme;
      if (savedTheme) {
        setDarkMode(savedTheme === "dark");
      } else {
        // Default to system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(systemPrefersDark);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (isDarkMode !== undefined) {
        if (isDarkMode) {
          document.documentElement.classList.add("dark-mode");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark-mode");
          setTheme("light");
        }
      }
    }
  }, [isDarkMode]);

  const toggleTheme = async () => {
    await setDarkMode((prevMode) => !prevMode);
  };
  if (isDarkMode === undefined)
    return (
      <>
        <CircularProgress />
      </>
    );
  return (
    <>
      {isDarkMode ? (
        <Tooltip title={`Switch to Light Mode`}>
          <LightMode className={styles.lightThemeIcon} onClick={toggleTheme} />
        </Tooltip>
      ) : (
        <Tooltip title={`Switch to Dark Mode`}>
          <DarkMode className={styles.darkThemeIcon} onClick={toggleTheme} />
        </Tooltip>
      )}
    </>
  );
};

export default ToggleTheme;
