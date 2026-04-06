import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";

export function Usuario({ usuario }) {
  const {
    _id,
    nombre,
    tipoDocumento,
    numDocumento,
    tipoUsuario,
    estado,
    fechaInicio,
    fechaFin,
    email,
    telefono,
    direccion,
    telefonoDos,
    emailInstitucional,
  } = usuario;
  const navigate = useNavigate();
  const eliminarUsuario = (idUsuario) => {
    Swal.fire({
      title: "Deseas eliminar este usuario?",
      text: "Esta opcion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((res) => {
      if (res.value) {
        // Enviamos la petición DELETE a la API con el ID del usuario
        inventarioAxios.delete(`/usuarios/${idUsuario}`).then((res) => {
          Swal.fire("Eliminado!", res.data.mensaje, "success");
        });
      }
    }); //Despus de que queda eliminado se manda a recargar la pagina
    navigate("/usuarios");
  };
  // Función para mostrar las fechas en formato legible (dd/mm/aaaa)
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    return new Date(fecha).toLocaleDateString("es-CO");
  };

  return (
    <Fragment>
      {/* Listado para que muestre la información del usuario, se inseta el html en el js */}
      <ul className="listado-usuarios">
        <li className="usuario">
          <div className="info-usuario">
            <p className="nombre">{nombre}</p>
            <p className="tipoDocumento">{tipoDocumento}: {numDocumento}</p>
             <p className="tipoUsuario">Tipo: {tipoUsuario}</p>
        {/* Mostramos el estado con un color visual según si está activo o no. Se utiliza operador termiaario para que el sistema elija entre si esta activo o no el usuario */}
        <p className={`estado ${estado === "activo" ? "estado-activo" : "estado-inactivo"}`}> Estado:
          {estado}
        </p>
        <p className="fechas">
          Desde: {formatearFecha(fechaInicio)} — Hasta: {formatearFecha(fechaFin)}
        </p>
            <p className="direccion">Dirección: {direccion}</p>
            <p className="telefono">Telefono:{telefono}</p>
            <p className="telefono">Telefono dos:{telefonoDos}</p>
            <p className="email">Email: {email}</p>
            <p className="email">Email institucional: {emailInstitucional}</p>
          </div>
          <div className="acciones">
            <Link to={`/usuarios/editar/${_id}`} className="btn btn-azul">
              <i className="fas fa-pen-alt"></i>
              Editar Usuario
            </Link>
            <button
              type="button"
              className="btn btn-rojo btn-eliminar"
              onClick={() => eliminarUsuario(_id)}
            >
              <i className="fas fa-times"></i>
              Eliminar Usuario
            </button>
          </div>
        </li>
      </ul>
    </Fragment>
  );
}