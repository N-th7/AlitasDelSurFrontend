export default function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-md font-semibold">{title}</h3>
      </div>

      <div className="text-3xl font-bold text-green-600">{value}</div>

      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
