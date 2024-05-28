import { useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { getEvents } from "../../helpers/Events/getEvents";
import vectorIcon from "../../assets/vectorIcon.svg";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getVolunteersByID } from "../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";

interface EventItem {
  primaryImage: string;
  title: string;
  address: string;
  date: string;
  location: string;
  href: string;
  id: number;
  timeStart: string;
  timeEnd: string;
}

interface Color {
  color: string;
}

const ListEventComponents = (props: Color) => {
  let idDecodificado: string;
  const tokenFromCookies: string | undefined = Cookies.get("token");

  const [message, setMessage] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    if (tokenFromCookies) {
      const decodedToken: any = jwtDecode(tokenFromCookies);
      const idDecodificado = decodedToken.userPayload.sub;
      setIdUser(idDecodificado);
    } else {
      setIsLoading(false);
      setMessage("Token no disponible");
    }
  }, [tokenFromCookies]);

  
  useEffect(() => {
    if (idUser) {
      getVolunteersByID(idUser)
        .then((data) => {
          console.log(data.volunteerData.events);
          setEvents(data.volunteerData.events);
          setIsLoading(false);
          setMessage(data.volunteerData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idUser]);

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch my-2 h-full">
      <h6 className="text-lg font-medium w-full text-center">A estos eventos te invitaron a participar!</h6>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      ) : (
        <ul className=" w-full flex flex-col gap-5 justify-center items-stretch content-center my-5">
          
          {events.map(({ primaryImage, title, address, date, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between items-center"
              >
                <a
                  className="flex flex-row justify-between items-center text-sm w-full"
                  id={`card${id}`}
                  href={`/dashboardAdmin/${title}`}
                >
                  <div className="flex">
                    <img
                      src={primaryImage}
                      alt={title}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h6
                        className={`text-${props.color} text-base font-semibold`}
                      >
                        {title}
                      </h6>
                      <div className=" text-sm text-textParagraph">

                      <p className=" ">{address}</p>
                      <p className="text-xs">{date}</p>
                      </div>
                    </div>
                  </div>

                  <img src={vectorIcon.src} alt="icono de vector" />
                </a>
              </li>
              <hr />
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListEventComponents;
