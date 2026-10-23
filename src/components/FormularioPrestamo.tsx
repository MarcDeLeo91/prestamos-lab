import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { DatosPrestamo, Equipo } from "../types";
import { hoyISO, maxFechaISO, validarFechaLimite } from "../utils/fechas";

interface FormularioPrestamoProps {
  equipo: Equipo;
  enviando?: boolean;
  onGuardar: (datos: DatosPrestamo) => void;
  onCancelar: () => void;
}

interface Errores {
  solicitante?: string;
  carne?: string;
  fechaLimite?: string;
}

const REGEX_CARNE = /^\d{4}-\d{2}-\d{5}$/;

function validar(d: DatosPrestamo): Errores {
  const errores: Errores = {};

  const nombre = d.solicitante.trim();
  if (!nombre) errores.solicitante = "El solicitante es obligatorio";
  else if (nombre.length < 5) errores.solicitante = "Mínimo 5 caracteres";

  if (!REGEX_CARNE.test(d.carne)) errores.carne = "Formato inválido. Use 0000-00-00000";

  const errFecha = validarFechaLimite(d.fechaLimite);
  if (errFecha) errores.fechaLimite = errFecha;

  return errores;
}

export function FormularioPrestamo({
  equipo,
  enviando = false,
  onGuardar,
  onCancelar,
}: FormularioPrestamoProps) {
  const [datos, setDatos] = useState<DatosPrestamo>({
    solicitante: "",
    carne: "",
    fechaLimite: "",
  });
  const [errores, setErrores] = useState<Errores>({});

  const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    onGuardar({ ...datos, solicitante: datos.solicitante.trim() });
  };

  return (
    <div className="fondo">
      <form className="modal" onSubmit={manejarEnvio} noValidate>
        <h2>Prestar: {equipo.nombre}</h2>

        <div className="campo">
          <label htmlFor="solicitante">Solicitante</label>
          <input
            id="solicitante"
            name="solicitante"
            value={datos.solicitante}
            onChange={manejarCambio}
            className={errores.solicitante ? "invalido" : ""}
          />
          {errores.solicitante && <span className="error">{errores.solicitante}</span>}
        </div>

        <div className="campo">
          <label htmlFor="carne">Carné</label>
          <input
            id="carne"
            name="carne"
            placeholder="0000-00-00000"
            value={datos.carne}
            onChange={manejarCambio}
            className={errores.carne ? "invalido" : ""}
          />
          {errores.carne && <span className="error">{errores.carne}</span>}
        </div>

        <div className="campo">
          <label htmlFor="fechaLimite">Fecha límite</label>
          <input
            id="fechaLimite"
            name="fechaLimite"
            type="date"
            min={hoyISO()}
            max={maxFechaISO()}
            value={datos.fechaLimite}
            onChange={manejarCambio}
            className={errores.fechaLimite ? "invalido" : ""}
          />
          {errores.fechaLimite && <span className="error">{errores.fechaLimite}</span>}
        </div>

        <div className="acciones">
          <button type="button" className="secundario" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </button>
          <button type="submit" disabled={enviando}>
            {enviando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}