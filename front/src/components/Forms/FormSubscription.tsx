import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import ButtonCTASmallReact from "../Buttons/ButtonCTASmallReact";
import { postSubscription } from "../../helpers/Donations/postSubscription";
interface ExtendedWindow extends Window {
  $MPC_loaded?: boolean;
}

declare const window: ExtendedWindow;
const FormSubscription = () => {
  const [responseUrl, setResponseUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSubscription = async () => {
      const tokenUser = Cookies.get("token");

      if (tokenUser) {
        try {
          const decodedToken: any = jwtDecode(tokenUser);
          const emailDecodificado = decodedToken.userPayload.email;
          const url = await postSubscription("test_user_2130751817@testuser.com");
          console.log(url.url);
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

  useEffect(() => {
    const loadMPCScript = () => {
      if (window.$MPC_loaded) return;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${document.location.protocol}//secure.mlstatic.com/mptools/render.js`;
      document.body.appendChild(script);
      window.$MPC_loaded = true;
    };

    if (!window.$MPC_loaded) {
      window.addEventListener('load', loadMPCScript);
    }

    return () => {
      window.removeEventListener('load', loadMPCScript);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <a href={responseUrl} data-mp="MP-payButton">
      <ButtonCTASmallReact title="Suscribirme" idEvent="mp-payButton" onClick={() => {}} />
    </a>
  );
};

export default FormSubscription;