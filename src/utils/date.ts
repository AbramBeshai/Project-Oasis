// Returns today's local date in a stable format like "2026-06-04".
// The app uses this to decide whether saved daily quests belong to today.
export function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
