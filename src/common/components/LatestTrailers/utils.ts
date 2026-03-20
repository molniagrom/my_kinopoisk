export const formatTrailerDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

export const buildTrailerMeta = (publishedAt?: string) => {
  if (!publishedAt) return 'Official Trailer';
  return `Official Trailer - ${formatTrailerDate(publishedAt)}`;
};

export const buildReleaseRange = (daysBack = 60) => {
  const today = new Date();
  const end = today.toISOString().slice(0, 10);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - daysBack);
  const start = startDate.toISOString().slice(0, 10);
  return { start, end };
};
