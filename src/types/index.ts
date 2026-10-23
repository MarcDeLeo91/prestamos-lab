export interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
  disponible: boolean;
}

export interface Prestamo {
  id: number;
  equipoId: number;
  solicitante: string;
  carne: string;
  fechaPrestamo: string; // ISO 8601
  fechaLimite: string;   // ISO 8601 (YYYY-MM-DD)
  devuelto: boolean;
}

// Lo que captura el formulario
export interface DatosPrestamo {
  solicitante: string;
  carne: string;
  fechaLimite: string;
}