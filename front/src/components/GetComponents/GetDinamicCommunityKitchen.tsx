import React, { useEffect, useState } from "react";
import { getCommunityKitchensTitle } from "../../helpers/CommunityKitchens/getTitleCommunityKitchens";
import NotFound from "../NotFound/NotFound";
import BannerIndividualCommunityKitchen from "../fromCommunityKitchens/BannerIndividualCommunityKitchen";
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

const DynamicCommunityKitchen: React.FC = () => {
  const [communityKitchen, setCommunityKitchen] = useState<CommunityKitchen | null>(null);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicCommunityKitchen\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedId = decodeURIComponent(match[1]);
      setId(decodedId);
    } else {
      setId("");
    }
  }, []);

  useEffect(() => {
    const fetchCommunityKitchenById = async () => {
      if (id) {
        try {
          const communityKitchenData = await getCommunityKitchensTitle(id);
          setCommunityKitchen(communityKitchenData);
          setIsLoading(false);
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };
    fetchCommunityKitchenById();
  }, [id]);

  if (isLoading) {
    return <SpinnersPrimary />;
  }

  if (error) {
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  return (
    <div>
      {!communityKitchen ? (
        <div className="flex flex-col justify-center items-center m-20">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-col">
          <BannerIndividualCommunityKitchen
            titulo={communityKitchen.name}
            direccion={communityKitchen.address}
            banner={communityKitchen.photo}
          />

          <div className="bg-secondary">
            <div className="mx-24 p-16 flex flex-col gap-5">
              <h4 className="text-3xl font-bold text-textTertiary">
                Encargado: {communityKitchen.holder}
              </h4>
              <p className="text-base font-normal text-textParagraph">
                {communityKitchen.description}
              </p>
              <p className="text-base font-normal text-textParagraph">
                Número de niños: {communityKitchen.kidsNumber}
              </p>
              <p className="text-base font-normal text-textParagraph">
                Días: {communityKitchen.days.join(', ')}
              </p>
              <p className="text-base font-normal text-textParagraph">
                Hora: {communityKitchen.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicCommunityKitchen;
