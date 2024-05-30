import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from "sweetalert2";
import { postProposals } from "../../helpers/Proposals/postProposals";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface IFormValues {
  title: string;
  description: string;
}

const initialValues: IFormValues = {
  title: "",
  description: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedTitle = values.title.trim();
  const trimmedDescription = values.description.trim();

  if (!trimmedTitle) {
    errors.title = "El Título es requerido";
  } else if (trimmedTitle.length < 10) {
    errors.title = "El título debe tener mínimo 10 caracteres";
  } else if (trimmedTitle.length > 60) {
    errors.title = "El título debe tener máximo 60 caracteres";
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

const FormProposalsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      const tokenFromCookies = Cookies.get("token");
      if (!tokenFromCookies) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `ID de voluntario no encontrado`,
          showConfirmButton: false,
          timer: 1500,
        });
        setSubmitting(false);
        return;
      }

      let idDecodificado = "";
      try {
        const decodedToken: any = jwtDecode(tokenFromCookies);

        idDecodificado = decodedToken.userPayload.sub;
        console.log(decodedToken);
      } catch (error) {
        console.error("Error al decodificar token", error);
        setSubmitting(false);
        return;
      }
      postProposals(idDecodificado, values)
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
            window.location.href = '/dashboardUserVolunteer/statusProposals'
          }, 1500);}
          else {
            throw new Error("Failed to add proposal");
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al agregar la propuesta",
            showConfirmButton: false,
            timer: 1500
          });
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched }) => (
      <Form className="text-sm text-textParagraph my-5 ">
        <h6 className="text-lg font-medium w-full text-center">Detalla tu idea que te responderemos en brevedad!</h6>
        <div className="flex flex-col h-20">
          <label htmlFor="title" className="font-medium ">
            Título
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="title"
              placeholder="Título de la propuesta"
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
          <ErrorMessage
            name="title"
            component="span"
            className="text-warning"
          />
        </div>
        <div className=" flex flex-col gap-10">
          <div className="flex flex-col  h-80 ">
            <label htmlFor="description" className="font-medium my-2">
              Descripción
            </label>
            <div className="flex w-full">
              <Field
                as="textarea"
                name="description"
                placeholder="Describe de la propuesta"
                className={`w-full resize-none h-72 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
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
            <ErrorMessage
              name="description"
              component="span"
              className="text-warning"
            />
          </div>
          <div className=" flex flex-row items-center  justify-end">
         
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

export default FormProposalsFormik;
