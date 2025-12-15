import type { User } from "firebase/auth";

export const getAvatarLetter = (user?: User) => {
  if (!user) return "?";

  if (user.displayName) return user.displayName.charAt(0).toUpperCase();

  if (user.email) return user.email.charAt(0).toUpperCase();

  return "?";
};

export const stringToHSL = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 55%)`;
};

export const getAvatarColor = (user?: User) => {
  if (!user) return "#999";

  const base = user.uid || user.email || "default";
  return stringToHSL(base);
};
