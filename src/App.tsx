import { useState } from "react";
import type { DatosPrestamo, Equipo, Prestamo } from "./types";
import { Encabezado } from "./components/Encabezado";
import { FormularioPrestamo } from "./components/FormularioPrestamo";
import { Inventario } from "./pages/Inventario";
import { PrestamosActivos } from "./pages/PrestamosActivos";
import { useEquipos } from "./hooks/useEquipos";
import { usePrestamos } from "./hooks/usePrestamos";
import { actualizarEquipo, crearPrestamo, marcarDevuelto } from "./services/api";

type Vista = "inventario" | "prestamos";

export default function App() {
  const {
    equipos, setEquipos,
    cargando: cargandoEquipos, error: errorEquipos, recargar: recargarEquipos,
  } = useEquipos();
  const {
    prestamos, setPrestamos,
    cargando: cargandoPrestamos, error: errorPrestamos, recargar: recargarPrestamos,
  } = usePrestamos();

  const [vista, setVista] = useState<Vista>("inventario");
  const [seleccionado, setSeleccionado] = useState<Equipo | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

  const cargando = cargandoEquipos || cargandoPrestamos;
  const error = errorEquipos || errorPrestamos;

  const reintentar = () => {
    recargarEquipos();
    recargarPrestamos();
  };

  const abrirFormulario = (id: number) => {
    setErrorAccion(null);
    setSeleccionado(equipos.find((e) => e.id === id) ?? null);
  };

  const guardarPrestamo = async (datos: DatosPrestamo) => {
    if (!seleccionado) return;
    setEnviando(true);
    setErrorAccion(null);
    try {
      const creado = await crearPrestamo({
        equipoId: seleccionado.id,
        ...datos,
        fechaPrestamo: new Date().toISOString(),
        devuelto: false,
      });
      const equipoActualizado = await actualizarEquipo(seleccionado.id, false);

      // La API ya confirmó: ahora sí se actualiza la interfaz (inmutable)
      setPrestamos((prev) => [...prev, creado]);
      setEquipos((prev) =>
        prev.map((e) => (e.id === equipoActualizado.id ? equipoActualizado : e))
      );
      setSeleccionado(null);
    } catch {
      setErrorAccion("No se pudo registrar el préstamo. Intente de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const devolver = async (prestamo: Prestamo) => {
    setEnviando(true);
    setErrorAccion(null);
    try {
      await marcarDevuelto(prestamo.id);
      const equipoActualizado = await actualizarEquipo(prestamo.equipoId, true);

      setPrestamos((prev) =>
        prev.map((p) => (p.id === prestamo.id ? { ...p, devuelto: true } : p))
      );
      setEquipos((prev) =>
        prev.map((e) => (e.id === equipoActualizado.id ? equipoActualizado : e))
      );
    } catch {
      setErrorAccion("No se pudo registrar la devolución. Intente de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Encabezado equipos={equipos} prestamos={prestamos} />
      <main>
        {cargando && <p>Cargando...</p>}

        {!cargando && error && (
          <div className="panel-error">
            <p>{error}</p>
            <button onClick={reintentar}>Reintentar</button>
          </div>
        )}

        {!cargando && !error && (
          <>
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

            {errorAccion && <p className="aviso">{errorAccion}</p>}

            {vista === "inventario" ? (
              <Inventario equipos={equipos} onPrestar={abrirFormulario} />
            ) : (
              <PrestamosActivos
                prestamos={prestamos}
                equipos={equipos}
                enviando={enviando}
                onDevolver={devolver}
              />
            )}

            {seleccionado && (
              <FormularioPrestamo
                equipo={seleccionado}
                enviando={enviando}
                onGuardar={guardarPrestamo}
                onCancelar={() => setSeleccionado(null)}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}