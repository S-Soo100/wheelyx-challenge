import React from "react";

type Props = {
  color: "primary" | "secondary";
  rank: number;
  countryFlag: string;
  name: string;
  record: string;
};

export default function RankTile({
  color,
  rank,
  countryFlag,
  name,
  record,
}: Props) {
  const primary = `bg-[#FCFCFC] shadow-md w-full h-[122px] pl-4 pr-4 rounded-xl flex items-center justify-between flex-row gap-[10px]`;
  const secondary = `bg-[#FEF7EF] shadow-md w-full h-[122px] pl-4 pr-4 rounded-xl flex items-center justify-between flex-row gap-[10px]`;
  const rankUnderTen = "mx-6 text-5xl";
  const rankTen = "ml-6 text-5xl mr-[-2px]";
  return (
    <div className={color === "primary" ? primary : secondary}>
      <h1 className={rank < 10 ? rankUnderTen : rankTen}>{rank}</h1>
      <h1 className="mx-6 text-5xl">{countryFlag}</h1>
      <div className="flex flex-col mx-6 w-[260px]">
        <p className="overflow-hidden w-[260px] h-[40px] text-3xl font-semibold overflow-ellipsis ">
          {name}
        </p>
        <h4 className="text-2xl">{record}</h4>
      </div>
    </div>
  );
}
