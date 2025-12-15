import { ChecklistOutlined, Create, Home, Person } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme";
import styles from "./Header.module.css";
import logo from "../../assets/images/eschoolLogo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { getAvatarColor, getAvatarLetter } from "../../data/utils";

const Header = () => {
  const { user, isUserLoading, logout } = useAuth();
  const avatarLetter = getAvatarLetter(user);
  const avatarColor = getAvatarColor(user);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={logo} className={styles.headerLogo} alt="loco" />
      </div>

      <div className={styles.headerRight}>
        {!isUserLoading && user ? (
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

        {user ? (
          <Avatar
            className={styles.headerRightAvatar}
            slotProps={{
              img: { referrerPolicy: "no-referrer" },
            }}
            src={user.photoURL ? user.photoURL : undefined}
            sx={{ bgcolor: !user?.photoURL ? avatarColor : "transparent" }}
            onClick={() => logout()}
          >
            {!user?.photoURL && avatarLetter}
          </Avatar>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
