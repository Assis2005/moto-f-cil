export function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number | string;
  tone?: "default" | "warning" | "success";
}) {
  const toneClass =
    tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "text-ink";
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-steel">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}
