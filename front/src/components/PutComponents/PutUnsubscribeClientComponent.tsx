import React, { useState } from "react";
import Swal from "sweetalert2";
import { unsubscribeEmail } from "../../helpers/Unsubscribe/PutUnsubscribe";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";

const Unsubscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Enviando solicitud de cancelación de suscripción...");
      const response = await unsubscribeEmail(email);
      console.log("Respuesta recibida:", response);

      if (response.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Te has dado de baja con éxito.",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al darse de baja: " + response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error: any) {
      console.error("Error al darse de baja:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al darse de baja: " + error.message,
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-16">
      <form onSubmit={handleSubmit} className="text-sm text-textParagraph flex flex-col justify-center w-96 m-5">
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="font-medium my-2 text-lg">Correo electrónico:</label>
          <div className="flex w-full">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Ingrese correo electrónico"
              className="w-full rounded-md border-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary text-textPrimary w-64 py-2 transition-all rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <SpinnersPrimary /> : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Unsubscribe;
