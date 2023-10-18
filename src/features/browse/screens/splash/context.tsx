import { useState } from "react";
import { SplashScreen } from "@/features/browse/screens/splash";

export const SplashScreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [finished, setFinished] = useState(false);

  return (
    <SplashScreen
      enabled={!finished}
      onEnd={() => setFinished(true)}
      duration={1000}
      delay={1000}
    >
      {children}
    </SplashScreen>
  );
};
