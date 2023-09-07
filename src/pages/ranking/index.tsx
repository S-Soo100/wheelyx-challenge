import { useAppSelector } from "@/redux/store";
import ClipLoader from "react-spinners/ClipLoader";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { fetchAllTypeRanking, refreshRank } from "@/redux/features/rank-slice";
import { io } from "socket.io-client";
import { IRank } from "@/types/rank";
import RankingPageBackground from "@/components/ranking/RankingPageBackground";
import RankTileList from "@/components/ranking/RankTileList";
import TopRankBlock from "@/components/ranking/TopRankBlock";
import { demoRows } from "@/mock/mockRanking";
import { rankSocket } from "@/socket/socket";

export default function RankingScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  //시작달력
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState(startTime.toLocaleDateString());
  const [showStartCalendar, setShowStartCalander] = useState<boolean>(false);

  //끝달력
  const [endtime, setEndTime] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(endtime.toLocaleDateString());
  const [showEndCalendar, setShowEndCalander] = useState<boolean>(false);

  //초깃값
  useEffect(() => {
    dispatch(fetchAllTypeRanking(new Date()));
    rankSocket.connect();
    rankSocket.on("updateRank", (recieved) => {
      console.log("recieved");
      console.log(recieved);
      const newF: IRank[] = [];
      const newB: IRank[] = [];
      recieved.forward?.forEach((e: any) => newF.push(e));
      recieved.backward?.forEach((e: any) => newB.push(e));
      dispatch(refreshRank({ forward: newF, backward: newB }));
    });

    return () => {
      console.log("socket disconnected required");
      rankSocket.removeAllListeners();
      rankSocket.disconnect();
      rankSocket.off();
    };
  }, []);

  //달력
  const maxDate = new Date(2023, 12, 31);
  const minDate = new Date(2023, 1, 31);

  //리덕스-유저
  const authStatus = useAppSelector((state) => state.authReducer.status);
  const { forward: forward, backward } = useAppSelector(
    (state) => state.rankReducer.value
  );

  //리덕스-랭크
  const rankingStatus = useAppSelector((state) => state.rankReducer.status);

  if (authStatus === "loading") {
    return (
      <div className="w-20 h-20 mx-auto my-auto">
        <ClipLoader color="#E50915" size={150} />
      </div>
    );
  }

  //소켓
  // const baseUrl = `https://wheelyx.com/dev`;

  return (
    <>
      <RankingPageBackground historyPage>
        <div className="z-101 w-[100vw] h-[920px] mx-auto max-w-[1080px] text-white">
          <div
            className={`z-100 bg-[url('/bgx1.png')] flex flex-col w-[100vw] h-[920px] max-w-[1080px] items-center rounded-b-[100px]`}
          >
            {/* 1~3등 블록 */}
            <div className="flex w-[1080px] h-[920px] flex-row items-end">
              {/* 전진 */}
              <TopRankBlock
                title="FORWARD"
                row={forward ?? demoRows}
              ></TopRankBlock>
              {/* 후진 */}
              <TopRankBlock
                title="BACKWARD"
                row={backward ?? demoRows}
              ></TopRankBlock>
            </div>
          </div>

          {/* 하단 랭킹 블럭 */}
          <RankTileList forward={forward} backward={backward} />
        </div>
      </RankingPageBackground>
      {showStartCalendar && (
        <section className="absolute z-50 left-10 top-6 bg-slate-800">
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={endtime}
            onChange={(e, _) => {
              setShowStartCalander(false);
              if (e instanceof Date) {
                setStartTime(e);
                setStartDate(e.toLocaleDateString());
              }
            }}
          />
        </section>
      )}
      {showEndCalendar && (
        <section className="absolute z-50 top-6 right-10 bg-slate-800">
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={endtime}
            onChange={(e, _) => {
              setShowEndCalander(false);
              if (e instanceof Date) {
                setEndTime(e);
                setEndDate(e.toLocaleDateString());
              }
            }}
          />
        </section>
      )}
    </>
  );
}
