import React from "react";

interface BannerIndividualEventProps {
  titulo: string;
  fecha?: string;
  banner: string;
  direccion: string;
  profesor?: string;
}

const BannerIndividualEvent: React.FC<BannerIndividualEventProps> = ({
  titulo,
  fecha,
  banner,
  direccion,
  profesor,
}) => {
  return (
    <div className="relative flex justify-end">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to right, white 35%, transparent 100%)`,
        }}
      ></div>
      <div className="relative inset-0 h-full top-16 left-36 w-2/5 z-20 ">
        <div className="flex  flex-col">
          <h1 className="text-5xl font-bold mb-3 leading-tight">{titulo}</h1>
          <h2 className="text-textTertiary text-xl font-normal tracking-widest">
            {fecha}
          </h2>
          {profesor && (
            <h2 className="text-textTertiary text-xl font-normal tracking-widest">
              Dictado por {profesor}
            </h2>
          )}
          {direccion && (
            <h2 className="text-textTertiary text-xl font-normal tracking-widest">
              {direccion}
            </h2>
          )}
        </div>
      </div>
      <img
        src={banner}
        alt="La imagen"
        className="object-none bg-cover bg-center object-right my-2  h-96 w-2/3   "
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default BannerIndividualEvent;
