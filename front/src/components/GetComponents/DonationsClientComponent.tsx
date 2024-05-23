import React, { useEffect, useState } from "react";
import vectorIcon from "../../assets/vectorIcon.svg";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import { deleteNews } from "../../helpers/deleteNews";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getDonations } from "../../helpers/Donations/getDonations";
interface NewsItem {
  name: string;
  email: string;
  date: string;
  amount: string;
  user: {};
  id: number;
}

const DonationsComponent = () => {
  const [page, setPage] = useState (1)
  const [message, setMessage] = useState ("")
  const [totalPages, setTotalPages] = useState (3)
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async (page: number) => {
      const newsData = await getDonations(3,page);
      setNews(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total/3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page]);

  
  return (
    <div className="flex items-center justify-center h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
        <SpinnersPrimary />
        </div>
      ) : message ==="No se encontraron donaciones en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full">
          {news.map(({ name, email, amount, user, date, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center"
              >

                  <div className="flex">
                    <div>
                      <h6 className="text-tertiary text-base font-semibold">
                        {name}
                      </h6>
                      <p>{email}</p>
                      <p>{date}</p>
                    </div>
                  </div>
                  <div>
                    <p>{amount}</p>
                  </div>
              </li>
              <hr />
              
            </>
          ))}
          <div className="flex items-center justify-center flex-row w-full mt-8">
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page > 1) && setPage(page - 1)} className="w-full h-full font-medium text-xl">{"<"}</button>
              </div>
                <p className=" font-base text-lg mx-4">{page}/{totalPages}</p>
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page <= totalPages) && setPage(page + 1)} className="w-full h-full font-medium text-xl">{">"}</button>
              </div> 
          </div>
        </ul>
      )}
      
    </div>
  );
};

export default DonationsComponent;
