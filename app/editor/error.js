"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const error = ({ error }) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, [4000]);
  });
  return (
    <div>
      THERE WAS AN ERROR HAHA, you will be redirected to the home page soon.
      {error.message}
    </div>
  );
};

export default error;
