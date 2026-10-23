import type { Prestamo } from "../types";

export const MAX_DIAS = 5;

const aISO = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dia}`;
};

export const hoyISO = (): string => aISO(new Date());

export const maxFechaISO = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + MAX_DIAS);
  return aISO(d);
};

export const estaVencido = (p: Prestamo): boolean =>
  !p.devuelto && p.fechaLimite < hoyISO();

export const validarFechaLimite = (valor: string): string => {
  if (!valor) return "La fecha límite es obligatoria";
  if (valor < hoyISO()) return "La fecha no puede ser anterior a hoy";
  if (valor > maxFechaISO()) return `El máximo es de ${MAX_DIAS} días`;
  return "";
};