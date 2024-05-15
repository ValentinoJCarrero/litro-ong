import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"

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

const validate = (values:IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "El Titulo es requerido";
  }else if (values.name.length < 10) {
    errors.name = "El titulo debe tener minimo 10 caracteres";
  }else if (values.name.length > 40 ) {
    errors.name = "El titulo debe tener maximo 40 caracteres";
  }

  if (!values.email) {
    errors.email = "El subtitulo es requerido";
  } else if (values.email.length < 10 ) {
    errors.email = "El subtitulo debe tener minimo 10 caracteres";
  }else if (values.email.length > 30 ) {
    errors.email = "El subtitulo debe tener maximo 30 caracteres";
  }

  return errors;
};


  const FormSponsorsFormik = () => (
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
    <Form className="text-sm text-textParagraph h-full">
       <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Nombre de empresa sponsor</label>
            <div className="flex w-full">
              <Field type="text" name="name" placeholder="Titulo de la empresa sponsor" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.name && touched.name ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.name && touched.name ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.name && touched.name ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="name" component="span" className="text-warning" />

    </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Email</label>
            <div className="flex w-full">
              <Field type="text" name="email" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.email && touched.email ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.email && touched.email ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="email" component="span" className="text-warning" />
            
        </div>
        {<div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Logo</label>
            <Field type="file"  name="logo" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="logo" />
        </div>}
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin/sponsor" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Agregar</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormSponsorsFormik