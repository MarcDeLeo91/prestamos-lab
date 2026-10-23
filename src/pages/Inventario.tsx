import { useState } from "react";
import type { Equipo } from "../types";
import { ListaEquipos } from "../components/ListaEquipos";

interface InventarioProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

const CATEGORIAS = ["Monitor", "Teclado", "Mouse"];

export function Inventario({ equipos, onPrestar }: InventarioProps) {
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // Los dos filtros se combinan; el resultado se deriva, no se guarda en estado
  const visibles = equipos.filter(
    (e) =>
      (categoria === "Todas" || e.categoria === categoria) &&
      e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section>
      <div className="filtros">
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Todas">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <ListaEquipos equipos={visibles} onPrestar={onPrestar} />
    </section>
  );
}