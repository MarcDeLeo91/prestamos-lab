import { useEffect, useState } from "react";
import type { Equipo } from "../types";
import { obtenerEquipos } from "../services/api";

export function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false; // evita actualizar estado si el componente se desmontó

    obtenerEquipos()
      .then((datos) => {
        if (!cancelado) setEquipos(datos);
      })
      .catch(() => {
        if (!cancelado)
          setError("No se pudo cargar el inventario. Verifique que la API esté encendida.");
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [intento]); // se vuelve a ejecutar cuando "intento" cambia (Reintentar)

  const recargar = () => {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  };

  return { equipos, setEquipos, cargando, error, recargar };
}