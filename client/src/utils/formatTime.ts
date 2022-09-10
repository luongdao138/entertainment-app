const formatTimeNumber = (number: number) =>
  number < 10 ? `0${number}` : number;

export const formatSongDuration = (time: number): string => {
  let result = '';

  if (time >= 60 * 60) {
    const hours = Math.floor(time / (60 * 60));
    const leftSeconds = Math.floor(time % (60 * 60));
    const minutes = Math.floor(leftSeconds / 60);
    const seconds = leftSeconds % 60;

    result = `${formatTimeNumber(hours)}:${formatTimeNumber(
      minutes
    )}:${formatTimeNumber(seconds)}`;
  } else {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    result = `${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`;
  }

  return result;
};

export const formatDateToInputDateFormat = (date: string | null | Date) => {
  if (!date) return null;

  date = new Date(date);
  return `${date.getFullYear()}-${formatTimeNumber(
    date.getMonth() + 1
  )}-${formatTimeNumber(date.getDate())}`;
};

export const calcTotalPlaylistTime = (durations: number[]): string => {
  const total_seconds = durations.reduce((acc, current) => acc + current, 0);

  const total_minutes = Math.ceil(total_seconds / 60);

  if (total_minutes < 60) {
    return `${total_minutes} phút`;
  }

  const total_hours = Math.floor(total_minutes / 60);
  const minutes = total_minutes % 60;

  if (minutes === 0) return `${total_hours} giờ`;

  return `${total_hours} giờ ${total_minutes} phút`;
};
