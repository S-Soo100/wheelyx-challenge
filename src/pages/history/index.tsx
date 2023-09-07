"use client";
import RankTileList from "@/components/ranking/RankTileList";
import RankingPageBackground from "@/components/ranking/RankingPageBackground";
import TopRankBlock from "@/components/ranking/TopRankBlock";
import { demoRows } from "@/mock/mockRanking";
import {
  fetchAllTypeRanking,
  fetchHistoryRankingByType,
  refreshRank,
} from "@/redux/features/rank-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function HistoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  //시작달력
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState(startTime.toLocaleDateString());
  const [showStartCalendar, setShowStartCalander] = useState<boolean>(false);

  //끝달력
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(endTime.toLocaleDateString());
  const [showEndCalendar, setShowEndCalander] = useState<boolean>(false);

  //초깃값
  useEffect(() => {
    dispatch(fetchHistoryRankingByType({ start: startTime, end: endTime }));
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

  return (
    <>
      <RankingPageBackground historyPage={false}>
        <div className="z-101 w-[100vw] h-[920px] mx-auto max-w-[1080px] text-white">
          <div
            className={`z-100 bg-[url('/bgx1.png')] flex flex-col w-[100vw] h-[920px] max-w-[1080px] items-center rounded-b-[100px]`}
          >
            {/* 날짜 박스 */}
            <div
              className={`flex flex-row gap-1 pb-2 pl-8 pr-8 mt-[4rem] text-[42px] text-[#AB5E3D] italic font-bold  bg-gradient-to-r from-[#FFBA52] via-[#FFFEB1] to-[#FFC55D]`}
            >
              <button
                onClick={() => {
                  showStartCalendar
                    ? setShowStartCalander(false)
                    : setShowStartCalander(true);
                }}
              >
                {startDate}
              </button>
              <p>~</p>
              <button
                onClick={() => {
                  showEndCalendar
                    ? setShowEndCalander(false)
                    : setShowEndCalander(true);
                }}
              >
                {endDate}
              </button>
            </div>

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
        <section className="absolute z-50 p-2 left-10 top-6">
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={endTime}
            onChange={(e, _) => {
              setShowStartCalander(false);
              setShowEndCalander(false);
              if (e instanceof Date && e !== startTime) {
                setStartTime(e);
                setStartDate(e.toLocaleDateString());
              }
            }}
          />
        </section>
      )}
      {showEndCalendar && (
        <section className="absolute z-50 p-2 top-6 right-10 ">
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            value={endTime}
            onChange={(e, _) => {
              setShowEndCalander(false);
              setShowStartCalander(false);
              if (e instanceof Date && e !== endTime) {
                setEndTime(e);
                setEndDate(e.toLocaleDateString());
                if (
                  startTime.getMonth === endTime.getMonth &&
                  startTime.getDay > endTime.getDay
                ) {
                  return;
                }
                dispatch(
                  fetchHistoryRankingByType({
                    start: startTime,
                    end: endTime,
                  })
                );
              }
            }}
          />
        </section>
      )}
    </>
  );
}
