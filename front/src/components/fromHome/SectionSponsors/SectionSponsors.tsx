import CardSponsor from "../../Cards/CardSponsor";
import { getSponsors } from '../../../helpers/Sponsors/getSponsors';
import { useEffect, useState } from "react";
import SpinnersPrimary from "../../Spinners/SpinnersPrimary";
import NotFound from "../../NotFound/NotFound";

interface SponsorsItem {
  logo: string;
  name: string;
  email: string;
  id: number;
}
const SectionSponsors: React.FC = ():React.ReactElement =>{
  const [sponsors, setSponsors] = useState<SponsorsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchNews = async () => {
          const newsData = await getSponsors(5, 1);
          setSponsors(newsData.data);
          setIsLoading(false);
      };
      fetchNews();
  }, []);

return(
<div>
  <h3 className=" m-10  text-textTertiary text-2xl font-semibold tracking-widest">NUESTROS SPONSORS</h3>
  <div className="gap-5 h-48 flex flex-row items-center justify-center my-20">
    {isLoading ? (
        <SpinnersPrimary />
      ) :!sponsors.length ? (
                <NotFound/>
            ) : (
      sponsors.map(({ logo, name }) => (
        <CardSponsor>
          <img
            src={logo}
            alt={name}
            className="rounded-xl"
          />
        </CardSponsor>
      ))
    )}
  </div>
</div>
)
}
export default SectionSponsors