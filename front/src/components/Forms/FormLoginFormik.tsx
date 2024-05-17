import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import  warningIcon from "../../assets/IconWarrning.svg"
import { postLogin } from "../../helpers/Auth/postLogin";


interface IFormValues {
  email: string;
  password: string;
}


const initialValues = {
  email: "",
  password: "",
};

const validate = (values:IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número";
  }


  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  return errors;
};


  const FormLoginFormik = () => (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        postLogin(values)
        .then((data) => {
          alert(JSON.stringify(data, null, 2));
          setSubmitting(false);
          console.log(values);
        })
        .catch((error) => {
          console.error('Error:', error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
    <Form className="text-sm text-textParagraph flex flex-col justify-center h-60">
      <div className="flex flex-col">
            <label htmlFor="email" className="font-medium my-2 ">Email</label>
            <div className="flex w-full">
              <Field type="email" name="email" placeholder="Ingrese correo electrónico" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.email && touched.email ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="email" component="span" className="text-warning" />
      </div>
      <div className="flex flex-col">
          <label htmlFor="password" className="font-medium my-2 ">Contraseña</label>
          <div className="flex w-full">
            <Field type="text" name="password" placeholder="Ingrese contraseña" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.password && touched.password ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.password && touched.password ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
              <img src={warningIcon.src} alt="warningIcon" className={`${errors.password && touched.password ? 'block' : 'hidden'}`}/>
            </div>
          </div>
          <ErrorMessage name="password" component="span" className="text-warning" />
      </div>
        
        <div className="flex flex-col h-1/3"></div>
        <div className="my-3 w-full flex flex-col items-center justify-center">
            
            <button type="submit" className="bg-primary text-textPrimary px-[88px] py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Iniciar Sesión</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormLoginFormik