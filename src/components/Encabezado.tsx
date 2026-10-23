import type { Equipo, Prestamo } from "../types";
import { estaVencido } from "../utils/fechas";

interface EncabezadoProps {
  equipos: Equipo[];
  prestamos: Prestamo[];
}

export function Encabezado({ equipos, prestamos }: EncabezadoProps) {
  // Valores derivados: se calculan en cada render, sin useState
  const disponibles = equipos.filter((e) => e.disponible).length;
  const vencidos = prestamos.filter(estaVencido).length;

  return (
    <header className="encabezado">
      <h1>Préstamos Lab — 0902-23-10207</h1>
      <p>{disponibles} de {equipos.length} equipos disponibles</p>
      <p className={vencidos > 0 ? "alerta" : ""}>Préstamos vencidos: {vencidos}</p>
    </header>
  );
}