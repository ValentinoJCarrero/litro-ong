import React, { useEffect, useState } from 'react';
import { getWorkshops } from '.././../helpers/Workshops/getWorkshops';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import rectangle from '../../assets/rectangleCard.svg';
import cursorIcon from '../../assets/cursorIcon.svg';
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import NotFound from '../NotFound/NotFound';
import calendarIcon from '../../assets/calendarIcon.svg';

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

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const workshopsData = await getWorkshops(2, 1);
        setWorkshops(workshopsData.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  if (isLoading) {
    return <SpinnersPrimary />;
  }

  if (error) {
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  if (!workshops.length) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {workshops.map(({ id, name, dateStart, teacherPhone, photo }) => {
              return (
                <div
                  key={id}
                  className="h-96 w-96 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10 overflow-hidden"
                >
                  <a href={`/workshops/DinamicWorkShop/${name}`} className="block h-full w-full">
                    <div className="relative h-full w-full">
                      <img src={photo} alt="Workshop" className="h-80 w-full object-cover" />
                      <img
                        src={rectangle.src}
                        alt="fondo card"
                        className="absolute bottom-0 w-full z-0"
                      />
                      <div className="absolute bottom-0 w-full z-20 p-4">
                        <h6 className="font-semibold">{name}</h6>
                        <div className="flex items-center">
                          <img src={calendarIcon.src} alt="icono calendario" className="mr-2" />
                          <p className="font-semibold">{dateStart}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img src={cursorIcon.src} alt="icono cursor" className="mr-2" />
                          <p className="font-semibold">{teacherPhone}</p>
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

export default GetAllWorkShopsClientComponent;
