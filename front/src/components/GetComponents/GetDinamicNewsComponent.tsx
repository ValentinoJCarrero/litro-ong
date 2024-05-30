import React, { useEffect, useState } from "react";
import { getNewsByTitle } from "../../helpers/getTitleNews";
import NotFound from "../NotFound/NotFound";
import BannerIndividualNews from "../fromNews/BannerIndividualNews";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface MainNews {
  id: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  secondaryImage: string;
  tertiaryImage: string;
  description: string;
  date: string;
  href: string;
}

const SearchResultsComponent: React.FC = () => {
  const [news, setNews] = useState<MainNews | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicNew\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
    } else {
      setUrl("");
    }
  }, []);

  useEffect(() => {
    const fetchNewsByTitle = async () => {
      setIsLoading(true);

      try {
        if (url) {
          const newsData = await getNewsByTitle(url);
          setNews(newsData);
        } else {
          setNews(null);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsByTitle();
  }, [url]);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <SpinnersPrimary />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : !!news && (
        <div className="flex flex-col">
          <BannerIndividualNews
            titulo={news.title}
            fecha={format(new Date(news.date), "dd/MM/yyyy", { locale: es })}
            banner={news.primaryImage}
          />

          <div className="bg-secondary">
            <div className="mx-24 p-16 flex flex-col gap-5">
              <h4 className="text-3xl font-bold text-textTertiary">
                {news.subtitle}
              </h4>
              <p className="text-base font-normal text-textParagraph">
                {news.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {news.secondaryImage && news.tertiaryImage && (
              <div className="rounded-3xl w-1/2 h-96 flex flex-row items-center justify-center flex-wrap content-center gap-10">
                <img
                  src={news.secondaryImage}
                  alt="imagen"
                  className="h-80 w-80 object-cover rounded-3xl"
                />
                <img
                  src={news.tertiaryImage}
                  alt="imagen"
                  className="h-80 w-80 object-cover rounded-3xl"
                />
              </div>
            )}

            {!news.secondaryImage && news.tertiaryImage && (
              <div className="m-24 w-full h-96 flex flex-row items-center flex-wrap justify-center gap-10">
                <img
                  src={news.tertiaryImage}
                  alt="imagen"
                  className="h-96 w-96 object-cover rounded-3xl"
                />
              </div>
            )}

            {news.secondaryImage && !news.tertiaryImage && (
              <div className="m-24 w-full h-96 flex flex-row items-center flex-wrap justify-center gap-10">
                <img
                  src={news.secondaryImage}
                  alt="imagen"
                  className="h-96 w-96 object-cover rounded-3xl"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsComponent;
