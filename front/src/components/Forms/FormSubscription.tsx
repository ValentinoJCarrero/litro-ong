import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import ButtonCTASmallReact from "../Buttons/ButtonCTASmallReact";
import { postSubscription } from "../../helpers/Donations/postSubscription";
import Modal from 'react-modal';
import { getSubscription } from "../../helpers/Donations/getSubscription";
import { postSubscriptionClose } from "../../helpers/Donations/postSubscriptionClose";
interface ExtendedWindow extends Window {
  $MPC_loaded?: boolean;
}

declare const window: ExtendedWindow;
const FormSubscription = () => {
  const [responseUrl, setResponseUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [subId, setSubId] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const initializeSubscription = async () => {
      const tokenUser = Cookies.get("token");

      if (tokenUser) {
        try {
          const decodedToken: any = jwtDecode(tokenUser);
          const idDecodificado = decodedToken.userPayload.sub;
          console.log(idDecodificado);
          const url = await postSubscription("test_user_2130751817@testuser.com");
          console.log(url.url);
          console.log(url.id);
          const subId = url.id;
          const userId = idDecodificado;
          setSubId(subId);
          setUserId(userId);
          const urlMp= url.url;
          setResponseUrl(urlMp);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      setIsLoading(false);
    };

    initializeSubscription();
  }, []);
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setModalIsOpen(true);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClose = async() => {
    const response = await postSubscriptionClose(subId, userId);
    console.log(response);
    setModalIsOpen(false)
  }

  return (
    <div>
      <a href={responseUrl} data-mp="MP-payButton" onClick={handleClick}>
        <ButtonCTASmallReact title="Suscribirme" idEvent="mp-payButton" onClick={() => {}}/>
      </a>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        contentLabel="Suscripción MercadoPago"
      >
        <div className="flex justify-between">
        <h2>Suscripción MercadoPago</h2>
        <button onClick={handleClose}>Cerrar</button>
        </div>
        <iframe src={responseUrl} className="w-full h-[90%]" />
        
      </Modal>
    </div>
  );
};

export default FormSubscription;