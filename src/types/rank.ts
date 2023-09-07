export type IRankSlice = {
  forward: IRank[] | null;
  backward: IRank[] | null;
};

export type IRank = {
  id: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  nickname: string;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  countryCode: string;
  measureTime: number;
  rankType: number;
  rank: number;
};

export type IHistoryProps = {
  start: Date;
  end: Date;
};

export type RankState = "initial" | "loading" | "complete" | "error";
