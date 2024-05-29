import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { postLogin } from "../../helpers/Auth/postLogin";
import showPasswordWarning from "../../assets/showPasswordWarning.svg";
import showPassword from "../../assets/showPassword.svg";
import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
interface IFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número";
  }

  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  return errors;
};

const FormLoginFormik = () => {
  const [passwordText, setPasswordText] = useState("password");

  const handleShow = () => {
    setPasswordText((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        postLogin(values)
          .then((data) => {
            if (data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Bienvenido`,
                showConfirmButton: false,
                timer: 1500,
              })
              Cookies.set("token", data);
              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
              setSubmitting(false);
            } else if (!data) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: `Usuario no encontrado`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
            
          })
          .catch((error) => {
            console.error("Error:", error);
            setSubmitting(false);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className="text-sm text-textParagraph flex flex-col justify-center w-96  m-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium my-2 ">
              Email
            </label>
            <div className="flex w-full">
              <Field
                type="email"
                name="email"
                placeholder="Ingrese correo electrónico"
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
            <div className="h-4 text-warning">
              <ErrorMessage
                name="email"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="font-medium my-2 ">
              Contraseña
            </label>
            <div className="flex">
              <Field
                type={passwordText}
                name="password"
                placeholder="Ingrese contraseña"
                className={`w-96 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.password && touched.password
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.password && touched.password
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={showPasswordWarning.src}
                  alt="warningIcon"
                  className={`${
                    errors.password && touched.password ? "block" : "hidden"
                  }`}
                  onClick={handleShow}
                />
                <img
                  src={showPassword.src}
                  alt="warningIcon"
                  className={`${
                    errors.password && touched.password ? "hidden" : "block"
                  }`}
                  onClick={handleShow}
                />
              </div>
            </div>
            <div className="h-8 text-warning">
              <ErrorMessage
                name="password"
                component="span"
              />
            </div>
            <a
              href="/auth/register"
              className=" text-base font-medium m-2 text-center text-textSecondary"
            >
              ¿No tienes usuario?
            </a>
          </div>

          <div className="  flex flex-col items-center justify-center  gap-5">
            <button
              type="submit"
              className="bg-primary text-textPrimary  w-64  py-1 px-3 transition-all rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium  whitespace-nowrap"
            >
              Iniciar sesión
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormLoginFormik;
