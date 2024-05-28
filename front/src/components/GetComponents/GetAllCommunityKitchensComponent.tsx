import React, { useEffect, useState } from 'react';
import { getCommunityKitchens } from '../../helpers/CommunityKitchens/getCommunityKitchens';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
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

  useEffect(() => {
    const fetchCommunityKitchens = async () => {
      try {
        const kitchensData = await getCommunityKitchens(5, 1);
        setCommunityKitchens(kitchensData.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCommunityKitchens();
  }, []);

  if (isLoading) {
    return <SpinnersPrimary />;
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
            {communityKitchens.map(({ id, name, address, holder, kidsNumber, days, time, photo }) => {
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
                        <p className="font-semibold">{address}</p>
                        <div className="flex items-center">
                          <img src={calendarIcon.src} alt="calendar icon" className="mr-2" />
                          <p className="font-semibold">{days.join(' - ')}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img src={cursorIcon.src} alt="cursor icon" className="mr-2" />
                          <p className="font-semibold">{holder}</p>
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
    </div>
  );
};

export default GetAllCommunityKitchensComponent;
