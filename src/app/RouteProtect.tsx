"use client";

import React, { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import { ReactNode } from "react";

interface RouteProtectProps {
  children: ReactNode;
}

const RouteProtect = ({ children }: RouteProtectProps) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const { user } = useContext(AuthContext);
  
  
  
  // useEffect(() => {
  //   if (user && pathname !== "/auth/sign-in" && pathname !== "/auth/sign-up") {
  //     router.push("/auth/sign-in", { scroll: false });
  //   }
  // }, [user, pathname, router]);
  
  return <>{children}</>;
  
};

export default RouteProtect;