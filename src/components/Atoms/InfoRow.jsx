export default function InfoRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between py-2 border-b border-white/10">
      <span className="text-white/80">{label}</span>
      <span className={`font-bold ${valueClass}`}>{value}</span>
    </div>
  );
}
