import React, { useEffect, useState } from "react";
import { getWorkshops } from ".././../helpers/Workshops/getWorkshops";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import rectangle from "../../assets/rectangleCard.svg";
import cursorIcon from "../../assets/cursorIcon.svg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import calendarIcon from "../../assets/calendarIcon.svg";

interface Workshop {
  id: string;
  name: string;
  teacher: string;
  teacherPhone: string;
  photo: string;
  timeStart: string;
  duration: string;
  dateStart: string;
  dateEnd: string;
  cost: string;
  days: string[];
  description: string;
}

const GetAllWorkShopsClientComponent: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const workshopsData = await getWorkshops(6, page);
        setWorkshops(workshopsData.data);
        setTotalPages(Math.ceil(workshopsData.total / 6));
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnersPrimary />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 w-full text-center text-3xl">
        Error: {error}
      </div>
    );
  }

  if (!workshops.length) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center flex-wrap m-2">
            {workshops.map(({ id, name, dateStart, photo }) => {
              const formattedDateStart = format(
                new Date(dateStart),
                "dd/MM/yyyy",
                { locale: es }
              );

              return (
                <div
                  key={id}
                  className="h-96 w-96 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10 overflow-hidden"
                >
                  <a
                    href={`/workshops/DinamicWorkShop/${id}`}
                    className="block h-full w-full"
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={photo}
                        alt="Workshop"
                        className="h-80 w-full object-cover"
                      />
                      <img
                        src={rectangle.src}
                        alt="fondo card"
                        className="absolute bottom-0 w-full z-0"
                      />
                     <div className="absolute bottom-0 w-full z-20 p-4">
                        <h6 className="font-semibold">{name}</h6>
                        <div className="flex items-center">
                          <img
                            src={calendarIcon.src}
                            alt="icono calendario"
                            className="mr-2 w-4 h-4"
                          />
                          <p className="font-semibold">{formattedDateStart}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img
                            src={cursorIcon.src}
                            alt="icono cursor"
                            className="mr-2"
                          />
                          <p className="font-semibold">Ver detalles</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </li>
      </ul>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold transition-all px-2 rounded"
        >
          {"<"}
        </button>
        <p className=" font-base text-lg mx-1">
          {page}/{totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold px-2 rounded"
        >
        {">"}
        </button>
      </div>
    </div>
  );
};

export default GetAllWorkShopsClientComponent;
