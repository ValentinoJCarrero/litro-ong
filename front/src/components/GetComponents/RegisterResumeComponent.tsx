import { useEffect, useState } from "react";
import { postRegister } from "../../helpers/Auth/postRegister";
import showPasswordIcon from "../../assets/showPassword.svg";
import Swal from "sweetalert2";
interface UserInfo {
  fullName: string;
  dni: string;
  birthDate: string;
  phone: string;
  fullAddress: string;
  isSubscribed: boolean;
}
interface User {
  email: string;
  password: string;
}
const RegisterResumeComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const registerUserProfile = localStorage.getItem("registerUserProfile");
    const userInfo = registerUserProfile
      ? JSON.parse(registerUserProfile)
      : null;
    const registerUser = localStorage.getItem("registerUser");
    const user = registerUser ? JSON.parse(registerUser) : null;
    setUserInfo(userInfo);
    setUser(user);
  }, []);
  const handleSubmit = () => {
    if (user && userInfo) {
      const data = {
        email: user.email,
        password: user.password,
        fullName: userInfo.fullName,
        dni: userInfo.dni,
        birthDate: userInfo.birthDate,
        phone: userInfo.phone,
        fullAddress: userInfo.fullAddress,
        isSubscribed: userInfo.isSubscribed,
      };

      postRegister(data)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Bienvenido ${data.fullName}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/auth/login2";
            localStorage.clear();
          }, 1500);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className=" h-full w-full px-14 flex flex-col gap-4">
      {user && (
        <div className="flex flex-col justify-between  gap-4">
          <div>
            <h1 className="font-medium ">Email</h1>
            <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
              {" "}
              {user.email}
            </p>
          </div>
          <div>
            <h1 className="font-medium ">Contraseña</h1>
            <div className="flex flex-row rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
              <p className="w-full ">
                {showPassword ? user.password : "********"}
              </p>
              <button onClick={handleTogglePasswordVisibility}>
                {showPassword ? (
                  <img src={showPasswordIcon.src} alt="warningIcon" />
                ) : (
                  <img src={showPasswordIcon.src} alt="warningIcon" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {userInfo && (
        <div className=" flex flex-row gap-4 flex-wrap">
          <div className="w-full">
            <h1 className="font-medium ">Nombre</h1>
            <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
              {userInfo.fullName}
            </p>
          </div>
          <div className="w-full  gap-4 flex flex-row justify-between">
            <div className="w-1/2">
              <h1 className="font-medium ">Numero de documento</h1>
              <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
                {userInfo.dni}
              </p>
            </div>
            <div className="w-1/2">
              <h1 className="font-medium ">Fecha de nacimiento</h1>
              <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
                {userInfo.birthDate}
              </p>
            </div>
          </div>
          <div className=" flex flex-row gap-4 justify-between w-full">
            <div className="w-1/2">
              <h1 className="font-medium ">Numero de telefono</h1>
              <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
                {userInfo.phone}
              </p>
            </div>
            <div className="w-1/2">
              <h1 className="font-medium ">Domicilio</h1>
              <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
                {userInfo.fullAddress}
              </p>
            </div>
            
          </div>
          <div className="w-1/2">
              <h1 className="font-medium ">Suscripcion a NewsLatter</h1>
              <p className="w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2">
                {userInfo.isSubscribed.toString()}
              </p>
            </div>
        </div>
      )}
      <div className=" w-full flex justify-end absolute bottom-14 right-20">
        <a
          href="/auth/register/personalInformation"
          className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6"
        >
          Anterior
        </a>
        <button
          type="submit"
          className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"
          onClick={handleSubmit}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default RegisterResumeComponent;
