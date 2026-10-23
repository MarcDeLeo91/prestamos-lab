import type { Equipo } from "../types";
import { TarjetaEquipo } from "./TarjetaEquipo";

interface ListaEquiposProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

export function ListaEquipos({ equipos, onPrestar }: ListaEquiposProps) {
  if (equipos.length === 0) return <p>No hay equipos que coincidan.</p>;

  return (
    <div className="lista">
      {equipos.map((e) => (
        <TarjetaEquipo key={e.id} equipo={e} onPrestar={onPrestar} />
      ))}
    </div>
  );
}