import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { postSponsors } from "../../helpers/Sponsors/postSponsors";
import Swal from 'sweetalert2'
interface IFormValues {
  email: string;
  name: string;
  logo: File | null;
}

const initialValues = {
  email: "",
  name: "",
  logo: null,
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!values.name) {
    errors.name = "El nombre de la empresa es requerido";
  } else if (values.name.length < 5) {
    errors.name = "El nombre de la empresa debe tener minimo 5 caracteres";
  } else if (values.name.length > 35) {
    errors.name = "El nombre de la empresa debe tener maximo 35 caracteres";
  }

  if (!values.logo) {
    errors.logo = "La imagen del logo es requerida";
  } else if (
    values.logo &&
    values.logo.type &&
    !values.logo.type.startsWith("image/")
  ) {
    errors.logo = "La imagen del logo debe ser un archivo de imagen";
  }

  if (!values.email) {
    errors.email = "El mail de la empresa es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  return errors;
};

const FormSponsorsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      postSponsors(values)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
          window.location.href = '/dashboardAdmin/sponsors'
          setSubmitting(false);
          console.log(values);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph h-full">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-2 ">
            Nombre de empresa sponsor
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="name"
              placeholder="Titulo de la empresa sponsor"
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
          <ErrorMessage name="name" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium my-2 ">
            Email
          </label>
          <div className="flex w-full">
            <Field
              type="email"
              name="email"
              placeholder="Dirección de correo electrónico"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.email && touched.email
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.email && touched.email
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.email && touched.email ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="email"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="logo" className="font-medium my-2">
            Logo
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            className="rounded-md bg-white border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "logo",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          <ErrorMessage name="logo" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col h-1/3"></div>
        <div className="my-3 w-full flex justify-end">
          <a
            href="/dashboardAdmin/sponsors"
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
      </Form>
    )}
  </Formik>
);
export default FormSponsorsFormik;
