import { Fragment, useState, useEffect } from "react";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NuevoMaterialConsumo() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del nuevo material de consumo
  const [material, guardarMaterial] = useState({
    nombreElemento: "",
    placaSena: "",
    descripcion: "",
    estado: "",
    cantidad: "",
    valorUnitario: "",
    valorTotal: "",
    ubicacion: "",
    marca: "", // Guardará el _id de la marca seleccionada
    cuentadante: "", // Guardará el _id del usuario seleccionado
  });

  // Estado para almacenar la lista de marcas que llega del backend
  const [marcas, guardarMarcas] = useState([]);

  // Estado para almacenar la lista de usuarios (cuentadantes) del backend
  const [usuarios, guardarUsuarios] = useState([]);

  // Al montar el componente cargamos marcas y usuarios para los selectores
  useEffect(() => {
    // Consultamos las marcas disponibles desde el backend
    inventarioAxios
      .get("/marcas")
      .then((res) => guardarMarcas(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar las marcas", "error"),
      );

    // Consultamos los usuarios para el selector de cuentadante
    inventarioAxios
      .get("/usuarios")
      .then((res) => guardarUsuarios(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los usuarios", "error"),
      );
  }, []); // El array vacío indica que solo se ejecuta una vez al montar

  // Actualiza el estado del material a medida que el usuario llena el formulario
  const actualizarState = (e) => {
    guardarMaterial({
      ...material, // Conservamos los valores anteriores con spread
      [e.target.name]: e.target.value, // Solo actualizamos el campo que cambió
    });
  };

  // Se ejecuta al enviar el formulario
  const agregarMaterial = (e) => {
    e.preventDefault();

    // Petición POST al endpoint de materiales
    inventarioAxios
      .post("/materiales", material)
      .then(() => {
        Swal.fire({
          title: "Material creado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigimos al listado general de materiales
            navigate("/materiales");
          }
        });
      })
      .catch((err) => {
        // Código 11000 en MongoDB indica que ya existe un registro con ese dato único
        if (err.response?.data?.code === 11000) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ya existe un material con esos datos",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al crear el material",
            confirmButtonText: "Aceptar",
          });
        }
      });
  };

  // Valida que los campos obligatorios no estén vacíos antes de habilitar el botón
  // Retorna true si hay algún campo vacío (deshabilita el botón),
  // false si todo está lleno (habilita el botón)
  const validarFormulario = () => {
    const { nombreElemento, estado, cantidad, valorUnitario, marca, cuentadante } = material;
    return (
      !nombreElemento.length ||
      !estado.length ||
      !String(cantidad).length ||
      !String(valorUnitario).length ||
      !marca.length ||
      !cuentadante.length
    );
  };

  return (
    <Fragment>
      <h2>Nuevo Material de Consumo</h2>

      <form onSubmit={agregarMaterial}>
        <legend>Llena todos los campos</legend>

        {/* Nombre del elemento */}
        <div className="campo">
          <label>Nombre del elemento:</label>
          <input
            type="text"
            placeholder="Nombre del elemento"
            name="nombreElemento"
            onChange={actualizarState}
            required
          />
        </div>

        {/* Placa SENA opcional en consumo */}
        <div className="campo">
          <label>Placa SENA:</label>
          <input
            type="text"
            placeholder="Placa SENA"
            name="placaSena"
            onChange={actualizarState}
          />
        </div>

        {/* Descripción general del elemento */}
        <div className="campo">
          <label>Descripción:</label>
          <input
            type="text"
            placeholder="Descripción del elemento"
            name="descripcion"
            onChange={actualizarState}
          />
        </div>

        {/* Estado del material */}
        <div className="campo">
          <label>Estado:</label>
          <select name="estado" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona ****
            </option>
            <option value="Disponible">Disponible</option>
            <option value="No disponible">No disponible</option>
          </select>
        </div>

        {/* Cantidad en inventario */}
        <div className="campo">
          <label>Cantidad:</label>
          <input
            type="number"
            placeholder="Cantidad"
            name="cantidad"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Valor unitario */}
        <div className="campo">
          <label>Valor unitario:</label>
          <input
            type="number"
            placeholder="Valor unitario"
            name="valorUnitario"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Valor total */}
        <div className="campo">
          <label>Valor total:</label>
          <input
            type="number"
            placeholder="Valor total"
            name="valorTotal"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Ubicación física dentro del almacén */}
        <div className="campo">
          <label>Ubicación:</label>
          <input
            type="text"
            placeholder="Ubicación del elemento"
            name="ubicacion"
            onChange={actualizarState}
          />
        </div>

        {/* Selector de marca carga dinámicamente desde GET de marcas */}
        <div className="campo">
          <label>Marca:</label>
          <select name="marca" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona una marca ****
            </option>
            {/* Las marcas guardadas en la bd */}
            {marcas.map((marca) => (
              <option key={marca._id} value={marca._id}>
                {marca.nombre_marca}
              </option>
            ))}
          </select>
        </div>

        {/* Seleccion del cuentadante carga dinámicamente desde el GET de usuarios */}
        <div className="campo">
          <label>Cuentadante:</label>
          <select name="cuentadante" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona un cuentadante ****
            </option>
            {/* Se muestran los usuarios que llegan del backend */}
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de envío deshabilitado si el formulario no es válido */}
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Material"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoMaterialConsumo;
