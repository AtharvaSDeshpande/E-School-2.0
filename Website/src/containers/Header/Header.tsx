import { ChecklistOutlined, Create, Home, Person } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme";
import styles from "./Header.module.css";
import logo from "../../assets/images/eschoolLogo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isLoading = false;
  const user = true;

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={logo} className={styles.headerLogo} alt="loco" />
      </div>

      <div className={styles.headerRight}>
        {!isLoading && user ? (
          <>
            <Tooltip title="Home" className={styles.headerRightIcon}>
              <NavLink to="/">
                <Home />
              </NavLink>
            </Tooltip>
            <Tooltip title="Create/Join" className={styles.headerRightIcon}>
              <NavLink to="/create">
                <Create />
              </NavLink>
            </Tooltip>
            <Tooltip title="Todo" className={styles.headerRightIcon}>
              <NavLink to="/todo">
                <ChecklistOutlined />
              </NavLink>
            </Tooltip>
            <Tooltip title="Profile" className={styles.headerRightIcon}>
              <NavLink to="/profile">
                <Person />
              </NavLink>
            </Tooltip>
          </>
        ) : null}

        <ToggleTheme />

        {/* {user ? (
          <IconButton onClick={logout}>
            <Avatar
              src={user.picture}
              slotProps={{
                img: { referrerPolicy: "no-referrer" },
              }}
            />
          </IconButton>
        ) : null} */}
      </div>
    </div>
  );
};

export default Header;
