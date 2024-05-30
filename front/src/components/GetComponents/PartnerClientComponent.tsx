import React, { useEffect, useState } from "react";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getVolunteer } from "../../helpers/Volunteers/getVolunteers";
import { deleteVolunteer } from "../../helpers/Volunteers/deleteVolunteers";
import Swal from "sweetalert2";
import { getPartner } from "../../helpers/Partner/getPartner";
import { deletePartner } from "../../helpers/Partner/deletePartner";
interface User {
  id: string;
  fullName: string;
  email: string;
  fullAddress: string;
  phone: string;
}

interface PartnerItem {
  associateSince: string[];
  id: string;
  user: User;

}

interface ApiResponse {
  data: PartnerItem[];
  total: number;
  message: string;
}

const PartnerClientComponent = () => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [partner, setPartner] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async (page: number) => {
      setIsLoading(true);
      const response: ApiResponse = await getPartner(3, page);
      setPartner(response.data);
      console.log(response.data);
      setMessage(response.message);
      setTotalPages(Math.ceil(response.total / 3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page]);

  const onClic = async (id: string): Promise<void> => {
    Swal.fire({
      title: "Estas seguro/a de eliminar este socio?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009BDB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        setIsDeleting(true);

        await deletePartner(id);

        setTimeout(() => {
          setPartner(partner.filter((item) => item.id !== id));
          setIsDeleting(false);
          setDeletingId(null);
        }, 1000);
        Swal.fire({
          title: "Eliminado!",
          text: "El socio ha sido eliminada.",
          icon: "success",
        });
      }
    });
    console.log("Eliminando voluntario con ID:", id);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full py-4 ">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full ">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron patrocinadores" ? (
        <NotFound />
      ) : (
        <ul className="w-full flex flex-col gap-1  justify-between p-2">
          {partner.map(
            ({
              id,
              user,
              associateSince

              // volunteerSince,
            }) => (
              <React.Fragment key={id}>
                <li className="flex flex-row flex-nowrap my-2 w-full justify-between items-center">
                  <div className=" w-1/4 ">
                    <h6 className="text-tertiary  font-semibold">
                      {user.fullName}
                    </h6>
                    <p className="text-xs">{user.email}</p>
                  </div>
                  <div className="text-center flex flex-col h-full justify-center items-center text-xs w-96  ">
                    <p>{associateSince}</p>

                  </div>

                  <div className="   h-full flex justify-center items-center">
                    {isDeleting && deletingId === id ? (
                      <SpinnersDelete />
                    ) : (
                      <ButtonWarningSmall
                        title="Eliminar"
                        idEvent={`delete-${id}`}
                        onClick={() => onClic(id)}
                      />
                    )}
                  </div>
                  <hr />
                </li>
                <hr />
              </React.Fragment>
            )
          )}
        </ul>
      )}
      <div className="flex items-center justify-center flex-row w-full mt-8">
        <div className="rounded-lg w-8 h-8 flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
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
        <div className="rounded-lg w-8 h-8 flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            className="w-full h-full font-medium text-xl"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerClientComponent;
