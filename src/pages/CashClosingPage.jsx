import React, { useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { processOrders } from "../utils/processOrders";
import CierreCajaView from "../components/organism/CashClosingReport";
import Button from "../components/Atoms/Button";

export default function CierreCajaPage() {
    const { loadTodayOrders, loadOrdersByDate, printReport } = useOrder();

    const [stats, setStats] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (date = null) => {
        setLoading(true);

        let orders;

        if (!date) {
            orders = await loadTodayOrders();
        } else {
            orders = await loadOrdersByDate(date);
        }

        const processed = processOrders(orders);
        setStats(processed);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        load(date);
    };

    if (loading || !stats) return <div className="p-6">Cargando...</div>;

    return (
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-xl text-white">Selecciona una fecha:</label>

                <div className="flex items-center bg-white text-black px-4 py-2 rounded-xl border-4 border-orange-400">

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="bg-transparent outline-none w-full text-sm"
                    />

                </div>
                <Button
                    text="Imprimir reporte"
                    variant="success"
                    className="px-4 py-2"
                    onClick={() => printReport({
                        ...stats,
                        date: selectedDate
                            ? `${selectedDate}T00:00:00`  
                            : new Date().toISOString()   
                    })}
                />



            </div>


            <CierreCajaView stats={stats} />
        </div>
    );
}
