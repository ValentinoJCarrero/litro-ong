import React, { useEffect, useState } from "react";
import { getNewsByTitle } from "../../helpers/getTitleNews";

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
  const [url, setUrl] = useState('');
  console.log("Fetching news by title:", url);

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicNew\/(.+)/; // Captura todo lo que sigue a 'DinamicNew/'
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      // Decodificar la parte capturada
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
    } else {
      setUrl(''); // Maneja el caso en que no se encuentre coincidencia
    }
  }, []);

  useEffect(() => {
    const fetchNewsByTitle = async () => {
      if (url) {
        try {
          console.log("Fetching news for URL:", url);
          const newsData = await getNewsByTitle(url);
          console.log("Fetched news data:", newsData);
          setNews(newsData);
        } catch (error) {
          console.error("Error fetching news by url:", url, error);
        }
      }
    };
    fetchNewsByTitle();
  }, [url]);

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <div className="flex flex-row gap-10 items-center justify-center m-2">
        {!news ? (
          <p className="text-tertiary w-full text-center text-3xl">
            No se encontraron noticias para "{url}".
          </p>
        ) : (
          <div>

    

   
                  <h6 className="font-semibold">{news.title}</h6>
                  <h6 className="font-semibold">{news.subtitle}</h6>
                  <h6 className="font-semibold">{news.description}</h6>
                    <p className="font-semibold m-1">{news.date}</p>
                <div className="flex justify-end relative bottom-8 m-4">
                <img src={news.primaryImage} alt="imagen" />
                <img src={news.secondaryImage} alt="imagen" />
                <img src={news.tertiaryImage} alt="imagen" />

                </div>
  


          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsComponent;
