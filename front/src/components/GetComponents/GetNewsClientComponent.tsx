import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import CardNews from "../Cards/CardNews.astro";

interface MainNews {
  id: number;
  title: string;
  subtitle: string;
  primaryImage: string;
  secondaryImage: string;
  tertiaryImage: string;
  description: string;
  date: string;
}

const GetNewsClientComponent: React.FC = () => {
  const [news, setNews] = useState<MainNews[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews();
      setNews(newsData);
      console.log(getNews());
      console.log(newsData);
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <div className="flex flex-row gap-10 items-center justify-center m-2">
        {news.map((noticia) => (
          <CardNews
            key={noticia.id}
            title={noticia.title}
            href={`/news/${noticia.id}`}
            calendar={noticia.date}
          >
            <img
              src={noticia.primaryImage}
              alt="image"
              className="h-80 w-full object-cover rounded-3xl"
            />
          </CardNews>
        ))}
      </div>
    </div>
  );
};

export default GetNewsClientComponent;
