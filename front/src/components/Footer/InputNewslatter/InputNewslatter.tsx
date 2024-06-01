const InputNewslatter: React.FC = (): React.ReactElement => {
  return (
    <div className="h-14  text-lg flex flex-row justify-start  ">
      <input
        type="text"
        className="h-12 md:w-96 rounded-l-3xl w-1/2 border border-textTertiary text-textTertiary font-medium placeholder:font-light placeholder:text-textParagraph p-5 focus-visible:outline "
        placeholder="Escribe tu mail"
      />
      <button className="bg-textTertiary w-1/2 text-textPrimary h-12 md:w-1/3 rounded-r-3xl hover:text-xl transition-all">
        Subscribir
      </button>
    </div>
  );
};
export default InputNewslatter;
