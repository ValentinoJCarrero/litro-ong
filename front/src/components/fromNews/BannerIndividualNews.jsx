function BannerIndividualNews({titulo,fecha,banner}) {
  return (
    <div className="relative my-3 flex justify-end">
      <div className="absolute inset-0 z-10" style={{ backgroundImage: `linear-gradient(to right, white 35%, transparent 100%)` }}></div>
      <div className="absolute inset-0 top-24 left-36 w-2/5 z-20"> {/* Aumentar el z-index */}
        <div>
          <h1 className="text-5xl font-bold mb-3 leading-tight">{titulo}</h1>
          <h2 className="text-textTertiary text-xl font-normal tracking-widest">{fecha}</h2>
        </div>
      </div>
      <img src={banner} alt="La imagen" className="object-none bg-cover bg-center h-96 w-1/2 grayscale" loading="lazy" decoding="async"/>
    </div>
  );
}

export default BannerIndividualNews;