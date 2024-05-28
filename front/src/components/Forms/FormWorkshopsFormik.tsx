import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from "sweetalert2";
import { postWorkshops } from "../../helpers/Workshops/postWorkshops";
interface IFormValues {
  name: string;
  teacher: string;
  teacherPhone: string;
  photo: File | null;
  timeStart: string;
  duration: string;
  dateEnd: string;
  dateStart: string;
  cost: string;
  days: string[];
  description: string;
}

const initialValues: IFormValues = {
  name: "",
  teacher: "",
  teacherPhone: "",
  photo: null,
  timeStart: "",
  duration: "",
  dateEnd: "",
  dateStart: "",
  cost: "",
  days: [],
  description: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedDescription = values.description.trim();

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 4) {
    errors.name = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.name.length > 50) {
    errors.name = "El nombre debe tener máximo 50 caracteres";
  }

  if (!values.teacher) {
    errors.teacher = "El nombre es requerido";
  } else if (values.teacher.length < 4) {
    errors.teacher = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.teacher.length > 30) {
    errors.teacher = "El nombre debe tener máximo 30 caracteres";
  }

  if (!values.teacherPhone) {
    errors.teacherPhone = "El número de teléfono es requerido";
  } else if (isNaN(Number(values.teacherPhone))) {
    errors.teacherPhone = "El número de teléfono debe ser un valor numérico";
  } else if (values.teacherPhone.toString().length !== 10) {
    errors.teacherPhone = "El número de teléfono debe tener 10 dígitos";
  }

  if (values.photo === null) {
    errors.photo = "La imagen es requerida";
  } else if (!values.photo.type.startsWith("image/")) {
    errors.photo = "La imagen debe ser un archivo de imagen";
  }

  if (!values.timeStart) {
    errors.timeStart = "El horario de inicio es requerido";
  }
  if (!values.duration) {
    errors.duration = "La duración es requerida";
  }
  if (!values.dateEnd) {
    errors.dateEnd = "La fecha de finalización es requerida";
  }
  if (!values.dateStart) {
    errors.dateStart = "La fecha de inicio es requerida";
  }
  if (!values.cost) {
    errors.cost = "El costo es requerido";
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

const FormWorkshopsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      postWorkshops(values)
        .then((response) => {
          if (!response.statusCode) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/dashboardAdmin/workshops";
          }, 1500);
          setSubmitting(false);
          }else {
          throw new Error("Failed to add workshop");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al agregar el taller",
            showConfirmButton: false,
            timer: 1500
          });
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph flex flex-col gap-1">
        <div className="flex flex-col h-20">
          <label htmlFor="name" className="font-medium ">
            Nombre
          </label>
          <div className="flex w-full bg-green-200">
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
          <div className="h-3 text-warning w-full">
            <ErrorMessage name="name" component="span" />
          </div>
        </div>
        <div className="flex flex-row h-20 ">
          <div className="flex flex-col h-20 w-full pr-4">
            <label htmlFor="teacher" className="font-medium ">
              Profesor/a
            </label>
            <div className="flex w-full">
              <Field
                type="text"
                name="teacher"
                placeholder="Nombre del Profesor/a"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.teacher && touched.teacher
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.teacher && touched.teacher
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.teacher && touched.teacher ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="teacher"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col h-20 w-full pl-4">
            <label htmlFor="teacherPhone" className="font-medium ">
              Numero telefonico profesor/a
            </label>
            <div className="flex w-full">
              <Field
                type="number"
                name="teacherPhone"
                placeholder="Ejemplo: 1234567890"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.teacherPhone && touched.teacherPhone
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.teacherPhone && touched.teacherPhone
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.teacherPhone && touched.teacherPhone
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="teacherPhone"
                component="span"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row h-20 ">
          <div className="flex flex-col h-20 w-full pr-4">
            <label htmlFor="timeStart" className="font-medium ">
              Horario de inicio
            </label>
            <div className="flex w-full">
              <Field
                type="time"
                name="timeStart"
                placeholder="HH:MM"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.timeStart && touched.timeStart
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.timeStart && touched.timeStart
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.timeStart && touched.timeStart ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="timeStart"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col h-20 w-full pl-4">
            <label htmlFor="duration" className="font-medium ">
              Duración
            </label>
            <div className="flex w-full">
              <Field
                type="text"
                name="duration"
                placeholder="Duracion del taller"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.duration && touched.duration
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.duration && touched.duration
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.duration && touched.duration ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="duration"
                component="span"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row h-20">
          <div className="flex flex-col h-20  w-full pr-4">
            <label htmlFor="dateStart" className="font-medium ">
              Fecha de inicio
            </label>
            <div className="flex w-full">
              <Field
                type="date"
                name="dateStart"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.dateStart && touched.dateStart
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.dateStart && touched.dateStart
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.dateStart && touched.dateStart ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="dateStart"
                component="span"
                className="text-warning"
              />
            </div>
          </div>
          <div className="flex flex-col h-20 w-full px-4">
            <label htmlFor="dateEnd" className="font-medium ">
              Fecha de finalización
            </label>
            <div className="flex w-full">
              <Field
                type="date"
                name="dateEnd"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.dateEnd && touched.dateEnd
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.dateEnd && touched.dateEnd
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.timeStart && touched.timeStart ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="dateEnd"
                component="span"
                className="text-warning"
              />
            </div>
          </div>
          <div className="flex flex-col h-20 w-full pl-4">
            <label htmlFor="cost" className="font-medium ">
              Costo del taller
            </label>
            <div className="flex w-full">
              <Field
                type="number"
                name="cost"
                placeholder="Costo del taller en Pesos Argentinos"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.cost && touched.cost
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.cost && touched.cost
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.cost && touched.cost ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
              <ErrorMessage
                name="cost"
                component="span"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
        
        <div className="flex flex-col h-20 ">
          <label htmlFor="photo" className="font-medium ">
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
          <div className="h-3 text-warning w-full">
            <ErrorMessage
              name="photo"
              component="span"
              className="text-warning"
            />
          </div>
        </div>
        <div className="flex flex-col h-20 gap-3 ">
          <label htmlFor="days" className="font-medium ">
            Dias de la semana
          </label>
          <div
            className="flex w-full justify-between flex-row gap-4 items-center content-center "
            role="group"
            aria-labelledby="checkbox-group"
          >
            {[
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
              "Domingo",
            ].map((days) => (
              <label key={days} className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="days"
                  value={days}
                />
                {days}
              </label>
            ))}
          </div>
        </div>
        </div>
        <div className=" flex flex-row gap-10 ">
          <div className="flex flex-col h-32  w-2/3">
            <label htmlFor="description" className="font-medium ">
              Descripción
            </label>
            <div className="flex w-full">
              <Field
                as="textarea"
                name="description"
                placeholder="Describe la noticia"
                className={`w-full resize-none h-18 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
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
                    errors.description && touched.description
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning w-full">
            <ErrorMessage
              name="description"
              component="span"
            />
            </div>
          </div>
          <div className=" w-1/3 flex flex-row items-center  justify-end">
            <a
              href="/dashboardAdmin/workshops"
              className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6"
            >
              Volver
            </a>
            <button
              type="submit"
              className="bg-tertiary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
              disabled={
                Object.keys(errors).length !== 0 ||
                Object.keys(touched).length === 0
              }
            >
              Agregar
            </button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default FormWorkshopsFormik;
