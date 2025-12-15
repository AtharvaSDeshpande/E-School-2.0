// src/hooks/useAuth.ts
import { useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

const USER_QUERY_KEY = ["auth", "user"];

export function useAuth() {
  const queryClient = useQueryClient();

  // --- Load initial user state ---
  const { data: user, isLoading: isUserLoading } = useQuery<User | undefined>({
    queryKey: USER_QUERY_KEY,
    queryFn: () =>
      new Promise<User | undefined>((resolve) => {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) resolve(firebaseUser); // return the first user state
        });
      }),
    staleTime: Infinity, // never refetch
  });

  // --- Login ---
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    },
  });

  // --- Signup ---
  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    },
  });

  // --- Logout ---
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
  });

  // --- Reset Password ---
  const resetPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await sendPasswordResetEmail(auth, email);
      return "Password reset link sent successfully.";
    },
  });

  // --- Keep user synced with Firebase Auth ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      queryClient.setQueryData(USER_QUERY_KEY, firebaseUser);
    });
    return () => unsubscribe();
  }, [queryClient]);

  return {
    user,
    isUserLoading,

    // Auth actions
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,

    // Loading states
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
  };
}
