"use client";

import { IRank } from "@/types/rank";
import countryFlags from "@/util/flagIcons";
import RankTile from "./RankTile";
import { demoRows } from "@/mock/mockRanking";

type Props = {
  forward: IRank[] | null;
  backward: IRank[] | null;
};

export default function RankTileList({ forward, backward }: Props) {
  return (
    <div className="w-[1080px] max-w-[1080px] mx-auto flex flex-row h-[1000px] bg-[#FCFCFC]">
      <div className="px-4 pt-4 flex w-[540px] h-full flex-col justify-start items-center gap-4 text-black">
        {forward?.map((row, index) => {
          if (index > 2 && index < 10) {
            return (
              <RankTile
                key={index}
                color="secondary"
                rank={index + 1}
                name={row.nickname}
                countryFlag={countryFlags(row.countryCode)}
                record={row.measureTime.toString()}
              />
            );
          }
        })}
      </div>
      <div className="px-4 pt-4 flex w-[540px] h-full flex-col justify-start items-center gap-4 bg-[#FEF7EF] text-black">
        {backward?.map((row, index) => {
          if (index > 2 && index < 10) {
            return (
              <RankTile
                key={index}
                color="primary"
                rank={index + 1}
                name={row.nickname}
                countryFlag={countryFlags(row.countryCode)}
                record={row.measureTime.toString()}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
