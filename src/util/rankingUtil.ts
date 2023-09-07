export const getRankString = (id: number) => {
  switch (id) {
    case 1:
      return `${id}st`;
    case 2:
      return `${id}nd`;
    case 3:
      return `${id}rd`;
    default:
      return `${id}th`;
  }
};

export const getMeasureTimeString = (time: number) => {
  let min = (time / 60).toFixed(0);
  if (time / 60 < 10 && time > 60) {
    min = `0${min}`;
  }
  if (time < 60) {
    min = "00";
  }
  let sec = (time % 60).toFixed(2);
  if (time % 60 < 10) {
    sec = `0${sec}`;
  }

  return `${min}" ${sec}`;
};
