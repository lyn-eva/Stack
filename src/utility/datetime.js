const getMMDDYY = (milli) => {
  const date = new Date(milli);
  return `${date.getMonth() + 1}:${date.getDate()}:${date.getFullYear()}`;
};

const getLastModified = (milli) => {
  if (!milli) return;
  const seconds = Math.round((Date.now() - milli) / 1000);
  if (seconds >= 86400) return getMMDDYY(milli);
  const hour = (seconds / 3600) | 0;
  const min = ((seconds % 3600) / 60) | 0;
  const sec = (seconds % 3600) % 60 | 0;
  if (hour > 0) {
    return formatMsg(hour, 'hour');
  } else if (min > 0) {
    return formatMsg(min, 'min');
  } else {
    return formatMsg(sec < 1 ? 1 : sec, 'sec');
  }
};

const formatMsg = (time, unit) => {
  return `${time} ${unit}${time === 1 ? '' : 's'} ago`;
};

export { getLastModified, getMMDDYY };
