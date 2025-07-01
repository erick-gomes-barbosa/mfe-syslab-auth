//Tela para cadastro e login de usuários

import { useState } from "react";
import logoHorizontal from "./assets/images/logo-horizontal.png";
import TextboxInput from "./components/inputs/textbox-input";
import { useForm, SubmitHandler } from "react-hook-form";
import LabelForm from "./components/labels/label-form";
import InputSubmit from "./components/inputs/input-submit";
import InputSelect from "./components/inputs/input-select";
import InputTime from "./components/inputs/input-time";
import imgLaboratory from "./assets/images/img-laboratory.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "./schema/register-user-schema";
import { RegisterUserType } from "./types/register-user-type";

//Dados do tipo de usuário
const optionsOcupation: { name: string; id: number }[] = [
  { name: "Técnico", id: 1 },
  { name: "Professor", id: 2 },
  { name: "Aluno", id: 3 },
];

export default function AuthPage() {
  const [isloginComponent, setIsLoginComponent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserType>({
    shouldFocusError: false,
    resolver: zodResolver(registerUserSchema),
  });

  const changeComponent = (): void => {
    if (isloginComponent == true) {
      setIsLoginComponent(false);
    } else {
      setIsLoginComponent(true);
    }

    reset();
  };

  const submitForm = (data): void => {
    // console.log("clicou");
    // console.log(data);
    // reset();
  };

  const onError = (errors: any) => {
    // console.log("Erros de validação:", errors);
  };
  return (
    <>
      <div className="p-5">
        <img src={logoHorizontal} alt="logo-horizontal" />
      </div>
      <div className="flex justify-center w-full h-[calc(100vh-5rem)]">
        <div className="flex justify-between max-w-[1500px] w-10/12">
          <form
            onSubmit={handleSubmit(submitForm, onError)}
            className="flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden "
          >
            <div className="flex w-full font-bold mb-4 ">
              <button
                type="button"
                onClick={changeComponent}
                className={`h-11 w-1/2 text-[#333333] ${
                  isloginComponent && "bg-[#F0F4F8] rounded-br-lg"
                }`}
              >
                Cadastro
              </button>
              <button
                type="button"
                onClick={changeComponent}
                className={`h-11 w-1/2 text-[#333333] ${
                  isloginComponent ? "" : "bg-[#F0F4F8] rounded-bl-lg"
                }`}
              >
                Login
              </button>
            </div>

            {/* Renderiza um componente com base se está no formulário de login ou não */}
            {isloginComponent ? (
              <>
                <div className="w-10/12 m-auto mb-4">
                  <LabelForm title="E-mail:" />
                  <TextboxInput
                    name="email"
                    required={true}
                    type="email"
                    register={register}
                  />
                </div>
                <div className="w-10/12 m-auto mb-4">
                  <LabelForm title="Senha:" />
                  <TextboxInput
                    name="password"
                    required={true}
                    type="password"
                    register={register}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-10/12 m-auto mb-4 gap-4">
                  <div>
                    <LabelForm title="Matrícula:" />
                    <TextboxInput
                      name="registery"
                      required={true}
                      valueAsNumber={true}
                      type="text"
                      register={register}
                    />
                  </div>
                  <div>
                    <LabelForm title="Nome Completo:" />
                    <TextboxInput
                      name="name"
                      required={true}
                      type="text"
                      register={register}
                    />
                  </div>
                  <div>
                    <LabelForm title="E-mail:" />
                    <TextboxInput
                      name="email"
                      required={true}
                      type="text"
                      register={register}
                    />
                  </div>
                  <div>
                    <LabelForm title="Senha:" />
                    <TextboxInput
                      name="password"
                      required={true}
                      type="password"
                      register={register}
                    />
                  </div>

                  <div>
                    <LabelForm title="Ocupação:" />
                    <InputSelect
                      name="type"
                      options={optionsOcupation}
                      required={true}
                      register={register}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-[47.5%]">
                      <LabelForm title="Horário de Entrada:" />
                      <InputTime
                        name="entry_time"
                        required={true}
                        register={register}
                      />
                    </div>
                    <div className="w-[47.5%]">
                      <LabelForm title="Horário de Saida:" />
                      <InputTime
                        name="departure_time"
                        required={true}
                        register={register}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center">
              <InputSubmit text={isloginComponent && "Login"} />
            </div>
          </form>
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
