import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DriftClientProvider } from "./DriftClientProvider";

const queryClient = new QueryClient();

export function AppProviders(props: PropsWithChildren<object>) {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <DriftClientProvider>{props.children}</DriftClientProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
