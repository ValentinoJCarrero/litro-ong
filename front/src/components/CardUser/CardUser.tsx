import React from "react";
import logoIcon from "../../assets/Logo.svg";
const CreditCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col   w-80 h-44 bg-gradient-to-br from-blue-500 to-blue-200 rounded-lg  p-5 font-sans  gap-4  transform transition-transform duration-700 hover:scale-110 cursor-pointer">
        <div className=" flex flex-col  ">
          <div className="flex  justify-end h-10  ">
            <img src={logoIcon.src} alt="logo" className=" w-20 object-fit " />
          </div>
<div className="flex flex-col gap-2">

            <span className="text-xs tracking-wider font-medium text-white">
              Tarjeta
            </span>
          
            <div className="flex flex-col gap-0.5  ">
              <span className="text-xl font-bold leading-none tracking-wider text-white">
                COMUNIDAD
              </span>
              <span className="text-xl tracking-wider leading-none font-bold text-white">
                EL LITRO
              </span>
            </div>
         

          <div className="w-full flex gap-2 h-6 mt-1 ">
            <span className="flex flex-col w-3/5 text-xs font-medium tracking-wider text-white">
              FLORES, Simón Gerardo
            </span>
          </div>

          </div>
          {/* <div className="flex flex-col w-1/3">
                        <label className="text-xs tracking-wider text-gray-300" htmlFor="expiry">VALID THRU</label>
                        <input className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-6 tracking-wider placeholder-gray-300" id="expiry" placeholder="MM/YY" type="text" />
                    </div> */}

          {/* <div className="flex flex-col w-1/6">
                        <label className="text-xs tracking-wider text-gray-300" htmlFor="cvv">CVV</label>
                        <input
                            className="bg-transparent border-none outline-none text-white caret-red-500 text-sm h-6 tracking-wider placeholder-gray-300"
                            placeholder="***"
                            id="cvv"
                            type="password"
                        />
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
