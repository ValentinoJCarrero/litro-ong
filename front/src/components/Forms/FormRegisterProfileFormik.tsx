import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import {postNews} from "../../helpers/postNews";
import  warningIcon from "../../assets/IconWarrning.svg"

interface IFormValues {
  name: string;
  lastname: string;
  phone: string;
  brithDate: string;
  dni: string;
  address: string;
  country:string;
  province:string;
  city:string;
}


const initialValues = {
  name:"",
  lastname: "",
  phone: "",
  brithDate: "",
  dni: "",
  address: "",
  country:"",
  province:  "",
  city: "",
};

const validate = (values:IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (values.name.length > 50) {
    errors.name = "El nombre debe tener como máximo 50 caracteres";
  }


  if (!values.lastname) {
    errors.lastname = "El apellido es requerido";
  } else if (values.lastname.length < 2) {
    errors.lastname = "El apellido debe tener al menos 2 caracteres";
  } else if (values.lastname.length > 50) {
    errors.lastname = "El apellido debe tener como máximo 50 caracteres";
  }

  if (!values.phone) {
    errors.phone = "El número de teléfono es requerido";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "El número de teléfono debe ser un valor numérico";
  } else if (values.phone.toString().length !== 10) {
    errors.phone = "El número de teléfono debe tener 10 dígitos";
  }

  if (!values.brithDate) {
    errors.brithDate = "La fecha de nacimiento es requerida";
  } 

  if (!values.dni) {
    errors.dni = "El número de documento es requerido";
  } else if (isNaN(Number(values.dni))) {
    errors.dni = "El número de documento debe ser un valor numérico";
  } else if (values.dni.toString().length !== 8) {
    errors.dni = "El número de documento debe tener 8 dígitos";
  }

  if (!values.address) {
    errors.address = "La dirección es requerida";
  }

  if (!values.country) {
    errors.country = "El país es requerido";
  } 

  if (!values.province) {
    errors.province = "La provincia es requerida";
  }

  if (!values.city) {
    errors.city = "La ciudad es requerida";
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
              <Field type="text" name="name" placeholder="Ingrese su nombre" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.name && touched.name ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
              <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.name && touched.name ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.name && touched.name ? 'block' : 'hidden'}`}/>
              </div>
            </div>
            <ErrorMessage name="name" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Apellido</label>
            <div className="flex w-full">
              <Field type="text" name="lastname" placeholder="Ingrese su apellidos" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.lastname && touched.lastname ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.lastname && touched.lastname ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.lastname && touched.lastname ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="lastname" component="span" className="text-warning" />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Número telefónicos</label>
            <div className="flex w-full">
              <Field type="number" name="phone" placeholder="Ingrese numero telefonico" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.phone && touched.phone ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.phone && touched.phone ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.phone && touched.phone? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="phone" component="span" className="text-warning" />
            
          </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Fecha de Nacimiento</label>
            <div className="flex w-full">
              <Field type="text" name="brithDate" placeholder="Ingrese fecha de nacimiento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.brithDate && touched.brithDate ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.brithDate && touched.brithDate ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.brithDate && touched.brithDate? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="brithDate" component="span" className="text-warning" />
            
        </div>
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">Numero de documento</label>
            <div className="flex w-full">
              <Field type="number" name="dni" placeholder="Ingrese su numero de documento" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.dni && touched.dni ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.dni && touched.dni ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.dni && touched.dni ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="dni" component="span" className="text-warning" />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">Domicilio</label>
            <div className="flex w-full">
              <Field type="text" name="address" placeholder="Ingrese su domicilio" className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${errors.address && touched.address ? 'border-warningBorder text-warningText font-medium' : ''}`}/>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.address && touched.address ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.address && touched.address ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="address" component="span" className="text-warning" />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full pr-4">
            <label htmlFor="title" className="font-medium my-2 ">Pais</label>
            <div className="flex w-full">
            <Field
            as="select"
            name="country"
            placeholder="Selecciona país"
            className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
              errors.country && touched.country ? 'border-warningBorder text-warningText font-medium' : ''
            }`}
          >
            <option value="">Selecciona país</option>
            <option value="Argentina">Argentina</option>
            <option value="España">España</option>
          </Field>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.country  && touched.country  ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.country  && touched.country  ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="country" component="span" className="text-warning" />
            
          </div>
        <div className="flex flex-col w-full px-4">
            <label htmlFor="title" className="font-medium my-2 ">Provincia</label>
            <div className="flex w-full">
              
            <Field
            as="select"
            name="province"
            placeholder="Selecciona país"
            className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
              errors.province && touched.province ? 'border-warningBorder text-warningText font-medium' : ''
            }`}
          >
            <option value="">Selecciona país</option>
            <option value="NY">New York</option>
            <option value="SF">San Francisco</option>
            <option value="CH">Chicago</option>
            <option value="OTHER">Otro</option>
          </Field>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.province && touched.province ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.province && touched.province ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="province" component="span" className="text-warning" />
            
        </div>
        <div className="flex flex-col w-full pl-4">
            <label htmlFor="title" className="font-medium my-2 ">Ciudad</label>
            <div className="flex w-full">
            <Field
            as="select"
            name="city"
            placeholder="Selecciona país"
            className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
              errors.city && touched.city ? 'border-warningBorder text-warningText font-medium' : ''
            }`}
          >
            <option value="">Selecciona país</option>
            <option value="NY">New York</option>
            <option value="SF">San Francisco</option>
            <option value="CH">Chicago</option>
            <option value="OTHER">Otro</option>
          </Field>
            <div className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${errors.city && touched.city ? 'border-warningBorder text-warningText font-medium ' : ''}`}>
                <img src={warningIcon.src} alt="warningIcon" className={`${errors.city && touched.city ? 'block' : 'hidden'}`}/>
            </div>
            </div>
            <ErrorMessage name="city" component="span" className="text-warning" />
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