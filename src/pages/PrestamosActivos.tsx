import type { Equipo, Prestamo } from "../types";
import { estaVencido } from "../utils/fechas";

interface PrestamosActivosProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  enviando?: boolean;
  onDevolver: (prestamo: Prestamo) => void;
}

export function PrestamosActivos({
  prestamos,
  equipos,
  enviando = false,
  onDevolver,
}: PrestamosActivosProps) {
  const activos = prestamos.filter((p) => !p.devuelto);

  if (activos.length === 0) return <p>No hay préstamos activos.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Equipo</th>
          <th>Solicitante</th>
          <th>Fecha límite</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {activos.map((p) => {
          const equipo = equipos.find((e) => e.id === p.equipoId);
          return (
            <tr key={p.id} className={estaVencido(p) ? "vencida" : ""}>
              <td>{equipo ? equipo.nombre : `Equipo #${p.equipoId}`}</td>
              <td>{p.solicitante}</td>
              <td>
                {p.fechaLimite}
                {estaVencido(p) && " (VENCIDO)"}
              </td>
              <td>
                <button onClick={() => onDevolver(p)} disabled={enviando}>
                  Devolver
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}