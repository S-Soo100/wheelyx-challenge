import { logOut } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { rankSocket } from "@/socket/socket";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function RankingPageBackground({
  children,
  historyPage,
}: {
  children: React.ReactNode;
  historyPage: boolean;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex justify-center w-full h-[1920px] bg-slate-100">
      <div className="absolute top-0 z-10 ">
        <div className=" w-full h-[920px] justify-center flex flex-row">
          <div className="w-[540px] h-[920px] bg-[#FCFCFC]"></div>
          <div className="w-[540px] h-[920px] bg-[#FEF7EF]"></div>
        </div>
      </div>
      <div className="absolute top-0 w-[100vw] h-[1920px] z-20 flex flex-col items-center justify-start">
        {children}
      </div>
      <div className="absolute top-0 z-30 flex w-[1080px] justify-between">
        {historyPage ? (
          <Button
            variant="outlined"
            className="flex m-2"
            onClick={() => {
              // dispatch(logOut());
              router.replace("/history");
            }}
          >
            <p className="text-lg font-extrabold text-white">History</p>
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="flex m-2"
            onClick={() => {
              router.back();
            }}
          >
            <p className="text-lg font-extrabold text-white">{"<"}</p>
          </Button>
        )}
        <Button
          variant="outlined"
          className="flex m-2"
          onClick={() => {
            dispatch(logOut());
            rankSocket.removeAllListeners();
            rankSocket.disconnect();
            rankSocket.off();
            router.replace("/");
          }}
        >
          <p className="text-lg font-extrabold text-white">Log Out</p>
        </Button>
      </div>
    </div>
  );
}
