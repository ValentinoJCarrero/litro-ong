const InputNewslatter:React.FC = ():React.ReactElement=>{
    return(
        <div  className="h-16 w-[30rem] text-lg">
            <input type="text" className="h-full w-2/3 rounded-l-3xl border border-textTertiary text-textTertiary font-medium placeholder:font-light placeholder:text-textParagraph p-5 focus-visible:outline " placeholder="Escribe tu mail"/>
            <button className="bg-textTertiary text-textPrimary h-full w-1/3 rounded-r-3xl hover:text-xl">Subscribir</button>
        </div>
    )
}
export default InputNewslatter