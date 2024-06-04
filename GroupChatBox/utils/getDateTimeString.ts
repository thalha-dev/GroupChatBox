export function getDateTimeString(timezone: string = "Asia/Kolkata"): string {
  // for possible timezones run,
  // Intl.supportedValuesOf('timeZone')

  const date = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: timezone,
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timezone,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date,
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date,
  );
  return `${formattedDate} ${formattedTime}`;
}
