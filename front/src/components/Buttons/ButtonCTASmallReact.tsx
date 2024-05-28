
import React from 'react';

interface ButtonWarningSmallProps {
        idEvent: string;
        title: string;
        color?: string;
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

      }
      
const ButtonCTASmallReact: React.FC<ButtonWarningSmallProps> = ({ title, idEvent, onClick, color }):React.ReactElement => (
    <button id={idEvent} onClick={onClick} className={`bg-tertiary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap ${color ? `text-${color}` : 'textTertiary'}`}>
        {title}
    </button>
);

export default ButtonCTASmallReact;