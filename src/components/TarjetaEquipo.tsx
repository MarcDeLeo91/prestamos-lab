import type { Equipo } from "../types";

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

export function TarjetaEquipo({ equipo, onPrestar }: TarjetaEquipoProps) {
  return (
    <article className="tarjeta">
      <h3>{equipo.nombre}</h3>
      <p className="categoria">{equipo.categoria}</p>
      <span className={`etiqueta ${equipo.disponible ? "ok" : "no"}`}>
        {equipo.disponible ? "Disponible" : "Prestado"}
      </span>
      <button onClick={() => onPrestar(equipo.id)} disabled={!equipo.disponible}>
        Prestar
      </button>
    </article>
  );
}