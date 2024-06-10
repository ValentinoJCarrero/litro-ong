import React, { useState } from 'react';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log('isOpen:', isOpen);
  };

  return (
    <div className="relative">
      <button className="p-2 bg-gray-800 text-white absolute bottom-0 right-0 mb-12 mr-2" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="absolute bottom-0 right-0 mb-20 mr-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <ul className="flex flex-col-reverse">
            <li>
              <a href="/contacto" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                Contacto
              </a>
            </li>
            <li>
              <a href="/nosotros" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                Nosotros
              </a>
            </li>
            <li>
              <a href="/servicios" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                Servicios
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="/Donar" className="block px-4 py-2 text-yellow-500 hover:bg-gray-700 transition-colors">
                Dona
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
