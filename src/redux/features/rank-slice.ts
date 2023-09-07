import {
  getAllTypeRankingByDate,
  getHistoryRankingByDateAndType,
} from "@/apis/rankApis";
import { blankRows, demoRows } from "@/mock/mockRanking";
import { IHistoryProps, IRank, IRankSlice, RankState } from "@/types/rank";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: IRankSlice;
  status: RankState;
};

export const fetchAllTypeRanking = createAsyncThunk(
  "rank/fetchAllTypeRanking",
  async (date: Date, thunkAPI) => {
    const response: IRank[] = await getAllTypeRankingByDate(date);
    const newForward: IRank[] = [];
    const newBackward: IRank[] = [];
    response.forEach((e: IRank) => {
      // console.log(e);
      if (e.rankType === 0) {
        newForward.push(e);
      } else if (e.rankType === 1) {
        newBackward.push(e);
      }
    });
    newForward.sort((a, b) => a.measureTime - b.measureTime);
    newBackward.sort((a, b) => a.measureTime - b.measureTime);

    while (newForward.length < 10) {
      newForward.push(demoRows[0]);
    }

    while (newBackward.length < 10) {
      newBackward.push(demoRows[0]);
    }

    return {
      forward: newForward,
      backward: newBackward,
    } as IRankSlice;
  }
);

export const fetchHistoryRankingByType = createAsyncThunk(
  "rank/fetchHistoryRankingByType",
  async ({ start, end }: IHistoryProps, thunkAPI) => {
    const newForward: IRank[] = await getHistoryRankingByDateAndType(
      start,
      end,
      0
    );
    const newBackward: IRank[] = await getHistoryRankingByDateAndType(
      start,
      end,
      1
    );
    // newForward.sort((a, b) => a.measureTime - b.measureTime);
    // newBackward.sort((a, b) => a.measureTime - b.measureTime);

    while (newForward.length < 10) {
      newForward.push(demoRows[0]);
    }

    while (newBackward.length < 10) {
      newBackward.push(demoRows[0]);
    }

    return {
      forward: newForward,
      backward: newBackward,
    } as IRankSlice;
  }
);

const initialState = {
  value: {
    forward: blankRows,
    backward: blankRows,
  } as IRankSlice,
  status: "initial" as RankState,
} as InitialState;

export const rank = createSlice({
  name: "rank",
  initialState,
  reducers: {
    refreshRank: (State, action: PayloadAction<IRankSlice>) => {
      console.log("-------------------refresh Rank --------------------");
      console.log(action.payload);
      console.log(action.payload.forward);
      const newForward: IRank[] = [];
      const newBackward: IRank[] = [];
      action.payload.forward?.sort((a, b) => a.measureTime - b.measureTime);
      action.payload.backward?.sort((a, b) => a.measureTime - b.measureTime);
      action.payload.forward?.forEach((e: IRank) => {
        // console.log(e);
        newForward.push(e);
      });
      action.payload.backward?.forEach((e: IRank) => {
        newBackward.push(e);
      });

      while (newForward.length < 10) {
        newForward.push(demoRows[0]);
      }

      while (newBackward.length < 10) {
        newBackward.push(demoRows[0]);
      }
      return {
        value: {
          forward: newForward,
          backward: newBackward,
        },
        status: State.status,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTypeRanking.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllTypeRanking.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    builder.addCase(fetchAllTypeRanking.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(fetchHistoryRankingByType.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchHistoryRankingByType.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    builder.addCase(fetchHistoryRankingByType.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { refreshRank } = rank.actions;
export default rank.reducer;
