import type { Equipo, Prestamo } from "../types";

const API = import.meta.env.VITE_API_URL as string;

async function peticion<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  // fetch NO lanza error con 404 o 500, hay que revisarlo a mano
  if (!res.ok) {
    throw new Error(`El servidor respondió con el código ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const obtenerEquipos = (): Promise<Equipo[]> =>
  peticion<Equipo[]>("/equipos");

export const obtenerPrestamosActivos = (): Promise<Prestamo[]> =>
  peticion<Prestamo[]>("/prestamos?devuelto=false");

export const crearPrestamo = (datos: Omit<Prestamo, "id">): Promise<Prestamo> =>
  peticion<Prestamo>("/prestamos", {
    method: "POST",
    body: JSON.stringify(datos),
  });

export const actualizarEquipo = (id: number, disponible: boolean): Promise<Equipo> =>
  peticion<Equipo>(`/equipos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ disponible }),
  });

export const marcarDevuelto = (id: number): Promise<Prestamo> =>
  peticion<Prestamo>(`/prestamos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ devuelto: true }),
  });