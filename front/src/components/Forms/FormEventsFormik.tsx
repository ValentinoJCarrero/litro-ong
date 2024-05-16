import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"
import { postEvents } from "../../helpers/Events/postEvents";

interface IFormValues {
  title: string;
  subtitle: string;
  description: string;
  address: string;
  date: string;
  primaryImage: File | null;
  secondaryImage: File | null;
  timeStart: string;
  timeEnd: string;
}


const initialValues = {
  title: "",
  subtitle: "",
  description:"",
  address:"",
  date:"",
  primaryImage: null,
  secondaryImage:null,
  timeStart: "",
  timeEnd: "",
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

  if (!values.primaryImage) {
    errors.primaryImage = "La imagen principal es requerida";
  } else if (values.primaryImage && values.primaryImage.type && !values.primaryImage.type.startsWith("image/")) {
    errors.primaryImage = "La imagen principal debe ser un archivo de imagen";
  }

  if (values.secondaryImage && values.secondaryImage.type && !values.secondaryImage.type.startsWith("image/")) {
    errors.secondaryImage = "La imagen secundaria debe ser un archivo de imagen";
  }

  if (!values.date) {
    errors.date = "La fecha es requerida";
  }

  if (!values.address) {
    errors.address= "La direccion es requerida";
  }

  if (!values.timeStart) {
    errors.timeStart= "La hora de inicio es requerida";
  }

  if (!values.timeEnd) {
    errors.timeEnd= "La hora de finalizacion es requerida";
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


  const FormEventsFormik = () => (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        postEvents(values)
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
    {({ errors, touched, setFieldValue }) => (
    <Form className="text-sm text-textParagraph h-full">
       <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Titulo</label>
            <div className="flex w-full">
              <Field type="text" name="title" placeholder="Titulo del evento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.title && touched.title ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.title && touched.title ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.title && touched.title ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="title" component="span" className="text-warning" />

    </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Subtitulo</label>
            <div className="flex w-full">
              <Field type="text" name="subtitle" placeholder="Subtitulo del evento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.subtitle && touched.subtitle ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.subtitle && touched.subtitle ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.subtitle && touched.subtitle ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="subtitle" component="span" className="text-warning" />
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col w-full mr-4">
            <label htmlFor="title" className="font-medium my-2 ">Direccion del evento</label>
            <div className="flex w-full">
              <Field type="text" name="address" placeholder="Dirección del evento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.address && touched.address ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.address && touched.address ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.address && touched.address ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="address" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full ml-4">
            <label htmlFor="title" className="font-medium my-2 ">Fecha de evento</label>
            <div className="flex w-full">
              <Field type="date" name="subtitle" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.date && touched.date ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.date && touched.date ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.date && touched.date ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="date" component="span" className="text-warning" />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col w-full mr-4">
            <label htmlFor="timeStart" className="font-medium my-2 ">Hora de inicio</label>
            <div className="flex w-full">
              <Field type="time" name="timeStart" placeholder="Hora de inicio" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.timeStart && touched.timeStart ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.timeStart && touched.timeStart ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.timeStart && touched.timeStart ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="timeStart" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full ml-4">
            <label htmlFor="timeEnd" className="font-medium my-2 ">Hora de finalización</label>
            <div className="flex w-full">
              <Field type="time" name="timeEnd" placeholder="Subtitulo de la noticia" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.timeEnd && touched.timeEnd ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.timeEnd && touched.timeEnd ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.timeEnd && touched.timeEnd ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="timeEnd" component="span" className="text-warning" />
        </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="primaryImage" className="font-medium my-2">Foto Principal</label>
          <input type="file" name="primaryImage" accept="image/*" className="rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={(event) => setFieldValue('primaryImage', event.currentTarget.files ? event.currentTarget.files[0] : null)} />
          <ErrorMessage name="primaryImage" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="secondaryImage" className="font-medium my-2">Foto secundaria</label>
          <input type="file" name="secondaryImage" accept="image/*" className="rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={(event) => setFieldValue('secondaryImage', event.currentTarget.files ? event.currentTarget.files[0] : null)} />
          <ErrorMessage name="secondaryImage" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col h-1/3">
            <label htmlFor="description" className="font-medium my-2 ">Descripcion</label>
            <div className="flex w-full">
              <Field as="textarea" name="description" placeholder="Describe la noticia"  className={`w-full resize-none h-20 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.description && touched.description ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.description && touched.description ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.description && touched.description? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="description" component="span" className="text-warning"/>
        </div>
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin/events" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap">Agregar</button>
        </div>
    </Form>
    )}
  </Formik>
);
export default FormEventsFormik