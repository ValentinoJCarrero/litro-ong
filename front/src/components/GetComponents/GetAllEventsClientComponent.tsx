import React, { useEffect, useState } from 'react';
import { getEvents } from '.././../helpers/Events/getEvents'; 
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import rectangle from '../../assets/rectangleCard.svg';
import calendarIcon from '../../assets/calendarIcon.svg';
import cursorIcon from '../../assets/cursorIcon.svg';
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import NotFound from '../NotFound/NotFound';

interface Event {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  primaryImage: string;
  secondaryImage?: string | null;
  volunteer: any[];
}

const EventsClientComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents(3, page);
        setEvents(eventsData.data);
        setTotalPages(Math.ceil(eventsData.total / 3));
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEvents();
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
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  if (!events.length) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {events.map(({ id, title, date, primaryImage }) => {
              const formattedDate = format(new Date(date), 'dd/MM/yyyy', { locale: es });
              return (
                <div
                  key={id}
                  className="h-96 w-96 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10 overflow-hidden"
                >
                  <a href={`/events/DinamicEvent/${id}`} className="block h-full w-full">
                    <div className="relative h-full w-full">
                      <img src={primaryImage} alt="imagen" className="h-80 w-full object-cover" />
                      <img
                        src={rectangle.src}
                        alt="fondo card"
                        className="absolute bottom-0 w-full z-0"
                      />
                      <div className="absolute bottom-0 w-full z-20 p-4">
                        <h6 className="font-semibold">{title}</h6>
                        <div className="flex items-center">
                          <img src={calendarIcon.src} alt="icono calendario" className="mr-2" />
                          <p className="font-semibold">{formattedDate}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img src={cursorIcon.src} alt="icono cursor" className="mr-2" />
                          <h6 className="font-semibold">Ver detalles</h6>
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
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
        <span>{page} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EventsClientComponent;
