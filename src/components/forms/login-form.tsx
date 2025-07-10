import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login-schema";
import { LoginType } from "../../types/login-type";

//Formulário de login
export default function LoginForm({
  onClickRegisterButton,
}: {
  onClickRegisterButton: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<LoginType>({
    shouldFocusError: false,
    resolver: zodResolver(LoginSchema),
  });

  //Função para tratar o envio do formulário
  const submitForm: SubmitHandler<LoginType> = (data): void => {
    //Adicionar lógica para fazer o login
    // console.log("Dados do login:", data);
    reset();
  };

  //Função para tratar erros de validação
  const onError = (errors: FieldErrors<LoginType>) => {
    //Adicionar lógica para tratar erros de validação
    console.error("Erros de validação:", errors);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm, onError)}
      className="flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden animate-fade-right "
    >
      <div className="flex w-full font-bold mb-4 ">
        <button
          type="button"
          onClick={onClickRegisterButton}
          className={`h-11 w-1/2 text-[#333333]`}
        >
          Cadastro
        </button>
        <button
          type="button"
          className={`h-11 w-1/2 text-[#333333] bg-[#F0F4F8] rounded-bl-lg cursor-default`}
        >
          Login
        </button>
      </div>
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
      <div className="flex justify-center">
        <InputSubmit text="Login" />
      </div>
    </form>
  );
}
