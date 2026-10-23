import { Encabezado } from "./components/Encabezado";
import { ListaEquipos } from "./components/ListaEquipos";
import { EQUIPOS_LOCALES } from "./data/equiposLocales";

export default function App() {
  return (
    <>
      <Encabezado equipos={EQUIPOS_LOCALES} prestamos={[]} />
      <main>
        <ListaEquipos
          equipos={EQUIPOS_LOCALES}
          onPrestar={(id) => console.log("Prestar", id)}
        />
      </main>
    </>
  );
}