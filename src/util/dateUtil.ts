export function getDateString(now: Date, time: "start" | "end"): string {
  const year: string = now.getFullYear().toString();
  const month: string =
    now.getMonth() + 1 < 10
      ? `0${now.getMonth() + 1}`
      : `${now.getMonth() + 1}`;
  const day: string =
    now.getDate() < 10 ? `0${now.getDate()}` : `${now.getDate()}`;
  const hour: string = time === "start" ? "00:00:00" : "24:00:00";
  return `${year}-${month}-${day} ${hour}`;
}

export function getEuropeDateFormat(date: Date): string {
  const year: string = (date.getFullYear() - 2000).toString();
  const month: string =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const day: string =
    date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  return `${day}/${month}/${year}`;
}
