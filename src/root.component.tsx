import { useState } from "react";
import SyslabLogo from "./assets/images/logo-redimensionada.png";
import TextboxInput from "./components/inputs/textbox-input";
import { useForm, SubmitHandler } from "react-hook-form";
import LabelForm from "./components/labels/label-form";
import InputSubmit from "./components/inputs/input-submit";
import InputSelect from "./components/inputs/input-select";
import InputTime from "./components/inputs/input-time";
import LaboratoryImg from "./assets/images/img-laboratory.svg";

//Dados do tipo de usuário
const optionsOcupation = [
  { name: "Técnico", id: 1 },
  { name: "Professor", id: 2 },
  { name: "Aluno", id: 3 },
];

export default function AuthPage() {
  const [isloginComponent, setIsLoginComponent] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    shouldFocusError: false,
  });
  const setSelectButtonColor = () => {
    if (isloginComponent == true) {
      setIsLoginComponent(false);
    } else {
      setIsLoginComponent(true);
    }

    reset();
  };

  const submitForm = (data) => {
    // console.log(data);
  };
  return (
    <>
      <div className="p-5">
        <img src={SyslabLogo} alt="Logo da Syslab" />
      </div>
      <div className="flex justify-center w-full h-[calc(100vh-5rem)]">
        <div className="flex justify-between max-w-[1500px] w-10/12">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden "
          >
            <div className="flex w-full font-bold mb-4 ">
              <button
                onClick={setSelectButtonColor}
                className={`h-11 w-1/2 text-[#333333] ${
                  isloginComponent && "bg-[#F0F4F8] rounded-br-lg"
                }`}
              >
                Cadastro
              </button>
              <button
                onClick={setSelectButtonColor}
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
                      defaultValue={null}
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
            src={LaboratoryImg}
            alt="Imagem ilustrativa"
            className="max-lg:hidden min-w-[500px] w-7/12 max-w-[600px] select-none"
          />
        </div>
      </div>
    </>
  );
}
