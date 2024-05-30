import React, { useEffect, useState } from "react";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getVolunteer } from "../../helpers/Volunteers/getVolunteers";
import ButtonCTASmallReact from "../Buttons/ButtonCTASmallReact";
import { postAddVolunteer } from "../../helpers/Events/postAddVolunteer";
import Swal from "sweetalert2";
interface User {
  id: string;
  fullName: string;
  email: string;
  fullAddress: string;
  phone: string;
}

interface VolunteersItem {
  availableDays: string[];
  endHours: string;
  events: any[];
  id: string;
  startHours: string;
  user: User;
  volunteerSince: string;
}

interface ApiResponse {
  data: VolunteersItem[];
  total: number;
  message: string;
}

const GetVolunteersWithEvents = ({ children }: any) => {
  const titleEvent = children;
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [volunteers, setVolunteers] = useState<VolunteersItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchNews = async (page: number) => {
      setIsLoading(true);
      const response: ApiResponse = await getVolunteer(3, page);
      setVolunteers(response.data);
      setMessage(response.message);
      setTotalPages(Math.ceil(response.total / 3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page]);

  const handleVolunteer = async (id:any, titleEvent:string): Promise<void> => {
    try {
      console.log(id);
      console.log(titleEvent);
      const response = await postAddVolunteer(id, titleEvent);
      console.log(response);
      if (!response.statusCode) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Se asignó correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          //window.location.reload()
        }, 1500);
      } else {
        throw new Error("Failed to add volunteer");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error al asignar voluntario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
};

  return (
    <div className="flex items-center justify-center h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinnersPrimary />
        </div>
      ) : message === "No hay voluntarios en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className="w-full">
          {volunteers.map(({ id, user, availableDays, endHours, startHours, volunteerSince }) => (
            <React.Fragment key={id}>
              <li className="flex flex-row flex-nowrap justify-between pr-10 items-center">
                  <div className="flex flex-row justify-between w-full pr-10">
                    <div>
                      <h6 className="text-tertiary text-base font-semibold">
                        {user.fullName}
                      </h6>
                      <p>{user.email}</p>
                    </div>
                    <div className="text-center">
                      <p>Días disponibles : {availableDays.join(", ")}</p>
                      <p>Horas: {startHours} - {endHours}</p>
                    </div>
                  </div>

                <div className="w-40 flex justify-center">
                <div className='mx-8'>
                      <ButtonCTASmallReact
                            title="Asignar"
                            idEvent={`assign-${id}`}
                            onClick={() => handleVolunteer(id, titleEvent)}
                            color="white"
                          />
                      </div>
                </div>
              </li>
              <hr />
            </React.Fragment>
          ))}
          <div className="flex items-center justify-center flex-row w-full mt-8">
            <div className="rounded-lg w-12 h-12 flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                className="w-full h-full font-medium text-xl"
              >
                {"<"}
              </button>
            </div>
            <p className="font-base text-lg mx-4">
              {page}/{totalPages}
            </p>
            <div className="rounded-lg w-12 h-12 flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
              <button
                onClick={() => page < totalPages && setPage(page + 1)}
                className="w-full h-full font-medium text-xl"
              >
                {">"}
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default GetVolunteersWithEvents;