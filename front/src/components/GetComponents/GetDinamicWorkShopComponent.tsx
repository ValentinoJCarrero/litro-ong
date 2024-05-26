import React, { useEffect, useState } from "react";
import { getWorkshopsByTitle } from "../../helpers/Workshops/getTitleWorkshops";
import NotFound from "../NotFound/NotFound";
import BannerIndividualEvent from "../fromEvents/BannerIndividualEvent";
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

const DynamicWorkshop: React.FC = () => {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const urlParts = fullUrl.split('/');
    const id = urlParts[urlParts.length - 1];
    setUrl(id);
  }, []);

  useEffect(() => {
    const fetchWorkshopByTitle = async () => {
      if (url) {
        try {
          const workshopData = await getWorkshopsByTitle(url);
          setWorkshop(workshopData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchWorkshopByTitle();
  }, [url]);

  if (isLoading) {
    return <SpinnersPrimary />;
  }

  if (error) {
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  return (
    <div>
      {!workshop ? (
        <div className="flex flex-col justify-center items-center m-20">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-col">
          <BannerIndividualEvent
            titulo={workshop.name}
            fecha={format(new Date(workshop.dateStart), "MMMM dd, yyyy", { locale: es })}
            banner={workshop.photo}
            direccion=""
          />

          <div className="bg-secondary">
            <div className="mx-24 p-16 flex flex-col gap-5">
              <h4 className="text-3xl font-bold text-textTertiary">
                Teacher: {workshop.teacher}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Phone: {workshop.teacherPhone}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Start Time: {workshop.timeStart}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Duration: {workshop.duration} hours
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Dates: {workshop.dateStart} - {workshop.dateEnd}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Cost: ${workshop.cost}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                Days: {workshop.days.join(", ")}
              </h4>
              <p className="text-base font-normal text-textParagraph">
                {workshop.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicWorkshop;
