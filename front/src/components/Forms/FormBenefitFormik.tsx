import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from 'sweetalert2'
import { postBenefits } from "../../helpers/Benefits/postBenefits";
interface IFormValues {
  address: string;
  name: string;
  benefits: string;
  benefitEndDate: string;
  description: string;
  logo: File | null;
}

const initialValues = {
  address: "",
  benefits: "",
  benefitEndDate: "",
  description: "",
  name: "",
  logo: null,
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};
  const trimmedDescription = values.description.trim()

  if (!values.name) {
    errors.name = "El nombre de la empresa es requerido";
  } else if (values.name.length < 5) {
    errors.name = "El nombre de la empresa debe tener minimo 5 caracteres";
  } else if (values.name.length > 50) {
    errors.name = "El nombre de la empresa debe tener maximo 50 caracteres";
  }

  if (!values.address) {
    errors.address = "La dirección es requerida";
  }

  if (!values.benefits) {
    errors.benefits = "Los beneficios son requeridos";
  }

  if (!values.benefitEndDate) {
    errors.benefitEndDate = "La fecha de fin de beneficios es requerida";
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

  if (!trimmedDescription) {
    errors.description = "La descripción es requerida";
  } else if (trimmedDescription.length < 100) {
    errors.description = "La descripción debe tener mínimo 100 caracteres";
  } else if (trimmedDescription.length > 1500) {
    errors.description = "La descripción debe tener máximo 1500 caracteres";
  }
  return errors;
};

const FormBenefitsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      postBenefits(values)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
          //window.location.href = '/dashboardAdmin/benefits'
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
      <Form className="text-sm text-textParagraph h-full flex flex-col gap-2">
        <div className="flex flex-col h-20">
          <label htmlFor="name" className="font-medium  ">
            Nombre de la empresa
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="name"
              placeholder="Nombre de la empresa que ofrece el beneficio"
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
        <div className="flex flex-col h-20">
          <label htmlFor="address" className="font-medium  ">
            Direccion
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="address"
              placeholder="Dirección del local"
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
        <div className="flex flex-col h-20">
          <label htmlFor="benefits" className="font-medium  ">
            Beneficios
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="benefits"
              placeholder="Beneficios del local"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.benefits && touched.benefits
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.benefits && touched.benefits
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.benefits && touched.benefits ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="benefits"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="benefitEndDate" className="font-medium  ">
            Finalizacion de beneficio
          </label>
          <div className="flex w-full">
            <Field
              type="date"
              name="benefitEndDate"
              placeholder="Fecha de finalizacion del beneficio"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.benefitEndDate && touched.benefitEndDate
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.benefitEndDate && touched.benefitEndDate
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.benefitEndDate && touched.benefitEndDate ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="benefitEndDate"
            component="span"
            className="text-warning"
          />
        </div>
        
        <div className="flex flex-col h-20">
          <label htmlFor="logo" className="font-medium ">
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
        <div className="flex flex-row gap-6">

       
        <div className="flex flex-col h-32   w-2/3">
          <label htmlFor="description" className="font-medium ">
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
        <div className=" w-1/3 flex flex-row justify-end items-end  py-4 ">
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
        </div>
      </Form>
    )}
  </Formik>
);
export default FormBenefitsFormik;
