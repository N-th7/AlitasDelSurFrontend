export default function SectionTitle({ icon, title }) {
  return (
    <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
      {icon}
      {title}
    </h2>
  );
}
