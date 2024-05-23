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
    const regex = /DinamicWorkshop\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
    } else {
      setUrl("");
    }
  }, []);

  useEffect(() => {
    const fetchWorkshopByTitle = async () => {
      if (url) {
        try {
          const workshopData = await getWorkshopsByTitle(url);
          setWorkshop(workshopData);
          setIsLoading(false);
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
        }
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
                {workshop.teacher}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.teacherPhone}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.timeStart}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.duration}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.dateStart} - {workshop.dateEnd}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.cost}
              </h4>
              <h4 className="text-3xl font-bold text-textTertiary">
                {workshop.days.join(", ")}
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
