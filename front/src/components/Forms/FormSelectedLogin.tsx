import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from "sweetalert2";
import { postWorkshops } from "../../helpers/Workshops/postWorkshops";

interface IFormValues {
  timeStart: string;
  days: string[];
  timeEnd: string;
}

const initialValues: IFormValues = {
  timeStart: "",
  timeEnd: "",
  days: [],
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.timeStart) {
    errors.timeStart = "El horario de inicio es requerido";
  }
  if (!values.timeEnd) {
    errors.timeEnd = "El horario de finalizado es requerido";
  }
  if (!values.days || values.days.length === 0) {
    errors.days = "Los días de la semana son requeridos";
  }

  console.log(errors);
  return errors;
};

const FormWorkshopsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      postWorkshops(values)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agregó correctamente`,
            showConfirmButton: false,
            timer: 1500,
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
      <Form className="text-sm text-textParagraph flex flex-col gap-5 h-2/3 justify-between">
        <div className=" flex flex-row items-center justify-center gap-5">
          <div className="flex flex-col w-1/2 ">
            <label htmlFor="timeStart" className="font-medium my-2">
              Horario de disponibilidad
            </label>
            <div className="flex items-center">
              <Field
                type="time"
                name="timeStart"
                placeholder="HH:MM"
                className={`w-full rounded-l-md border px-3 py-2 focus:outline-none ${
                  errors.timeStart && touched.timeStart
                    ? "border-warning text-warning"
                    : "border-backgroundGrey"
                }`}
              />
              {errors.timeStart && touched.timeStart && (
                <div className="flex items-center justify-center rounded-r-md px-4 bg-white border-warning">
                  <img src={warningIcon.src} alt="warningIcon" />
                </div>
              )}
            </div>
            <ErrorMessage
              name="timeStart"
              component="span"
              className="text-warning mt-1"
            />
          </div>

          <div className="flex flex-col  w-1/2 ">
            <label htmlFor="timeEnd" className="font-medium my-2">
              Fin del horario de disponibilidad
            </label>
            <div className="flex items-center">
              <Field
                type="time"
                name="timeEnd"
                placeholder="HH:MM"
                className={`w-full rounded-l-md border px-3 py-2 focus:outline-none ${
                  errors.timeEnd && touched.timeEnd
                    ? "border-warning text-warning"
                    : "border-backgroundGrey"
                }`}
              />
              {errors.timeEnd && touched.timeEnd && (
                <div className="flex items-center justify-center rounded-r-md px-4 bg-white border-warning">
                  <img src={warningIcon.src} alt="warningIcon" />
                </div>
              )}
            </div>
            <ErrorMessage
              name="timeEnd"
              component="span"
              className="text-warning mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="days" className="font-medium my-2">
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
            ].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <Field type="checkbox" name="days" value={day} />
                {day}
              </label>
            ))}
          </div>
          {errors.days && touched.days && (
            <span className="text-warning mt-1">{errors.days}</span>
          )}
        </div>

        <div className="flex justify-end gap-5 mt-4">
          <a
            href="/dashboardAdmin/news"
            className="bg-secondary text-textSecondary px-8 py-2 rounded-full text-lg shadow-3xl hover:scale-105 transition-transform"
          >
            Volver
          </a>
          <button
            type="submit"
            className="bg-tertiary text-textPrimary px-8 py-2 rounded-full text-lg shadow-3xl hover:scale-105 transition-transform disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
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
