/**
 * StatusBadge — Shows Available or Booked status as a colored pill.
 */
export default function StatusBadge({ available }) {
  return available ? (
    <span className="badge-available flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
      Available
    </span>
  ) : (
    <span className="badge-booked flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
      Booked
    </span>
  );
}
