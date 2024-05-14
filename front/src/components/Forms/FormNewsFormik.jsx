import { Formik, Form, Field, ErrorMessage} from "formik";
import {postNews} from "../../helpers/postNews";



const initialValues = {
  title: "",
  subtitle: "",
 /* primaryImage: null,
  secundaryImage:null,
  tertiaryImage: null,*/
  description:""
};

const validate = (values) => {
  const errors = {};

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
      onSubmit={(values, { setSubmitting }) => {
        postNews(values, null, 2)
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
    <Form className="text-sm text-textParagraph h-full">
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Titulo</label>
            <Field type="text" name="title" placeholder="Titulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="title" component="span" className="text-warning" />

        </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Subtitulo</label>
            <Field type="text" name="subtitle" placeholder="Subtitulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
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
            <Field as="textarea" name="description" placeholder="Describe la noticia" className="h-full rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="description" component="span" className="text-warning"/>
        </div>
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin/news" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Agregar</button>
        </div>
    </Form>
  </Formik>
);
export default FormNewsFormik