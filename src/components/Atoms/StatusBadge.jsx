const colors = {
  pendiente: "bg-yellow-500",
  entregado: "bg-green-600", 
  cancelado: "bg-red-600",
};

export default function StatusBadge({ status }) {
  // Manejar status undefined/null con valor por defecto
  const safeStatus = status || 'pendiente';
  
  return (
    <span className={`px-3 py-1 rounded text-white text-sm ${colors[safeStatus] || colors.pendiente}`}>
      {safeStatus.toUpperCase()}
    </span>
  );
}
