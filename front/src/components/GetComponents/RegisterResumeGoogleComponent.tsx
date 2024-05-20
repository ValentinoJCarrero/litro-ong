import { useEffect, useState } from 'react';
import { postGoogleRegister } from '../../helpers/Auth/postGoogleRegister';
import Cookies from 'js-cookie';
interface UserInfo {
    fullName: string;
    dni: string;
    birthDate: string;
    phone: string;
    fullAddress: string;
}
interface User {
    email: string;
}
const RegisterResumeGoogleComponent = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Simular la obtención de datos del localStorage
        const registerUserProfile = localStorage.getItem('registerUserProfile');
        const userInfo = registerUserProfile ? JSON.parse(registerUserProfile) : null;
        setUserInfo(userInfo);

        const registerUser = Cookies.get('emailUser');
    if (registerUser) {
      setUser({ email: registerUser });
    }
    }, []);
    const handleSubmit = () => {
        if (user && userInfo) {
            const data = {
                email: user.email,
                fullName: userInfo.fullName,
                dni: userInfo.dni,
                birthDate: userInfo.birthDate,
                phone: userInfo.phone,
                fullAddress: userInfo.fullAddress

            };

            
            console.log(data);
            postGoogleRegister(data);
            //localStorage.clear();
            //window.location.href = '/auth/login';
        }
    };

    return (
        <div className="2-m h-full w-full px-14 flex flex-col">
            {user && (
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className='font-medium my-2'>Email</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'> {user.email}</p>
                    </div>
                </div>
            )}
            {userInfo  && (
                <div>
                    <div>
                        <h1 className='font-medium my-2'>Nombre</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'>{userInfo.fullName}</p>
                    </div >
                    <div>
                        <h1 className='font-medium my-2'>Numero de documento</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'>{userInfo.dni}</p>
                    </div>
                    <div>
                        <h1 className='font-medium my-2'>Fecha de nacimiento</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'>{userInfo.birthDate}</p>
                    </div>
                    <div>
                        <h1 className='font-medium my-2'>Numero de telefono</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'>{userInfo.phone}</p>
                    </div>
                    <div >
                        <h1  className='font-medium my-2'>Domicilio</h1>
                        <p className='w-full rounded-md border-backgroundGrey border text-textParagraph px-3 py-2'>{userInfo.fullAddress}</p>
                    </div>
                </div>
                
            )}
            <div className="my-3 w-full flex justify-end">
            <a href="/auth/register/personalInformation" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
            </a>
            <button 
            type="submit" 
            className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"
            onClick={handleSubmit}
            >Siguiente
            </button>
            </div>
        </div>

    );
};

export default RegisterResumeGoogleComponent;