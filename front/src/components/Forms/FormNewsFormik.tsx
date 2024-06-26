import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { postNews } from "../../helpers/postNews";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from 'sweetalert2'
interface IFormValues {
  title: string;
  subtitle: string;
  description: string;
  primaryImage: File | null;
  secondaryImage: File | null;
  tertiaryImage: File | null;
}

const initialValues: IFormValues = {
  title: "",
  subtitle: "",
  primaryImage: null,
  secondaryImage: null,
  tertiaryImage: null,
  description: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedTitle = values.title.trim();
  const trimmedSubtitle = values.subtitle.trim()
  const trimmedDescription = values.description.trim()

  if (!trimmedTitle) {
    errors.title = "El Título es requerido";
  } else if (trimmedTitle.length < 10) {
    errors.title = "El título debe tener mínimo 10 caracteres";
  } else if (trimmedTitle.length > 60) {
    errors.title = "El título debe tener máximo 60 caracteres";
  }

  if (!trimmedSubtitle) {
    errors.subtitle = "El subtítulo es requerido";
  } else if (trimmedSubtitle.length < 10) {
    errors.subtitle = "El subtítulo debe tener mínimo 10 caracteres";
  } else if (trimmedSubtitle.length > 50) {
    errors.subtitle = "El subtítulo debe tener máximo 50 caracteres";
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

  if (
    values.tertiaryImage &&
    values.tertiaryImage.type &&
    !values.tertiaryImage.type.startsWith("image/")
  ) {
    errors.tertiaryImage = "La imagen terciaria debe ser un archivo de imagen";
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

const FormNewsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      postNews(values)
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
            window.location.href = '/dashboardAdmin/news'
          }, 1500);
            setSubmitting(false);
          }else {
          throw new Error("Failed to add news");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al agregar la noticia",
            showConfirmButton: false,
            timer: 1500
          });
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph ">
        <div className="flex flex-col h-20">
          <label htmlFor="title" className="font-medium ">
            Título
          </label>
          <div className="flex w-full">
            <Field 
              type="text"
              name="title"
              placeholder="Título de la noticia"
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
          <label htmlFor="subtitle" className="font-medium my-2">
            Subtítulo
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="subtitle"
              placeholder="Subtítulo de la noticia"
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
        <div className="flex flex-col h-20 my-2">
          <label htmlFor="primaryImage" className="font-medium my-2">
            Foto Principal
          </label>
          <input
            type="file"
            name="primaryImage"
            accept="image/*"
            className="rounded-md border-backgroundGrey  bg-white border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "primaryImage",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          
        </div>
        <div className="h-3 text-warning w-full">
            <ErrorMessage
              name="primaryImage"
              component="span"
            />
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap">

        <div className="flex flex-col w-1/2 h-20">
          <div className=" flex flex-col w-11/12">
          <label htmlFor="secondaryImage" className="font-medium my-2">
            Foto secundaria 1
          </label>
          <input
            type="file"
            name="secondaryImage"
            accept="image/*"
            className="rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "secondaryImage",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          
        </div>
        <div className="h-4 text-textParagraph">
          <p>Imagen opcional</p>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="tertiaryImage" className="font-medium my-2">
            Foto secundaria 2
          </label>
          <input
            type="file"
            name="tertiaryImage"
            accept="image/*"
            className="rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "tertiaryImage",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          
        </div>
        </div>
        <div className="h-4 text-textParagraph">
            <p>Imagen opcional</p>
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
          <div className="h-3 text-warning">
          <ErrorMessage
            name="description"
            component="span"
          />
          </div>
        </div>
        <div className=" w-1/3 flex flex-row items-center  justify-end">
          <a
            href="/dashboardAdmin/news"
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

export default FormNewsFormik;
