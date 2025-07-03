//Tela para cadastro e login de usuários

import { useState } from "react";
import logoHorizontal from "./assets/images/logo-horizontal.png";
import imgLaboratory from "./assets/images/img-laboratory.svg";
import RegisterUserForm from "./components/forms/register-user-form";
import LoginForm from "./components/forms/login-form";

//Dados do tipo de usuário
const optionsOcupation: { name: string; id: number }[] = [
  { name: "Técnico", id: 1 },
  { name: "Professor", id: 2 },
  { name: "Aluno", id: 3 },
];

export default function AuthPage() {
  const [isloginComponent, setIsLoginComponent] = useState<boolean>(false);

  const changeComponent = (): void => {
    if (isloginComponent == true) {
      setIsLoginComponent(false);
    } else {
      setIsLoginComponent(true);
    }
  };

  return (
    <>
      <div className="p-5">
        <img src={logoHorizontal} alt="logo-horizontal" />
      </div>
      <div className="flex justify-center w-full h-[calc(100vh-5rem)] ">
        <div className="flex justify-between max-w-[1500px] w-10/12 ">
          {isloginComponent ? (
            <LoginForm onClickRegisterButton={changeComponent} />
          ) : (
            <RegisterUserForm onClickLoginButton={changeComponent} />
          )}
          <img
            src={imgLaboratory}
            alt="img-laboratory"
            className="max-lg:hidden min-w-[500px] w-7/12 max-w-[600px] select-none"
          />
        </div>
      </div>
    </>
  );
}
