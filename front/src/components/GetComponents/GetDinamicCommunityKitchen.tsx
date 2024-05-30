import React, { useEffect, useState } from "react";
import { getCommunityKitchensTitle } from "../../helpers/CommunityKitchens/getTitleCommunityKitchens";
import NotFound from "../NotFound/NotFound";
import BannerIndividualCommunityKitchen from "../fromCommunityKitchens/BannerIndividualCommunityKitchen";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";

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
  const [communityKitchen, setCommunityKitchen] =
    useState<CommunityKitchen | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicCommunityKitchen\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
    } else {
      setUrl("");
    }
  }, []);

  useEffect(() => {
    const fetchCommunityKitchenById = async () => {
      if (url) {
        try {
          const communityKitchenData = await getCommunityKitchensTitle(url);
          setCommunityKitchen(communityKitchenData);
          setIsLoading(false);
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };
    fetchCommunityKitchenById();
  }, [url]);

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

  return (
    <div>
      {!communityKitchen ? (
        <div className="flex flex-col justify-center items-center m-20">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <BannerIndividualCommunityKitchen
            titulo={communityKitchen.name}
            direccion={communityKitchen.address}
            banner={communityKitchen.photo}
          />

          <div className="bg-secondary">
            <div className="mx-24 p-16 flex flex-col">
              <h4 className="text-3xl font-bold text-textTertiary mb-5">
                Encargado: {communityKitchen.holder}
              </h4>
              <p className="text-base font-normal text-textParagraph mb-5">
                {communityKitchen.description}
              </p>
              <p className="text-base font-normal text-textParagraph">
                <strong> Número de niños:</strong> {communityKitchen.kidsNumber}
              </p>
              <p className="text-base font-normal text-textParagraph">
                <strong> Días:</strong> {communityKitchen.days.join(", ")}
              </p>
              <p className="text-base font-normal text-textParagraph">
                <strong>Hora:</strong> {communityKitchen.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicCommunityKitchen;
