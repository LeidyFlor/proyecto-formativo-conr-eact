import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";

function EditarMaterial() {
  // Leemos el ID del material desde la URL, ej: /materiales/consumibles/editar/123
  const { id } = useParams();

  const navigate = useNavigate();

  // Estado con los datos del material. Empieza vacío y se llena con los datos de la API.
  // Incluye tanto los campos base como los exclusivos de devolutivos,
  // los campos de devolutivo simplemente quedarán vacíos si es un material de consumo
  const [material, guardarMaterial] = useState({
    // Campos base (presentes en todos los materiales)
    nombreElemento: "",
    placaSena: "",
    descripcion: "",
    estado: "",
    cantidad: "",
    valorUnitario: "",
    valorTotal: "",
    ubicacion: "",
    marca: "",
    cuentadante: "",
    // Campos exclusivos de devolutivos 
    serial: "",
    modelo: "",
    categoria: "",
    dimensiones: "",
    fichaTecnica: "",
  });

  // Estado para almacenar la lista de marcas del backend
  const [marcas, guardarMarcas] = useState([]);

  // Estado para almacenar la lista de categorías del backend (solo devolutivos)
  const [categorias, guardarCategorias] = useState([]);

  // Estado para almacenar la lista de usuarios (cuentadantes) del backend
  const [usuarios, guardarUsuarios] = useState([]);

  // Detectamos si el material es devolutivo comprobando si tiene el campo serial.
  // Usamos la misma lógica que en Material.js y el backend (nuevoMaterial)
  const esDevolutivo = material.serial !== undefined && material.serial !== "";

  // Al cargar el componente consultamos el material y las listas de selectores
  useEffect(() => {
    // Consultamos los datos actuales del material para prellenar el formulario
    const consultarMaterial = async () => {
      const resultado = await inventarioAxios.get(`/materiales/${id}`);
      guardarMaterial(resultado.data);
    };

    // Consultamos las marcas para el selector
    const consultarMarcas = () => {
      inventarioAxios
        .get("/marcas")
        .then((res) => guardarMarcas(res.data))
        .catch(() =>
          Swal.fire("Error", "No se pudieron cargar las marcas", "error"),
        );
    };

    // Consultamos las categorías para el selector (se usa solo si es devolutivo)
    const consultarCategorias = () => {
      inventarioAxios
        .get("/categorias")
        .then((res) => guardarCategorias(res.data))
        .catch(() =>
          Swal.fire("Error", "No se pudieron cargar las categorías", "error"),
        );
    };

    // Consultamos los usuarios para el selector de cuentadante
    const consultarUsuarios = () => {
      inventarioAxios
        .get("/usuarios")
        .then((res) => guardarUsuarios(res.data))
        .catch(() =>
          Swal.fire("Error", "No se pudieron cargar los usuarios", "error"),
        );
    };

    consultarMaterial();
    consultarMarcas();
    consultarCategorias();
    consultarUsuarios();
  }, [id]); // Se vuelve a ejecutar si el id de la URL cambia

  // Actualiza el estado del material a medida que se modifican los campos
  const actualizarState = (e) => {
    guardarMaterial({
      ...material, // Conservamos los valores anteriores con spread
      [e.target.name]: e.target.value, // Solo actualizamos el campo que cambió
    });
  };

  // Función que se ejecuta al enviar el formulario
  const editarMaterial = async (e) => {
    e.preventDefault();

    try {
      // Enviamos los datos actualizados usando PUT con el ID del material
      await inventarioAxios.put(`/materiales/${id}`, material);

      Swal.fire({
        title: "Material actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigimos al listado de materiales
          navigate("/materiales");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar el material",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Valida los campos obligatorios antes de habilitar el botón.
  // Los devolutivos tienen campos extra obligatorios: serial, modelo y categoria.
  // Retorna true si hay algún campo vacío (deshabilita el botón),
  // false si todo está lleno (habilita el botón)
  const validarFormulario = () => {
    const {
      nombreElemento,
      estado,
      cantidad,
      valorUnitario,
      marca,
      serial,
      modelo,
      categoria,
    } = material;

    // Validación base — aplica a consumo y devolutivos
    const camposBase =
      !nombreElemento.length ||
      !estado.length ||
      !String(cantidad).length ||
      !String(valorUnitario).length ||
      !marca.length;

    // Validación extra — solo aplica si es devolutivo
    const camposDevolutivo = esDevolutivo
      ? !serial.length || !modelo.length || !categoria.length
      : false;

    return camposBase || camposDevolutivo;
  };

  return (
    <Fragment>
      <h2>
        {/* El título cambia según el tipo de material detectado */}
        {esDevolutivo
          ? "Editar Material Devolutivo"
          : "Editar Material de Consumo"}
      </h2>

      <form onSubmit={editarMaterial}>
        <legend>Modifica los campos que necesites</legend>

        {/*  Campos base se muestran siempre */}

        {/* Nombre del elemento */}
        <div className="campo">
          <label>Nombre del elemento:</label>
          <input
            type="text"
            placeholder="Nombre del elemento"
            name="nombreElemento"
            value={material.nombreElemento}
            onChange={actualizarState}
          />
        </div>

        {/* Placa SENA */}
        <div className="campo">
          <label>Placa SENA:</label>
          <input
            type="text"
            placeholder="Placa SENA"
            name="placaSena"
            value={material.placaSena || ""}
            onChange={actualizarState}
          />
        </div>

        {/* Descripción */}
        <div className="campo">
          <label>Descripción:</label>
          <input
            type="text"
            placeholder="Descripción del elemento"
            name="descripcion"
            value={material.descripcion || ""}
            onChange={actualizarState}
          />
        </div>

        {/* Estado — valores fijos según el enum del schema */}
        <div className="campo">
          <label>Estado:</label>
          <select
            name="estado"
            value={material.estado}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona --</option>
            <option value="Disponible">Disponible</option>
            <option value="No disponible">No disponible</option>
          </select>
        </div>

        {/* Cantidad */}
        <div className="campo">
          <label>Cantidad:</label>
          <input
            type="number"
            placeholder="Cantidad"
            name="cantidad"
            min="0"
            value={material.cantidad}
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
            value={material.valorUnitario}
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
            value={material.valorTotal || ""}
            onChange={actualizarState}
          />
        </div>

        {/* Ubicación */}
        <div className="campo">
          <label>Ubicación:</label>
          <input
            type="text"
            placeholder="Ubicación del elemento"
            name="ubicacion"
            value={material.ubicacion || ""}
            onChange={actualizarState}
          />
        </div>

        {/* Selector de marca — carga dinámicamente desde GET /marcas.
            Si el backend hizo populate, marca llega como objeto {_id, nombre_marca},
            entonces usamos marca?._id para preseleccionar correctamente */}
        <div className="campo">
          <label>Marca:</label>
          <select
            name="marca"
            value={material.marca?._id ?? material.marca}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona una marca --</option>
            {marcas.map((marca) => (
              <option key={marca._id} value={marca._id}>
                {marca.nombre_marca}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de cuentadante — carga dinámicamente desde GET /usuarios.
            Si el backend hizo populate, cuentadante llega como objeto {_id, nombre} */}
        <div className="campo">
          <label>Cuentadante:</label>
          <select
            name="cuentadante"
            value={material.cuentadante?._id ?? material.cuentadante}
            onChange={actualizarState}
          >
            <option value="">-- Selecciona un cuentadante --</option>
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* ── Campos exclusivos de devolutivos ──────────────────────
            Solo se renderizan si el material tiene serial (es devolutivo).
            Si es de consumo este bloque completo no aparece en el formulario.
        ────────────────────────────────────────────────────────── */}
        {esDevolutivo && (
          <>
            {/* Serial del equipo */}
            <div className="campo">
              <label>Serial:</label>
              <input
                type="text"
                placeholder="Serial del equipo"
                name="serial"
                value={material.serial || ""}
                onChange={actualizarState}
              />
            </div>

            {/* Modelo del equipo */}
            <div className="campo">
              <label>Modelo:</label>
              <input
                type="text"
                placeholder="Modelo del equipo"
                name="modelo"
                value={material.modelo || ""}
                onChange={actualizarState}
              />
            </div>

            {/* Selector de categoría — exclusivo de devolutivos.
                Si el backend hizo populate, categoria llega como objeto {_id, nombre} */}
            <div className="campo">
              <label>Categoría:</label>
              <select
                name="categoria"
                value={material.categoria?._id ?? material.categoria}
                onChange={actualizarState}
              >
                <option value="">-- Selecciona una categoría --</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensiones físicas del equipo */}
            <div className="campo">
              <label>Dimensiones:</label>
              <input
                type="text"
                placeholder="Ej: 30cm x 20cm x 10cm"
                name="dimensiones"
                value={material.dimensiones || ""}
                onChange={actualizarState}
              />
            </div>

            {/* Ficha técnica — actualmente Number en el schema.
                TODO: cuando el backend cambie este campo a File,
                reemplazar por un input type="file" */}
            <div className="campo">
              <label>Ficha técnica:</label>
              <input
                type="number"
                placeholder="Ficha técnica"
                name="fichaTecnica"
                min="0"
                value={material.fichaTecnica || ""}
                onChange={actualizarState}
              />
            </div>
          </>
        )}

        {/* Botón deshabilitado hasta que los campos obligatorios estén llenos */}
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

export default EditarMaterial;