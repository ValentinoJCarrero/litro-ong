interface CardProps {
  children: React.ReactNode;
}
const SectionSponsors: React.FC<CardProps> = ({children}):React.ReactElement =>(
<div
  className="md:h-48 w-24 p-2 h-24 md:w-48 shadow-4xl rounded-3xl  items-center justify-center content-center transition-all"
>
  {children}
</div>
)
export default SectionSponsors