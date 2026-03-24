/** IANA zone for chart axis / tooltips (US Eastern). */
export const CHART_TIMEZONE = 'America/New_York';

const axisFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: CHART_TIMEZONE,
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const tooltipFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: CHART_TIMEZONE,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
});

/** X-axis style label from an ISO timestamp. */
export function formatChartAxisDateNY(isoOrMs: string | number): string {
  const d = typeof isoOrMs === 'number' ? new Date(isoOrMs) : new Date(isoOrMs);
  if (!Number.isFinite(d.getTime())) return '';
  return axisFmt.format(d);
}

/** Tooltip / crosshair full label from an ISO timestamp. */
export function formatChartTooltipNY(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return iso;
  return tooltipFmt.format(d);
}

/** Format unix seconds (UTCTimestamp) for lightweight-charts time scale in New York. */
export function formatUnixSecondsNY(unixSec: number): string {
  const d = new Date(unixSec * 1000);
  if (!Number.isFinite(d.getTime())) return '';
  return axisFmt.format(d);
}
