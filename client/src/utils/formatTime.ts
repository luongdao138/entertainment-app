const formatTimeNumber = (number: number) =>
  number < 10 ? `0${number}` : number;

export const formatSongDuration = (time: number): string => {
  let result = '';

  if (time >= 60 * 60) {
    const hours = Math.floor(time / (60 * 60));
    const leftSeconds = time % (60 * 60);
    const minutes = Math.floor(leftSeconds / 60);
    const seconds = leftSeconds % 60;

    result = `${formatTimeNumber(hours)}:${formatTimeNumber(
      minutes
    )}:${formatTimeNumber(seconds)}`;
  } else {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    result = `${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`;
  }

  return result;
};
