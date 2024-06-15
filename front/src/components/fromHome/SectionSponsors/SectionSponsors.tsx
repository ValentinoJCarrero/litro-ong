import CardSponsor from "../../Cards/CardSponsor";
import { getSponsors } from "../../../helpers/Sponsors/getSponsors";
import { useEffect, useState } from "react";
import SpinnersPrimary from "../../Spinners/SpinnersPrimary";
import NotFound from "../../NotFound/NotFound";

interface SponsorsItem {
  logo: string;
  name: string;
  email: string;
  id: number;
}
const SectionSponsors: React.FC = (): React.ReactElement => {
  const [sponsors, setSponsors] = useState<SponsorsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getSponsors(4, page);
      setSponsors(newsData.data);
      setIsLoading(false);
      setTotalPages(Math.ceil(newsData.total / 4));
    };
    fetchNews();
  }, [page]);

  return (
    <div>
      <h3 className=" m-10  text-textTertiary text-2xl font-semibold tracking-widest">
        NUESTROS SPONSORS
      </h3>
      <div className="gap-5 h-48 flex flex-row items-center justify-center my-20 mx-2">
        <div className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            className="w-full h-full font-medium text-3xl"
          >
            {"<"}
          </button>
        </div>
        <div className="flex flex-row gap-5 flex-wrap justify-center">
          
        {isLoading ? (
          <SpinnersPrimary />
        ) : !sponsors.length ? (
          <NotFound />
        ) : (
          sponsors.map(({ logo, name }) => (
            <CardSponsor>
              <img src={logo} alt={name} className="rounded-xl" />
            </CardSponsor>
          ))
        )}
        
        </div>
        <div className="rounded-lg w-12 h-12 flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            className="w-full h-full font-medium text-3xl"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SectionSponsors;
