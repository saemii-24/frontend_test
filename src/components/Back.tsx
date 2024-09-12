import React from "react";
import { useRouter } from "next/router";

export const Back = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return <button onClick={handleGoBack}>뒤로 가기</button>;
};
