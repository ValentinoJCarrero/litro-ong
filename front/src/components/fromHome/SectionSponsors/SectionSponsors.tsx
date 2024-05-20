
import CardSponsor from "../../Cards/CardSponsor";
import { getCollection } from "astro:content";
import { getSponsors } from '../../../helpers/Sponsors/getSponsors';
import { useEffect, useState } from "react";
import SpinnersPrimary from "../../Spinners/SpinnersPrimary";
const sponsorsList = await getCollection("sponsors");

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
          const newsData = await getSponsors();
          setSponsors(newsData);
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
                <p className="text-textTertiary w-full text-center text-3xl">No hay esponsors disponibles por ahora.</p>
            ) : (
      sponsors.map(({ logo, name, email, id }) => (
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