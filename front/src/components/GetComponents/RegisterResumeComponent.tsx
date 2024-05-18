import { useEffect, useState } from 'react';
import { postRegister } from '../../helpers/Auth/postRegister';

interface UserInfo {
    fullName: string;
    dni: string;
    brithDate: string;
    phone: string;
    fullAdress: string;
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
        // Simular la obtención de datos del localStorage
        const registerUserProfile = localStorage.getItem('registerUserProfile');
        const userInfo = registerUserProfile ? JSON.parse(registerUserProfile) : null;
        const registerUser = localStorage.getItem('registerUser');
        const user = registerUser ? JSON.parse(registerUser) : null;
        setUserInfo(userInfo);
        setUser(user);
    }, []);
    const handleSubmit = () => {
        if (user && userInfo) {
            const data = {...user,...userInfo

            };
            console.log(data);
            postRegister(data);
            localStorage.clear();
            window.location.href = '/auth/login';
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };
    return (
        <div className="2-m h-full w-full px-14 py-10 flex flex-col">
            {user && (
                <div>
                    <div>
                        <h1>Email</h1>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h1>Contraseña</h1>
                        <div className='flex flex-row'>
                            <p>{showPassword ? user.password : '********'}</p>
                            <button onClick={handleTogglePasswordVisibility}>
                                {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {userInfo  && (
                <div>
                    <div>
                        <h1>Nombre</h1>
                        <p>{userInfo.fullName}</p>
                    </div>
                    <div>
                        <h1>Numero de documento</h1>
                        <p>{userInfo.dni}</p>
                    </div>
                    <div>
                        <h1>Fecha de nacimiento</h1>
                        <p>{userInfo.brithDate}</p>
                    </div>
                    <div>
                        <h1>Numero de telefono</h1>
                        <p>{userInfo.phone}</p>
                    </div>
                    <div>
                        <h1>Domicilio</h1>
                        <p>{userInfo.fullAdress}</p>
                    </div>
                </div>
                
            )}
            <button 
            type="submit" 
            className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"
            onClick={handleSubmit}
            >Siguiente
            </button>
        </div>

    );
};

export default RegisterResumeComponent;