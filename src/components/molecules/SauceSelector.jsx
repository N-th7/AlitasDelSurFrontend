import React from "react";

const sauceOptions = ["Broaster", "BBQ", "Mostaza con miel", "Picante"];

const SauceSelector = ({ sauces, onChange }) => {
  const maxReached = sauces.length >= 3;

  const toggleSauce = (name, type) => {
    // Broaster NO lleva tipo nunca
  if (name === "Broaster") {
    onChange({ name, type: undefined });
    return;
  }

    onChange({ name, type });
  };

  const isSelected = (name) => sauces.some((s) => s.name === name);

  const getType = (name) =>
    sauces.find((s) => s.name === name)?.type || "bañada";

  return (
    <div className="mt-3 p-3 bg-white rounded-lg shadow">
      <p className="font-bold mb-2">Salsas (máximo 3):</p>

      <div className="grid grid-cols-1 gap-3">
        {sauceOptions.map((name) => {
          const selected = isSelected(name);
          const type = getType(name);

          return (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected}
                  disabled={!selected && maxReached}
                  onChange={() =>
                    toggleSauce(name, selected ? null : "bañada")
                  }
                />
                <span className="font-medium">{name}</span>
              </div>

              {/* Mostrar select SOLO si NO es Broaster */}
              {selected && name !== "Broaster" && (
                <select
                  value={type}
                  className="border rounded px-2 py-1"
                  onChange={(e) => toggleSauce(name, e.target.value)}
                >
                  <option value="bañada">Bañada</option>
                  <option value="aparte">Aparte</option>
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SauceSelector;
