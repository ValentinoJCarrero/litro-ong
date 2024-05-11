import React from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import type { FormikHelpers } from "formik";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

const validate = (values: FormValues): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  }

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};

const FormNews: React.FC = ({Children}:any) => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form className="text-sm text-textParagraph h-full">
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Titulo</label>
            <Field type="text" name="title" placeholder="Titulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="title" component="div" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Subtitulo</label>
            <Field type="text" name="title" placeholder="Subtitulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="title" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="location " className="font-medium my-2 ">Lugar especifico</label>
            <Field type="text" name="location" placeholder="Lugar de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="location" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto Principal</label>
            <Field type="file" name="image" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="image" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 1</label>
            <Field type="file" name="image" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="image" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 2</label>
            <Field type="file" name="image" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" />
            <ErrorMessage name="image" />
        </div>
        <div className="flex flex-col h-1/3">
            <label htmlFor="description" className="font-medium my-2 " >Descripcion</label>
            <Field as="textarea" name="description" placeholder="Describe la noticia" className="h-full rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"/>
            <ErrorMessage name="description" />
        </div>
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
                </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Agregar</button>
        </div>
    </Form>
  </Formik>
);

export default FormNews;