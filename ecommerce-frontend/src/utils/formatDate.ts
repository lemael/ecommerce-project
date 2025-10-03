function formatDate(dateString: string | undefined): string | undefined {
  if (!dateString) return undefined;
  return new Date(dateString).toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
export { formatDate };
