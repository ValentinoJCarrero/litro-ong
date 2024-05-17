import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"

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

  if (!values.email) {
    errors.title = "El Titulo es requerido";
  }else if (values.email.length < 10) {
    errors.title = "El titulo debe tener minimo 10 caracteres";
  }else if (values.email.length > 40 ) {
    errors.title = "El titulo debe tener maximo 40 caracteres";
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


  const FormRegisterProfileFormik = () => (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        postNews(values)
        .then((data) => {
          alert(JSON.stringify(data, null, 2));
          setSubmitting(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched }) => (
    <Form className="text-sm text-textParagraph flex flex-col justify-center h-5/6">
      <div className="flex flex-row justify-between w-full ">
       <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Nombre</label>
            <div className="flex w-full">
              <Field type="text" name="name" placeholder="Ingrese su nombre" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.email && touched.email ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="name" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Apellido</label>
            <div className="flex w-full">
              <Field type="text" name="lastname" placeholder="Ingrese su apellidos" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.pasword && touched.pasword ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.pasword && touched.pasword ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.pasword && touched.pasword ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="lastname" component="span" className="text-warning" />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Número telefónicos</label>
            <div className="flex w-full">
              <Field type="number" name="phone" placeholder="Ingrese numero telefonico" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="phone" component="span" className="text-warning" />
            
          </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Fecha de Nacimiento</label>
            <div className="flex w-full">
              <Field type="text" name="brithDate" placeholder="Ingrese fecha de nacimiento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="brithDate" component="span" className="text-warning" />
            
        </div>
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">Numero de documento</label>
            <div className="flex w-full">
              <Field type="number" name="dni" placeholder="Ingrese su numero de documento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="dni" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">Domicilio</label>
            <div className="flex w-full">
              <Field type="text" name="address" placeholder="Ingrese su domicilio" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="address" component="span" className="text-warning" />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Pais</label>
            <div className="flex w-full">
              <Field type="number" name="country" placeholder="Seleciona pais" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="country" component="span" className="text-warning" />
            
          </div>
        <div className="flex flex-col w-full px-4">
            <label htmlFor="title" className="font-medium my-2 ">Provincia</label>
            <div className="flex w-full">
              <Field type="text" name="province" placeholder="Seleciona provincia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="province" component="span" className="text-warning" />
            
        </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Ciudad</label>
            <div className="flex w-full">
              <Field type="text" name="city" placeholder="Seleciona ciudad" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.paswordVerify && touched.paswordVerify ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="city" component="span" className="text-warning" />
        </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="title" className="font-medium my-2 mx-10">Volunario/a</label>
            <Field type="checkbox" name="Volunteer"  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
          </div>
          <div className="flex flex-col items-center justify-center mx-10">
            <label htmlFor="title" className="font-medium my-2 ">Socio/a</label>
            <Field type="checkbox" name="Partner"  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.paswordVerify && touched.paswordVerify ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
          </div>
        </div>
        <div className="my-20 w-full flex justify-end">
            <a href="/auth/register" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Siguiente</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormRegisterProfileFormik