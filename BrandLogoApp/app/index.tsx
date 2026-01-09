import { useRouter } from "expo-router";
import { useEffect } from "react";

// Learned from Andrew
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/menu");
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}

