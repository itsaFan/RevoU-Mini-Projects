export function timePassed(date) {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
  const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
  const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30;
  const SECONDS_IN_YEAR = SECONDS_IN_DAY * 365;

  const elapsedSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(elapsedSeconds / SECONDS_IN_YEAR);
  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_MONTH);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_DAY);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_HOUR);
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_MINUTE);
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }

  return "Just now";
}

export function formatDateV2(isoString) {
  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const timeString = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return `Today at ${timeString}`;
  } else if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
    return `Yesterday at ${timeString}`;
  } else {
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });
    return `${dayOfWeek} at ${timeString}`;
  }
}
