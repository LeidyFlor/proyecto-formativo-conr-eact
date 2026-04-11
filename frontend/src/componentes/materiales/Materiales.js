import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { inventarioAxios } from "../../config/axios.js";
import { Material } from "./Material.js";

export default function Materiales() {
  // Lista completa de todos los materiales
  const [materiales, setMateriales] = useState([]);

  // Filtro, todos, consumo,devolutivo
  const [filtro, setFiltro] = useState("todos");

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // se cargan todos los materiales de una
    inventarioAxios
      .get("/materiales")
      .then((res) => {
        setMateriales(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  // Detectamos si un material es devolutivo comprobando si tiene
  // el campo categoria, siempre se tiene que llenar y esta solo presente en los devolutivos.
  // El backend de Mongoose no inyecta tipoMaterial en los devolutivos,
  // así que usamos la presencia de un campo exclusivo como discriminador visual.
  const esDevolutivo = (material) => material.serial !== undefined;

  // Aplicamos el filtro seleccionado sobre la lista completa
  const materialesFiltrados = materiales.filter((material) => {
    if (filtro === "devolutivo") return esDevolutivo(material);
    if (filtro === "consumo") return !esDevolutivo(material);
    return true; // "todos" no filtra nada
  });

  return (
    <Fragment>
      <div className="contenedor-app">
        <div className="barra">
          <h1>Materiales</h1>
          <div>
            {/* Agrupamos los dos botones juntos */}
            <Link to="/materiales/nuevo" className="btn btn-azul">
              <i className="fas fa-plus"></i>
              Nuevo Consumo
            </Link>
            <Link to="/materiales/devolutivos/nuevo" className="btn btn-azul">
              <i className="fas fa-plus"></i>
              Nuevo Devolutivo
            </Link>
          </div>
        </div>

        {/* Barra de filtros 
            Tres botones que actúan como tabs. El activo recibe la clase
            "btn-activo" para que el CSS lo resalte visualmente.*/}
        <div className="filtros-materiales">
          <button
            className={`btn ${filtro === "todos" ? "btn-activo" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            Todos
          </button>
          <button
            className={`btn ${filtro === "consumo" ? "btn-activo" : ""}`}
            onClick={() => setFiltro("consumo")}
          >
            Consumo
          </button>
          <button
            className={`btn ${filtro === "devolutivo" ? "btn-activo" : ""}`}
            onClick={() => setFiltro("devolutivo")}
          >
            Devolutivos
          </button>
        </div>

        {/* Mensaje mientras llega la respuesta del servidor */}
        {cargando && <p>Cargando materiales...</p>}

        {/* Mensaje cuando no hay resultados para el filtro activo */}
        {!cargando && materialesFiltrados.length === 0 && (
          <p>No hay materiales para mostrar.</p>
        )}

        {/*se una tarjeta por cada material filtrado.
            Le pasamos también si es devolutivo para que el componente
            hijo sepa qué campos extra mostrar. */}
        {materialesFiltrados.map((material) => (
          <Material
            key={material._id}
            material={material}
            esDevolutivo={esDevolutivo(material)}
          />
        ))}
      </div>
    </Fragment>
  );
}
