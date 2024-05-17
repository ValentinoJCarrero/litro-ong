import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"
import { redirect } from "react-router-dom";

interface IFormValues {
  email: string;
  pasword: string;
  paswordVerify: string;
}


const initialValues = {
  email: "",
  pasword: "",
  paswordVerify:""
};

const validate = (values:IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  if (!values.pasword) {
    errors.pasword = "El subtitulo es requerido";
  } else if (values.pasword.length < 10 ) {
    errors.pasword = "El subtitulo debe tener minimo 10 caracteres";
  }else if (values.pasword.length > 30 ) {
    errors.pasword = "El subtitulo debe tener maximo 30 caracteres";
  }

  if (!values.paswordVerify) {
    errors.paswordVerify = "La descripcion es requerida";
  }else if (values.paswordVerify.length < 100) {
    errors.paswordVerify = "La descripcion  debe tener minimo 100 caracteres";
  }else if (values.paswordVerify.length > 800 ) {
    errors.paswordVerify = "La descripcion  debe tener maximo 800 caracteres";
  }

  return errors;
};


  const FormRegisterFormik = () => (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        postNews(values)
        .then((data) => {
          alert(JSON.stringify(data, null, 2));
          setSubmitting(false);
          redirect("/auth/register/personalInformation")
        })
        .catch((error) => {
          console.error('Error:', error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched }) => (
    <Form className="text-sm text-textParagraph flex flex-col justify-center h-5/6">
       <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Correo electronico</label>
            <div className="flex w-full">
              <Field type="email" name="email" placeholder="you@example.com" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.email && touched.email ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="email" component="span" className="text-warning" />

    </div>
    <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Contraseña</label>
            <div className="flex w-full">
              <Field type="password" name="pasword" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.pasword && touched.pasword ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.pasword && touched.pasword ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.pasword && touched.pasword ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="pasword" component="span" className="text-warning" />
            
        </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Repetir contraseña</label>
            <div className="flex w-full">
              <Field type="password" name="paswordVerify" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="paswordVerify" component="span" className="text-warning" />
            
        </div>
        </div>
        <div className="my-20 w-full flex justify-end">
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Siguiente</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormRegisterFormik