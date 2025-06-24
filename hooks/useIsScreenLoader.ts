import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useIsScreenLoader = () => {
  const pathname = usePathname();
  const [isScreenLoader, setIsScreenLoader] = useState(true);

  useEffect(() => {
    setIsScreenLoader(pathname === "/");
  }, []);

  return isScreenLoader;
};
