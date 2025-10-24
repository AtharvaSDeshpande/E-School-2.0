// useThemeQuery.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";

const THEME_QUERY_KEY = ["theme"];

export const useThemeQuery = () => {
  const queryClient = useQueryClient();

  // Read theme from localStorage using useQuery
  const query = useQuery({
    queryKey: THEME_QUERY_KEY,
    queryFn: () => localStorage.getItem("theme") || undefined,
    staleTime: Infinity,
  });

  // Function to update the theme in localStorage and refresh the query
  const setTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    queryClient.setQueryData(THEME_QUERY_KEY, newTheme); // Triggers re-render
  };

  return {
    theme: query.data,
    setTheme,
    isLoading: query.isLoading,
  };
};
