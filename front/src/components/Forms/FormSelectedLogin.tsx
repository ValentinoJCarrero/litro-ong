import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from "sweetalert2";
import { postVolunteers } from "../../helpers/Volunteers/postVolunteers";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface IFormValues {
  startHours: string;
  availableDays: string[];
  endHours: string;
}

const initialValues: IFormValues = {
  startHours: "",
  endHours: "",
  availableDays: [],
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.startHours) {
    errors.startHours = "El horario de inicio es requerido";
  }
  if (!values.endHours) {
    errors.endHours = "El horario de finalizado es requerido";
  }
  if (!values.availableDays || values.availableDays.length === 0) {
    errors.availableDays = "Los días de la semana son requeridos";
  }

  return errors;
};

const FormWorkshopsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      //! este es propio

      const tokenFromCookies = Cookies.get("token");
      if (!tokenFromCookies) {
        Swal.fire({
          position: "top-end",
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
      } catch (error) {
        console.error("Error al decodificar token", error);
        setSubmitting(false);
        return;
      }

      postVolunteers(idDecodificado, values)
        .then((data) => {
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agregó correctamente`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/";
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
      <Form className="text-sm text-textParagraph flex flex-col gap-5 h-2/3 justify-between">
        <div className=" flex flex-row items-center justify-center gap-5">
          <div className="flex flex-col w-1/2 ">
            <label htmlFor="startHours" className="font-medium my-2">
              Horario de disponibilidad
            </label>
            <div className="flex items-center">
              <Field
                type="time"
                name="startHours"
                placeholder="HH:MM"
                className={`w-full rounded-l-md border px-3 py-2 focus:outline-none ${
                  errors.startHours && touched.startHours
                    ? "border-warning text-warning"
                    : "border-backgroundGrey"
                }`}
              />
              {errors.startHours && touched.startHours && (
                <div className="flex items-center justify-center rounded-r-md px-4 bg-white border-warning">
                  <img src={warningIcon.src} alt="warningIcon" />
                </div>
              )}
            </div>
            <ErrorMessage
              name="startHours"
              component="span"
              className="text-warning mt-1"
            />
          </div>

          <div className="flex flex-col  w-1/2 ">
            <label htmlFor="endHours" className="font-medium my-2">
              Fin del horario de disponibilidad
            </label>
            <div className="flex items-center">
              <Field
                type="time"
                name="endHours"
                placeholder="HH:MM"
                className={`w-full rounded-l-md border px-3 py-2 focus:outline-none ${
                  errors.endHours && touched.endHours
                    ? "border-warning text-warning"
                    : "border-backgroundGrey"
                }`}
              />
              {errors.endHours && touched.endHours && (
                <div className="flex items-center justify-center rounded-r-md px-4 bg-white border-warning">
                  <img src={warningIcon.src} alt="warningIcon" />
                </div>
              )}
            </div>
            <ErrorMessage
              name="endHours"
              component="span"
              className="text-warning mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="availableDays" className="font-medium my-2">
            Días de la semana
          </label>
          <div
            role="group"
            aria-labelledby="checkbox-group"
            className="flex flex-wrap gap-4"
          >
            {[
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
              "Domingo",
            ].map((availableDay) => (
              <label key={availableDay} className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="availableDays"
                  value={availableDay}
                />
                {availableDay}
              </label>
            ))}
          </div>
          {errors.availableDays && touched.availableDays && (
            <span className="text-warning mt-1">{errors.availableDays}</span>
          )}
        </div>

        <div className="flex justify-end gap-5 mt-4">
          <a
            href="/dashboardUser/profile/optionSelected/voluntario/"
            className=" bg-secondary transition-all text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"
          >
            Volver
          </a>
          <button
            type="submit"
            className="bg-tertiary  text-textPrimary px-10 py-1 rounded-full transition-all text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
            disabled={
              Object.keys(errors).length !== 0 ||
              Object.keys(touched).length === 0
            }
          >
            Agregar
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default FormWorkshopsFormik;
