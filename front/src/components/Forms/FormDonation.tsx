import React, { useState } from "react";
import Swal from "sweetalert2";
import ButtonCTASmallReact from "../Buttons/ButtonCTASmallReact";
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { postDonations } from "../../helpers/Donations/postDonation";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";

interface IFormValues {
  fullName: string | undefined;
  email: string | undefined;
  amount: null | number;
}

const initialValues: IFormValues = {
  fullName: undefined,
  email: undefined,
  amount: null,
};

interface ExtendedWindow extends Window {
  $MPC_loaded?: boolean;
}

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!values.amount) {
    errors.amount = "El monto es requerido";
  } else if (isNaN(Number(values.amount))) {
    errors.amount = "El monto debe ser un valor numérico";
  } else if (values.amount < 500) {
    errors.amount = "El monto debe ser mayor a $500";
  }


  return errors;
};

declare const window: ExtendedWindow;

const FormDonation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseUrl, setResponseUrl] = useState("");

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const handleClose = async () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
          postDonations(values)
            .then((response) => {
              console.log(response);
              if (!response.statusCode) {
                setResponseUrl(response.url);
                setSubmitting(false);
                setModalIsOpen(true);

              } else {
                throw new Error("Failed to donate");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Ocurrió un error al donar",
                showConfirmButton: false,
                timer: 1500,
              });
              setSubmitting(false);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="text-sm text-textParagraph flex flex-col justify-center h-full">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="font-medium my-2">
                Nombre y apellido
              </label>
              <div className="flex w-full">
                <Field
                  type="text"
                  name="fullName"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                    errors.fullName && touched.fullName
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white border-backgroundGrey border border-l-transparent focus-visible:outline ${
                    errors.fullName && touched.fullName
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.fullName && touched.fullName ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-textParagraph">
                <p>Nombre opcional</p>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium my-2">
                Email
              </label>
              <div className="flex w-full">
                <Field
                  type="email"
                  name="email"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                    errors.email && touched.email
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white border-backgroundGrey border border-l-transparent focus-visible:outline ${
                    errors.email && touched.email
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.email && touched.email ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-textParagraph">
                <p>Email opcional</p>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount" className="font-medium my-2">
                Monto
              </label>
              <div className="flex w-full">
                <Field
                  type="number"
                  name="amount"
                  placeholder="Ingresa un monto"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                    errors.amount && touched.amount
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white border-backgroundGrey border border-l-transparent focus-visible:outline ${
                    errors.amount && touched.amount
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.amount && touched.amount ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
                <ErrorMessage name="amount" component="span" />
              </div>
            </div>
            <div className="my-10 w-full flex justify-center">
              <button
                type="submit"
                className="bg-tertiary transition-all text-textPrimar px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap "
              >
                Enviar a Mercado Pago
              </button>

            </div>
          </Form>
        )}
      </Formik>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          contentLabel="Donacion MercadoPago"
        >
          <div className="flex justify-end py-2">
            <ButtonWarningSmall title="Cerrar" onClick={handleClose} idEvent="mp-payButton"/>
          </div>
          <iframe src={responseUrl} className="w-full h-[90%]" />
        </Modal>
      </div>
    </>
  );
};

export default FormDonation;
