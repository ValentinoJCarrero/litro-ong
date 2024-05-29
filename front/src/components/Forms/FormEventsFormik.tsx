import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { postEvents } from "../../helpers/Events/postEvents";
import Swal from 'sweetalert2'
interface IFormValues {
  title: string;
  subtitle: string;
  description: string;
  address: string;
  date: string;
  primaryImage: File | null;
  secondaryImage: File | null;
  timeStart: string;
  timeEnd: string;
}

const initialValues = {
  title: "",
  subtitle: "",
  description: "",
  address: "",
  date: "",
  primaryImage: null,
  secondaryImage: null,
  timeStart: "",
  timeEnd: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedTitle = values.title.trim();
  const trimmedSubtitle = values.subtitle.trim()
  const trimmedDescription = values.description.trim()

  if (!trimmedTitle) {
    errors.title = "El Titulo es requerido";
  } else if (trimmedTitle.length < 10) {
    errors.title = "El titulo debe tener minimo 10 caracteres";
  } else if (trimmedTitle.length > 60) {
    errors.title = "El titulo debe tener maximo 60 caracteres";
  }

  if (!trimmedSubtitle) {
    errors.subtitle = "El subtitulo es requerido";
  } else if (trimmedSubtitle.length < 10) {
    errors.subtitle = "El subtitulo debe tener minimo 10 caracteres";
  } else if (trimmedSubtitle.length > 50) {
    errors.subtitle = "El subtitulo debe tener maximo 50 caracteres";
  }

  if (!values.primaryImage) {
    errors.primaryImage = "La imagen principal es requerida";
  } else if (
    values.primaryImage &&
    values.primaryImage.type &&
    !values.primaryImage.type.startsWith("image/")
  ) {
    errors.primaryImage = "La imagen principal debe ser un archivo de imagen";
  }

  if (
    values.secondaryImage &&
    values.secondaryImage.type &&
    !values.secondaryImage.type.startsWith("image/")
  ) {
    errors.secondaryImage =
      "La imagen secundaria debe ser un archivo de imagen";
  }

  if (!values.date) {
    errors.date = "La fecha es requerida";
  }

  if (!values.address) {
    errors.address = "La direccion es requerida";
  } else if (values.address.length < 10) {
    errors.address = "La direccion debe tener minimo 10 caracteres";
  }

  if (!values.timeStart) {
    errors.timeStart = "La hora de inicio es requerida";
  } else if (!/^\d{2}:\d{2}$/.test(values.timeStart)) {
    errors.timeStart = "Ingrese una hora válida (HH:MM)";
  }

  if (!values.timeEnd) {
    errors.timeEnd = "La hora de finalizacion es requerida";
  } else if (!/^\d{2}:\d{2}$/.test(values.timeEnd)) {
    errors.timeEnd = "Ingrese una hora válida (HH:MM)";
  }

  if (!trimmedDescription) {
    errors.description = "La descripcion es requerida";
  } else if (trimmedDescription.length < 100) {
    errors.description = "La descripcion  debe tener minimo 100 caracteres";
  } else if (trimmedDescription.length > 1500) {
    errors.description = "La descripcion  debe tener maximo 1500 caracteres";
  }

  return errors;
};

const FormEventsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values.timeStart);
      postEvents(values)
        .then((response) => {
          if (!response.statusCode) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = '/dashboardAdmin/events';
          }, 1500);
          setSubmitting(false);
          }else {
          throw new Error("Failed to add event");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al agregar el evento",
            showConfirmButton: false,
            timer: 1500
          });
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph ">
        <div className="flex flex-col h-20 ">
          <label htmlFor="title" className="font-medium  ">
            Titulo
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="title"
              placeholder="Titulo del evento"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.title && touched.title
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.title && touched.title
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.title && touched.title ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="h-3 text-warning">
            <ErrorMessage
              name="title"
              component="span"
            />
          </div>
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="title" className="font-medium  ">
            Subtitulo
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="subtitle"
              placeholder="Subtitulo del evento"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.subtitle && touched.subtitle
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.subtitle && touched.subtitle
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.subtitle && touched.subtitle ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="h-3 text-warning">
            <ErrorMessage
              name="subtitle"
              component="span"
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-between h-20">
          <div className="flex flex-col w-1/2  ">
            <label htmlFor="title" className="font-medium  ">
              Direccion del evento
            </label>
            <div className="flex w-11/12 ">
              <Field
                type="text"
                name="address"
                placeholder="Dirección del evento"
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
            <div className="h-3 text-warning">
              <ErrorMessage
                name="address"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 items-end">
            <div className=" w-11/12">
              <label htmlFor="title" className="font-medium   ">
                Fecha de evento
              </label>
              <div className="flex w-full">
                <Field
                  type="date"
                  name="date"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.date && touched.date
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.date && touched.date
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.date && touched.date ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-3 text-warning">
                <ErrorMessage
                  name="date"
                  component="span"
                />
            </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between h-20">
          <div className="flex flex-col w-1/2">
          <div className=" w-11/12">
            <label htmlFor="timeStart" className="font-medium  ">
              Hora de inicio
            </label>
            <div className="flex w-full">
              <Field
                type="time"
                name="timeStart"
                placeholder="Hora de inicio"
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
            </div>
            <div className="h-3 text-warning">
              <ErrorMessage
                name="timeStart"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 items-end">
            <div className=" w-11/12">
            <label htmlFor="timeEnd" className="font-medium  ">
              Hora de finalización
            </label>
            <div className="flex w-full">
              <Field
                type="time"
                step="1800"
                name="timeEnd"
                placeholder="Subtitulo de la noticia"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.timeEnd && touched.timeEnd
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.timeEnd && touched.timeEnd
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.timeEnd && touched.timeEnd ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-3 text-warning">
              <ErrorMessage
                name="timeEnd"
                component="span"
              />
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-row justify-between ">
          
          <div className="flex flex-col w-1/2 h-20">
          <div className=" flex flex-col w-11/12">
              <label htmlFor="primaryImage" className="font-medium ">
              Foto Principal
            </label>
            <input
              type="file"
              name="primaryImage"
              accept="image/*"
              className="rounded-md bg-white border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
              onChange={(event) =>
                setFieldValue(
                  "primaryImage",
                  event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null
                )
              }
              />
              <div className="h-3 text-warning">
                <ErrorMessage
                name="primaryImage"
                component="span"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 items-end">
            <div className=" w-11/12">

            <label htmlFor="secondaryImage" className="font-medium ">
              Foto secundaria
            </label>
           
            <input
              type="file"
              name="secondaryImage"
              
              accept="image/*"
              className="rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 w-full focus-visible:outline focus-visible:text-textTertiary"
              onChange={(event) =>
                setFieldValue(
                  "secondaryImage",
                  event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null
                )
              }
              />
              <div className="h-3 text-textParagraph">
                <p>Imagen opcional</p>
              </div>
          </div>
              
              </div>
        </div>
        <div className=" flex flex-row gap-10">

        <div className="flex flex-col h-32  w-2/3">
          <label htmlFor="description" className="font-medium  ">
            Descripcion
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
          <div className="h-3 text-warning">
            <ErrorMessage
            name="description"
            component="span"
            />
          </div>
        </div>
        <div className=" w-1/3 flex flex-row items-center  justify-end">
          <a
            href="/dashboardAdmin/events"
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
export default FormEventsFormik;
