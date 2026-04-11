import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";

function EditarUsuario() {
  // useParams nos permite leer el ID que viene en la URL, ej: /usuarios/editar/123
  const { id } = useParams();

  // useNavigate nos permite redirigir al usuario a otra página desde el código
  const navigate = useNavigate();

  // Estado con los datos del usuario. Empieza vacío y luego se llena con los datos de la API
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    id_tipo_documento: "", //apunta al modelo de tipo documento
    numDocumento: "",
    id_tipo_usuario: "", //apunta al modelo de tipo de usuario
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    email: "",
    telefono: "",
    direccion: "",
    telefonoDos: "",
    emailInstitucional: "",
  });
  // Estado para almacenar la lista de tipos de documento que llega del backend
  const [tiposDocumento, guardarTiposDocumento] = useState([]);

  // Estado para almacenar la lista de tipos de usuario que llega del backend
  const [tiposUsuario, guardarTiposUsuario] = useState([]);

  // Al cargar el componente, consultamos la API para traer los datos actuales del usuario
  useEffect(() => {
    const consultarUsuario = async () => {
      const resultado = await inventarioAxios.get(`/usuarios/${id}`);
      // Llenamos el formulario con los datos que ya tiene el usuario
      // Guardamos los datos pero limpiando las fechas para que el input las entienda
      // MongoDB envía fecha y time stamps y necesitamos solo AAAA-MM-DD
      guardarUsuario({
        ...resultado.data,
        fechaInicio: resultado.data.fechaInicio
          ? resultado.data.fechaInicio.substring(0, 10)
          : "",
        fechaFin: resultado.data.fechaFin
          ? resultado.data.fechaFin.substring(0, 10)
          : "",
      });
    };
    // Consultamos los tipos de documento para el selector
    const consultarTiposDocumento = () => {
      inventarioAxios
        .get("/tiposdocumentos")
        .then((res) => guardarTiposDocumento(res.data))
        .catch(() =>
          Swal.fire(
            "Error",
            "No se pudieron cargar los tipos de documento",
            "error",
          ),
        );
    };

    // Consultamos los tipos de usuario para el selector
    const consultarTiposUsuario = () => {
      inventarioAxios
        .get("/tipousuarios")
        .then((res) => guardarTiposUsuario(res.data))
        .catch(() =>
          Swal.fire(
            "Error",
            "No se pudieron cargar los tipos de usuario",
            "error",
          ),
        );
    };

    consultarUsuario();
    consultarTiposDocumento();
    consultarTiposUsuario();
  }, [id]); // El [] solo se ejecuta si la pagina cambia

  // Cada vez que el usuario cambia un campo del formulario, actualizamos el estado
  const actualizarState = (e) => {
    guardarUsuario({
      ...usuario, // Mantenemos todos los campos anteriores
      [e.target.name]: e.target.value, // Solo actualizamos el campo que cambió
    });
  };

  // Función que se ejecuta cuando el usuario envía el formulario
  const editarUsuario = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      // Enviamos los datos actualizados a la API usando PUT (actualizar)
      await inventarioAxios.put(`/usuarios/${id}`, usuario);

      Swal.fire({
        title: "Usuario actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigimos al listado de usuarios
          navigate("/usuarios");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar el usuario",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Validamos que ningún campo esté vacío antes de habilitar el botón de guardar
  const validarFormulario = () => {
    const {
      nombre,
      id_tipo_documento,
      numDocumento,
      id_tipo_usuario,
      estado,
      fechaInicio,
      fechaFin,
      email,
      telefono,
      direccion,
    } = usuario;

    // Si algún campo está vacío, retorna true → el botón queda deshabilitado. Los numeros no tienen length de campo, entonces se convierte a String antes de ser pasado por el .legth
    return (
      !nombre.length ||
      !id_tipo_documento.length ||
      !String(numDocumento).length ||
      !id_tipo_usuario.length ||
      !estado.length ||
      !fechaInicio.length ||
      !fechaFin.length ||
      !email.length ||
      !telefono.length ||
      !direccion.length
    );
  };

  return (
    <Fragment>
      <h2>Editar Usuario</h2>

      <form onSubmit={editarUsuario}>
        <legend>Modifica los campos que necesites</legend>

        <div className="campo">
          <label>Nombre:</label>
          {/* value={usuario.nombre} hace que el input muestre el valor actual del usuario */}
          <input
            type="text"
            placeholder="Nombre Usuario"
            name="nombre"
            value={usuario.nombre}
            onChange={actualizarState}
          />
        </div>
        {/* se cargan los tipos de docuemnto existentes en la db */}

        <div className="campo">
          <label>Tipo de Documento:</label>
          <select
            name="id_tipo_documento"
            value={usuario.id_tipo_documento}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona --</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Número de Documento:</label>
          <input
            type="number"
            placeholder="Número de documento"
            name="numDocumento"
            value={usuario.numDocumento}
            onChange={actualizarState}
          />
        </div>
        {/* se cargan los tipos de usuarios existentes en la db */}
        <div className="campo">
          <label>Tipo de Usuario:</label>
          <select
            name="id_tipo_usuario"
            value={usuario.id_tipo_usuario}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona --</option>
            {tiposUsuario.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Estado:</label>
          <select
            name="estado"
            value={usuario.estado}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona --</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="campo">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            name="fechaInicio"
            value={usuario.fechaInicio}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Fecha Fin:</label>
          <input
            type="date"
            name="fechaFin"
            value={usuario.fechaFin}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Usuario"
            name="email"
            value={usuario.email}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Usuario"
            name="telefono"
            value={usuario.telefono}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Dirección:</label>
          <input
            type="text"
            placeholder="Dirección"
            name="direccion"
            value={usuario.direccion}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono Dos:</label>
          <input
            type="tel"
            placeholder="Teléfono dos Usuario"
            name="telefonoDos"
            value={usuario.telefonoDos}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email Institucional:</label>
          <input
            type="email"
            placeholder="Email institucional"
            name="emailInstitucional"
            value={usuario.emailInstitucional}
            onChange={actualizarState}
          />
        </div>
            {/* cuando los campos obligatorios estan llenos se activa el boton de enviar */}
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default EditarUsuario;
