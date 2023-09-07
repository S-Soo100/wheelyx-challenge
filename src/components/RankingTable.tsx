"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import countryFlags from "@/util/flagIcons";
import { getMeasureTimeString, getRankString } from "@/util/rankingUtil";
import { IRank, RankState } from "@/types/rank";
import ClipLoader from "react-spinners/ClipLoader";
import { blankRows } from "@/mock/mockRanking";

type Props = {
  title: string;
  tableData: IRank[] | null;
  state: RankState;
};

export default function RankingTable({ title, tableData, state }: Props) {
  const rows = () => {
    if (tableData instanceof Array) {
      return tableData.map((e, index) => ({ ...e, id: index }));
    } else {
      return blankRows;
    }
  };
  return (
    <section className="flex flex-col m-2 ">
      <p className="flex items-center justify-center m-2 text-5xl text-center">
        {title}
      </p>
      <TableContainer component={Paper} elevation={12} className="text-xl">
        <Table sx={{ minWidth: "45vw" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className="text-2xl"
                align="right"
              >{`Ranking`}</TableCell>
              <TableCell className="text-2xl" align="center">
                Nation
              </TableCell>
              <TableCell className="text-2xl" align="left">
                NickName
              </TableCell>
              <TableCell className="text-2xl" align="right">
                Record
              </TableCell>
            </TableRow>
          </TableHead>
          {state === "initial" || state === "loading" ? (
            <div className="flex items-center justify-center h-[40rem]">
              <ClipLoader color="#E50915" size={50} />
            </div>
          ) : (
            <TableBody>
              {rows().map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className="text-2xl"
                    component="th"
                    scope="row"
                    align="right"
                  >
                    {getRankString(row.id + 1)}
                  </TableCell>
                  <TableCell align="center" className="text-3xl">
                    {countryFlags(row.countryCode)}
                  </TableCell>
                  <TableCell className="text-2xl" align="left">
                    {row.nickname}
                  </TableCell>
                  <TableCell className="text-2xl" align="right">
                    {getMeasureTimeString(row.measureTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </section>
  );
}
