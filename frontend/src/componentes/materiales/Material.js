import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";

// Componente que muestra la tarjeta de un material individual. Recibe "esDevolutivo" desde materiales para saber qué sección de campos extra renderizar sin tener que repetir la lógica de detección.
export function Material({ material, esDevolutivo }) {
  // Campos presentes en todos los materiales
  const {
    _id,
    placaSena,
    nombreElemento,
    cuentadante,
    descripcion,
    estado,
    cantidad,
    valorUnitario,
    valorTotal,
    ubicacion,
    marca,
    fechaCreacion,
    // Campos presentes solamente en MaterialesDevolutivos (discriminator) Estos solo existen si esDevolutivo es true
    serial,
    modelo,
    categoria,
    dimensiones,
    fichaTecnica,
  } = material;

  const navigate = useNavigate();
//La ruta es diferente si material es consumo o devolutivo (ej para editar)
  const rutaBase = esDevolutivo ? "/materiales/devolutivos"
    : "/materiales/consumibles";

  // Eliminar material --------------------
  const eliminarMaterial = (idMaterial) => {
    Swal.fire({
      title: "¿Deseas eliminar este material?",
      text: "Esta opción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.value) {
        // Un solo endpoint de deltele sirve para ambos tipos porque el id es único
        inventarioAxios.delete(`/materiales/${idMaterial}`).then((res) => {
          Swal.fire("Eliminado!", res.data.mensaje, "success");
          // Recargamos la página actual para actualizar la lista
          navigate(0);
        });
      }
    });
  };

  // Número como moneda colombiana
  const formatearMoneda = (valor) => {
    if (!valor && valor !== 0) return "Sin valor";
    return new Intl.NumberFormat("es-CO", {
      style: "currency", //formato de tipo moneda $
      currency: "COP", //peso colombiano
      minimumFractionDigits: 0, //sin decimales
    }).format(valor);
  };

  // Cambiar fotmaro de computador a dd/mm/aaaa
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    return new Date(fecha).toLocaleDateString("es-CO");
    //castea la fecha para ser legible en formato de colombia
  };

  return (
    <Fragment>
      <ul className="listado-materiales">
        <li className="materiales">
          <div className="info-material">
            {/* Etiqueta visual que indica el tipo de material */}
            <span
              className={`badge-tipo ${
                esDevolutivo ? "badge-devolutivo" : "badge-consumo"
              }`}
            >
              {/* Texto del tipo de material */}
              {esDevolutivo ? "Devolutivo" : "Consumo"}
            </span>

            {/* Nombre del elemento campo principal */}
            <p>{nombreElemento}</p>

            {/* Placa SENA más relevante en devolutivos pero puede existir en consumo */}
            {placaSena && <p>Placa SENA: {placaSena}</p>}

            {/* Campos exclusivos de devolutivos 
                Solo se muentran los siguientes campos si el materiales.js indicó esDevolutivo=true */}
            {esDevolutivo && (
              // <> = React Fragments. cuando se quieren mosrtar varias lineas de codigo dentro de una condicion, se agrupan en un solo elemento
              <>
                {/* Nullish Coalescing ?? si serial es  null muestra sin serial de lo contrario muestra el valor guardado*/}
                <p>Serial: {serial ?? "Sin serial"}</p>
                <p>Modelo: {modelo ?? "Sin modelo"}</p>
                {/* Categoría: si el backend hizo populate mostramos el nombre, si no el ID */}
                <p>
                  Categoría: {categoria?.nombre_categoria ?? categoria ?? "Sin categoría"}
                </p>
                {dimensiones && (
                  <p> Dimensiones: {dimensiones ?? "Sin dimensiones"}</p>
                )}
                {/* Ficha técnica: cuando el campo sea tipo File, colocar <a href={fichaTecnica}> */}
                {fichaTecnica && (
                  <p>
                    Ficha técnica: {fichaTecnica}{" "}
                    {/* TODO: cambiar a enlace cuando sea tipo File */}
                  </p>
                )}
              </>
            )}

            {/* Campos comunes a ambos tipos -------------------- */}

            {/* Marca: si el backend hizo populate mostramos el nombre, si no el ID */}
            <p>Marca: {marca?.nombre_marca ?? marca ?? "Sin marca"}</p>

            {/* Estado con color visual según disponibilidad */}
            <p
              className={`estado ${
                estado === "Disponible" ? "estado-activo" : "estado-inactivo"
              }`}
            >
              Estado: {estado}
            </p>

            <p>Cantidad: {cantidad ?? 0}</p>
            <p>Valor unitario: {formatearMoneda(valorUnitario)}</p>
            <p>Valor total: {formatearMoneda(valorTotal)}</p>

            <p>Ubicación: {ubicacion ?? "Sin ubicación"}</p>
            {/* si hay descripcion, colocala */}
            {descripcion && <p>Descripción: {descripcion}</p>}

            {/* Cuentadante. NUNCA se deberia de dar el caso sin asignar */}
            <p>
              Cuentadante: {cuentadante?.nombre ?? cuentadante ?? "Sin asignar"}
            </p>

            <p>Registrado: {formatearFecha(fechaCreacion)}</p>
          </div>

          {/*Botones de acción -------------------- */}
          <div className="acciones">
      
            {/* Editar — ruta diferente según tipo */}
            <Link to={`${rutaBase}/editar/${_id}`} className="btn btn-azul">
              <i className="fas fa-pen-alt"></i>
              Editar Material
            </Link>


            {/* Eliminar con confirmación */}
            <button
              type="button"
              className="btn btn-rojo btn-eliminar"
              onClick={() => eliminarMaterial(_id)}
            >
              <i className="fas fa-times"></i>
              Eliminar Material
            </button>
          </div>
        </li>
      </ul>
    </Fragment>
  );
}
