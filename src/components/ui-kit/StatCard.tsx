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
    <div className="surface rounded-2xl p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{label}</p>
      <p className={`mt-2 font-display text-3xl font-semibold tracking-tight ${toneClass}`}>{value}</p>
    </div>
  );
}
