import Image from "next/image";
import { Inter } from "next/font/google";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import LogIn from "@/screens/LogIn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLogin } = useAppSelector((state) => state.authReducer.value);
  const status = useAppSelector((state) => state.authReducer.status);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push("/ranking");
      return;
    }
  }, [isLogin]);

  if (status === "loading") {
    return (
      <div className="w-20 h-20 mx-auto my-auto">
        <ClipLoader color="#E50915" size={150} />
      </div>
    );
  }

  const now = new Date();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <LogIn />
    </main>
  );
}
