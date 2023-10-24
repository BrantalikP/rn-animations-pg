import { usePathname } from "expo-router";

export const useIsPreview = () => {
  const pathname = usePathname();
  return pathname === "/";
};
