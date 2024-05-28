import React, { useEffect, useState } from 'react';
import { getCommunityKitchens } from '../../helpers/CommunityKitchens/getCommunityKitchens';
import rectangle from '../../assets/rectangleCard.svg';
import cursorIcon from '../../assets/cursorIcon.svg';
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import NotFound from '../NotFound/NotFound';
import calendarIcon from '../../assets/calendarIcon.svg';

interface CommunityKitchen {
  id: string;
  name: string;
  address: string;
  holder: string;
  kidsNumber: string;
  days: string[];
  time: string;
  description: string;
  photo: string;
}

const GetAllCommunityKitchensComponent: React.FC = () => {
  const [communityKitchens, setCommunityKitchens] = useState<CommunityKitchen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCommunityKitchens = async () => {
      try {
        const kitchensData = await getCommunityKitchens(3, page);
        setCommunityKitchens(kitchensData.data);
        setTotalPages(Math.ceil(kitchensData.total / 3));
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCommunityKitchens();
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

  if (!communityKitchens.length) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {communityKitchens.map(({ id, name, days, photo }) => {
              return (
                <div
                  key={id}
                  className="h-96 w-96 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10 overflow-hidden"
                >
                  <a href={`/communityKitchens/DinamicCommunityKitchen/${id}`} className="block h-full w-full">
                    <div className="relative h-full w-full">
                      <img src={photo} alt="Community Kitchen" className="h-80 w-full object-cover" />
                      <img
                        src={rectangle.src}
                        alt="background card"
                        className="absolute bottom-0 w-full z-0"
                      />
                      <div className="absolute bottom-0 w-full z-20 p-4">
                        <h6 className="font-semibold">{name}</h6>
                        <div className="flex items-center">
                          <img src={calendarIcon.src} alt="calendar icon" className="mr-2" />
                          <p className="font-semibold">{days.join(' - ')}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img src={cursorIcon.src} alt="cursor icon" className="mr-2" />
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

export default GetAllCommunityKitchensComponent;
