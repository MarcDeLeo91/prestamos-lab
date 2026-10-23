import { useState } from "react";
import type { DatosPrestamo, Equipo, Prestamo } from "./types";
import { Encabezado } from "./components/Encabezado";
import { FormularioPrestamo } from "./components/FormularioPrestamo";
import { Inventario } from "./pages/Inventario";
import { PrestamosActivos } from "./pages/PrestamosActivos";
import { EQUIPOS_LOCALES } from "./data/equiposLocales";

type Vista = "inventario" | "prestamos";

export default function App() {
  const [equipos, setEquipos] = useState<Equipo[]>(EQUIPOS_LOCALES);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [vista, setVista] = useState<Vista>("inventario");
  const [seleccionado, setSeleccionado] = useState<Equipo | null>(null);

  const abrirFormulario = (id: number) => {
    setSeleccionado(equipos.find((e) => e.id === id) ?? null);
  };

  const guardarPrestamo = (datos: DatosPrestamo) => {
    if (!seleccionado) return;
    const nuevo: Prestamo = {
      id: Date.now(),
      equipoId: seleccionado.id,
      ...datos,
      fechaPrestamo: new Date().toISOString(),
      devuelto: false,
    };
    // Actualizaciones inmutables: spread y map, nunca push
    setPrestamos((prev) => [...prev, nuevo]);
    setEquipos((prev) =>
      prev.map((e) => (e.id === nuevo.equipoId ? { ...e, disponible: false } : e))
    );
    setSeleccionado(null);
  };

  const devolver = (prestamo: Prestamo) => {
    setPrestamos((prev) =>
      prev.map((p) => (p.id === prestamo.id ? { ...p, devuelto: true } : p))
    );
    setEquipos((prev) =>
      prev.map((e) => (e.id === prestamo.equipoId ? { ...e, disponible: true } : e))
    );
  };

  return (
    <>
      <Encabezado equipos={equipos} prestamos={prestamos} />
      <main>
        <nav className="nav">
          <button
            className={vista === "inventario" ? "activo" : "secundario"}
            onClick={() => setVista("inventario")}
          >
            Inventario
          </button>
          <button
            className={vista === "prestamos" ? "activo" : "secundario"}
            onClick={() => setVista("prestamos")}
          >
            Préstamos activos
          </button>
        </nav>

        {vista === "inventario" ? (
          <Inventario equipos={equipos} onPrestar={abrirFormulario} />
        ) : (
          <PrestamosActivos prestamos={prestamos} equipos={equipos} onDevolver={devolver} />
        )}

        {seleccionado && (
          <FormularioPrestamo
            equipo={seleccionado}
            onGuardar={guardarPrestamo}
            onCancelar={() => setSeleccionado(null)}
          />
        )}
      </main>
    </>
  );
}