import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from 'sweetalert2'
import { postCommunityKitchens } from "../../helpers/CommunityKitchens/postCommunityKitchens";
interface IFormValues {
  name: string;
  address: string;
  photo: File | null;
  holder: string;
  kidsNumber: string;
  description: string;
  time: string;
  days: string[];
}


const initialValues: IFormValues = {
  name: "",
  address: "",
  holder: "",
  photo: null,
  kidsNumber: "",
  time: "",
  days: [""],
  description: "",
}


const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedDescription = values.description.trim()

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 4) {
    errors.name = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.name.length > 30) {
    errors.name = "El nombre debe tener máximo 30 caracteres";
  }

  if (!values.holder) {
    errors.holder = "El nombre es requerido";
  } else if (values.holder.length < 4) {
    errors.holder = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.holder.length > 30) {
    errors.holder = "El nombre debe tener máximo 30 caracteres";
  }

  if (!values.kidsNumber) {
    errors.kidsNumber = "El número de chicos que asisten es requerido";
  } else if (isNaN(Number(values.kidsNumber))) {
    errors.kidsNumber = "El número de chicos que asisten debe ser un valor numérico";
  } 

  if (values.photo === null) {
    errors.photo = "La imagen es requerida";
  } else if (!values.photo.type.startsWith("image/")) {
    errors.photo = "La imagen debe ser un archivo de imagen";
  }
  

  if (!values.address) {
    errors.address = "La dirección es requerida";
  }
  if (!values.time) {
      errors.time = "El horario es requerida";
  }

  if (!values.days) {
    errors.days = "Los días de la semana son requeridos";
  }

  if (!trimmedDescription) {
    errors.description = "La descripción es requerida";
  } else if (trimmedDescription.length < 100) {
    errors.description = "La descripción debe tener mínimo 100 caracteres";
  } else if (trimmedDescription.length > 1500) {
    errors.description = "La descripción debe tener máximo 1500 caracteres";
  }

  return errors;
};

const FormCommunityKitchensFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      postCommunityKitchens(values)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            //window.location.href = '/dashboardAdmin/workshops';
        }, 1500);
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph ">
        <div className="flex flex-col h-20">
          <label htmlFor="name" className="font-medium ">
            Nombre
          </label>
          <div className="flex w-full">
            <Field 
              type="text"
              name="name"
              placeholder="Nombre del taller"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.name && touched.name
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.name && touched.name
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.name && touched.name ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="name"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20 w-full pr-4">
          <label htmlFor="holder" className="font-medium my-2">
            Titular del merendero
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="holder"
              placeholder="Nombre del Titular"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.holder && touched.holder
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.holder && touched.holder
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.holder && touched.holder ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="holder"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20 w-full pl-4">
          <label htmlFor="address" className="font-medium my-2">
            Direccion del merendero.
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="address"
              placeholder="Ingresar Direccion"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.address && touched.address
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.address && touched.address
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.address && touched.address ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="address"
            component="span"
            className="text-warning"
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20 w-full pr-4">
          <label htmlFor="time" className="font-medium my-2">
            Horario de inicio
          </label>
          <div className="flex w-full">
            <Field
              type="time"
              name="time"
              placeholder="HH:MM"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.time && touched.time
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.time && touched.time
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.time && touched.time ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="time"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20 w-full pl-4">
          <label htmlFor="kidsNumber" className="font-medium my-2">
            Cantidad de chicos asistidos.
          </label>
          <div className="flex w-full">
            <Field
              type="number"
              name="kidsNumber"
              placeholder="Ingresar Cantidad"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.kidsNumber && touched.kidsNumber
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.kidsNumber && touched.kidsNumber
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.kidsNumber && touched.kidsNumber ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="kidsNumber"
            component="span"
            className="text-warning"
          />
        </div>
        </div>
        <div className="flex flex-col h-20 w-full ">
          <label htmlFor="days" className="font-medium my-2">
            Dias de la semana
          </label>
          <div className="flex w-full justify-between" role="group" aria-labelledby="checkbox-group">
          <label>
            <Field type="checkbox" name="days" value="Lunes" className="mx-2"/>
            Lunes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Martes"  className="mx-2"/>
            Martes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Miercoles" className="mx-2"/>
            Miercoles
          </label>
          <label>
            <Field type="checkbox" name="days" value="Jueves" className="mx-2"/>
            Jueves
          </label>
          <label>
            <Field type="checkbox" name="days" value="Viernes" className="mx-2"/>
            Viernes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Sabado" className="mx-2"/>
             Sabado
          </label>
          <label>
            <Field type="checkbox" name="days" value="Domingo" className="mx-2"/>
            Domingo
          </label>  
          </div>
        </div>
        <div className="flex flex-col h-20 my-2">
          <label htmlFor="photo" className="font-medium my-2">
            Foto Principal
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="rounded-md border-backgroundGrey  bg-white border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "photo",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          <ErrorMessage
            name="photo"
            component="span"
            className="text-warning"
          />
          </div>

        <div className=" flex flex-row gap-10">
        <div className="flex flex-col h-32  w-2/3">
          <label htmlFor="description" className="font-medium my-2">
            Descripción
          </label>
          <div className="flex w-full">
            <Field
              as="textarea"
              name="description"
              placeholder="Describe la noticia"
              className={`w-full resize-none h-20 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.description && touched.description
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.description && touched.description
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.description && touched.description ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="description"
            component="span"
            className="text-warning"
          />
        </div>
        <div className=" w-1/3 flex flex-row items-center  justify-end">
          <a
            href="/dashboardAdmin/communityKitchens"
            className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6"
          >
            Volver
          </a>
          <button
            type="submit"
            className="bg-tertiary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
            disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0}
          >
            Agregar
          </button>
        </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default FormCommunityKitchensFormik;
