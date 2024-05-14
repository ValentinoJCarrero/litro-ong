import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"
import CustomField from './CustomField';

interface IFormValues {
  title: string;
  subtitle: string;
  description: string;
  /*  primaryImage: File | null;
  secundaryImage: File | null;
  tertiaryImage: File | null;*/
}


const initialValues = {
  title: "",
  subtitle: "",
 /* primaryImage: null,
  secundaryImage:null,
  tertiaryImage: null,*/
  description:""
};

const validate = (values:IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.title) {
    errors.title = "El Titulo es requerido";
  }else if (values.title.length < 10) {
    errors.title = "El titulo debe tener minimo 10 caracteres";
  }else if (values.title.length > 40 ) {
    errors.title = "El titulo debe tener maximo 40 caracteres";
  }

  if (!values.subtitle) {
    errors.subtitle = "El subtitulo es requerido";
  } else if (values.subtitle.length < 10 ) {
    errors.subtitle = "El subtitulo debe tener minimo 10 caracteres";
  }else if (values.subtitle.length > 30 ) {
    errors.subtitle = "El subtitulo debe tener maximo 30 caracteres";
  }

  if (!values.description) {
    errors.description = "La descripcion es requerida";
  }else if (values.description.length < 100) {
    errors.description = "La descripcion  debe tener minimo 100 caracteres";
  }else if (values.description.length > 800 ) {
    errors.description = "La descripcion  debe tener maximo 800 caracteres";
  }

  return errors;
};


  const FormNewsFormik = () => (
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
            <label htmlFor="title" className="font-medium my-2 ">Titulo</label>
            <div className="flex w-full">
              <Field type="text" name="title" placeholder="Titulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.title && touched.title ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.title && touched.title ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.title && touched.title ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="title" component="span" className="text-warning" />

    </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Subtitulo</label>
            <div className="flex w-full">
              <Field type="text" name="subtitle" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.subtitle && touched.subtitle ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.subtitle && touched.subtitle ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.subtitle && touched.subtitle ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="subtitle" component="span" className="text-warning" />
            
        </div>
        {/*<div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto Principal</label>
            <Field type="file"  name="primaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="primaryImage" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 1</label>
            <Field type="file" name="secondaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="secondaryImage" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 2</label>
            <Field type="file" name="tertiaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="tertiaryImage" />
</div>*/}
        <div className="flex flex-col h-1/3">
            <label htmlFor="description" className="font-medium my-2 ">Descripcion</label>
            <div className="flex w-full">
              <Field as="textarea" name="description" placeholder="Describe la noticia"  className={`w-full resize-none h-40 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.description && touched.description ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.description && touched.description ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.description && touched.description? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="description" component="span" className="text-warning"/>
        </div>
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin/news" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Agregar</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormNewsFormik