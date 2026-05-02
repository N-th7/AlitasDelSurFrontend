import SectionTitle from "../Atoms/SectionTitle";
import TableHeader from "../Atoms/TableHeader";
import TableRow from "../Atoms/TableRow";

export default function ProductSalesTable({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <SectionTitle title="Ventas por Producto" />

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No hay ventas registradas</p>
      ) : (
        <table className="w-full m-auto">
          <TableHeader columns={["Producto", "Cantidad"]} />
          <tbody>
            {data.map((r, i) => (
              <TableRow key={i}>
                <td className="px-4 py-2">{r.product}</td>
                <td className="px-4 py-2">{r.quantity}</td>
              </TableRow>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
