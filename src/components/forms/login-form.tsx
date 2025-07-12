import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler, FieldErrors, set } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login-schema";
import { LoginType } from "../../types/login-type";
import { nhost } from "../../api/nhost";
import LoginSucessModal from "../modals/login-sucess-modal";
import { useState } from "react";
import LoginErrorModal from "../modals/login-error-modal";

//Formulário de login
export default function LoginForm({
  onClickRegisterButton,
}: {
  onClickRegisterButton: () => void;
}) {
  const { register, handleSubmit, reset, clearErrors } = useForm<LoginType>({
    shouldFocusError: false,
    resolver: zodResolver(LoginSchema),
  });
  const [showLoginSucessModal, setShowLoginSucessModal] =
    useState<boolean>(false);
  const [showLoginErrorModal, setShowLoginErrorModal] =
    useState<boolean>(false);

  //Função para tratar o envio do formulário
  const submitForm: SubmitHandler<LoginType> = async (data): Promise<void> => {
    try {
      const { email, password } = data;
      await nhost.auth.signOut(); // Limpa a sessão atual, se houver
      const response = await nhost.auth.signIn({
        email,
        password,
      });

      if (response.session.accessToken) {
        setShowLoginSucessModal(true);
        setTimeout(() => {
          setShowLoginSucessModal(false);
          //direcionar para home do usuário comum ou admin
          return null;
        }, 2500);

        if (response.session == null) {
          setShowLoginErrorModal(true);
        }
      }
    } catch (error) {
      setShowLoginErrorModal(true);
    }

    reset();
  };

  //Função para tratar erros de validação
  const onError = (errors: FieldErrors<LoginType>) => {
    setShowLoginErrorModal(true);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm, onError)}
      className=" relative flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden "
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
          className={`h-11 w-1/2 text-[#333333] bg-[#F0F4F8] rounded-bl-lg`}
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
      <LoginSucessModal isOpen={showLoginSucessModal} />
      <LoginErrorModal
        isOpen={showLoginErrorModal}
        onClickClose={() => {
          setShowLoginErrorModal(false);
          clearErrors();
        }}
      />
    </form>
  );
}
