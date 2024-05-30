interface CardProps {
  children: React.ReactNode;
}
const SectionSponsors: React.FC<CardProps> = ({children}):React.ReactElement =>(
<div
  className="h-48 p-2 w-48 shadow-4xl rounded-3xl items-center justify-center content-center transition-all"
>
  {children}
</div>
)
export default SectionSponsors