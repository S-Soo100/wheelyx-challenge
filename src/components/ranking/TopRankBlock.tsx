import { demoRows } from "@/mock/mockRanking";
import { IRank } from "@/types/rank";
import countryFlags from "@/util/flagIcons";
import React from "react";
type Props = {
  title: "FORWARD" | "BACKWARD";
  row: IRank[];
};
export default function TopRankBlock({ title, row }: Props) {
  const rows = (): IRank[] => {
    const newRows: IRank[] = [];
    let i = 0;
    while (newRows.length < 3) {
      newRows.push(row[i] ? row[i] : demoRows[i]);
      i++;
    }
    return newRows;
  };

  const forwardUnderline =
    "relative w-[180px] h-3 inset-y-[-10px] bg-gradient-to-r from-[#FFFFFF] to-[#FFD67E]";
  const backwardUnderline =
    "relative w-[200px] h-3 inset-y-[-10px] bg-gradient-to-r from-[#FFFFFF] to-[#FFD67E]";
  return (
    <div className="flex flex-col justify-end w-[540px] h-full">
      <div className="flex flex-col items-center justify-end pb-3 pr-1 mb-14 text-cente">
        <div
          className={title === "FORWARD" ? forwardUnderline : backwardUnderline}
        ></div>
        <p className={`absolute text-[36px] font-semibold text-[#343434]`}>
          {title}
        </p>
      </div>
      <div className="flex flex-row items-end justify-center pb-12 gap-1.5  text-xl border-slate-500 rounded-bl-[100px]">
        <div className="flex flex-col items-center justify-end h-full text-center w-36">
          {/* 2등 */}
          <div
            className={`w-[112px] h-[112px] mb-[48px]  text-center items-center justify-center flex  `}
          >
            <h1 className="text-[68px]">
              {countryFlags(rows()[1].countryCode)}
            </h1>
          </div>

          <div className="w-[120px] h-[40px]text-center overflow-hidden overflow-ellipsis">
            <p className="mb-1 text-3xl">{rows()[1].nickname}</p>
          </div>
          <p className="pb-1">{rows()[1].measureTime}</p>
        </div>
        {/* 1등 */}
        <div className="flex flex-col items-center justify-end h-full mb-8 text-center w-36">
          <div
            className={`w-[162px] h-[162px] mb-[55px]  text-center items-center justify-center flex  `}
          >
            <h1 className="text-[90px] mb-6">
              {countryFlags(rows()[0].countryCode)}
            </h1>
          </div>
          <div className="w-[120px] h-[40px]text-center overflow-y-hidden overflow-x-hidden overflow-ellipsis">
            <p className="mb-1 text-3xl">{rows()[0].nickname}</p>
          </div>
          <p className="pb-1">{rows()[0].measureTime}</p>
        </div>
        {/* 3등 */}
        <div className="flex flex-col items-center justify-end h-full text-center w-36">
          <div
            className={`w-[112px] h-[112px] mb-[48px]  text-center items-center justify-center flex  `}
          >
            <h1 className="text-[68px]">
              {countryFlags(rows()[2].countryCode)}
            </h1>
          </div>
          <div className="w-[120px] h-[40px]text-center overflow-hidden overflow-ellipsis">
            <p className="mb-1 text-3xl">{rows()[2].nickname}</p>
          </div>
          <p className="pb-1"> {rows()[2].measureTime}</p>
        </div>
      </div>
    </div>
  );
}
