import React from "react";

interface ButtonWarningSmallProps {
  idEvent: string;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonWarningSmall: React.FC<ButtonWarningSmallProps> = ({
  title,
  idEvent,
  onClick,
}): React.ReactElement => (
  <button
    id={idEvent}
    onClick={onClick}
    className="bg-warning text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none transition-all font-medium h-min w-min whitespace-nowrap"
  >
    {title}
  </button>
);

export default ButtonWarningSmall;
