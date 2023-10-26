export function formatDate(
  dateString: string,
  hour12: boolean = true,
  second: 'numeric' | '2-digit' | undefined = undefined,
  minute: 'numeric' | '2-digit' | undefined = undefined,
  hour: 'numeric' | '2-digit' | undefined = undefined,
  day: 'numeric' | '2-digit' | undefined = undefined,
  year: 'numeric' | '2-digit' | undefined = undefined,
  month: 'numeric' | '2-digit' | 'short' | 'long' | undefined = undefined
): string {
  const options: Intl.DateTimeFormatOptions = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    hour12,
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
