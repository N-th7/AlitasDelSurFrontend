export default function TableHeader({ columns }) {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((col, i) => (
          <th key={i} className="px-4 py-2 text-left text-sm font-semibold">{col}</th>
        ))}
      </tr>
    </thead>
  );
}
