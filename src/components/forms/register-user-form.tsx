import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import InputSelect from "../inputs/input-select";
import InputTime from "../inputs/input-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schema/user-schema";
import { UserType } from "../../types/user-type";
import { UpdateRegisterUserFunction } from "../../repositories/user";
import { useState } from "react";
import RegisterSucessModal from "../modals/register-sucess-modal";
import RegisterFormErrorModal from "../modals/register-form-error-modal";
import RegisterErrorModal from "../modals/register-error-modal";
import { nhost } from "../../api/nhost";

//Dados do tipo de usuário
const optionsOcupation: { name: string; key: number }[] = [
  { name: "Técnico", key: 1 },
  { name: "Professor", key: 2 },
  { name: "Aluno", key: 3 },
];

interface FieldsFormErrors {
  registery: boolean;
  name: boolean;
  email: boolean;
  password: boolean;
  entry_time: boolean;
  departure_time: boolean;
}

//Estado inicial dos erros
const initialErrorsForm = {
  registery: false,
  name: false,
  email: false,
  password: false,
  entry_time: false,
  departure_time: false,
};

//Formulário de cadastro de usuário
export default function RegisterUserForm({ onClickLoginButton }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFormErrorModal, setShowFormErrorModal] = useState(false);
  const [showRegisterErrorModal, setShowRegisterErrorModal] = useState(false);
  const [fieldsFormErrors, setFieldsFormErrors] =
    useState<FieldsFormErrors>(initialErrorsForm);
  const { register, handleSubmit, reset, clearErrors } = useForm<UserType>({
    shouldFocusError: false,
    resolver: zodResolver(UserSchema),
  });

  const { updateUserRegister, error: updateUserRegisterError } =
    UpdateRegisterUserFunction();

  //Função para tratar o envio do formulário
  const submitForm: SubmitHandler<UserType> = async (data): Promise<void> => {
    try {
      const {
        email,
        password,
        registery,
        username,
        usertype,
        entry_time,
        departure_time,
      } = data;

      //limpa a sessão caso exista alguma
      await nhost.auth.signOut();
      const { session, error } = await nhost.auth.signUp({
        email,
        password,
      });

      const userId = session?.user.id;

      const response = await updateUserRegister({
        userId,
        registery,
        username,
        usertype,
        entry_time,
        departure_time,
      });

      //Tratativas de erro do singup e do response
      if (error || !response.id) {
        setShowRegisterErrorModal(true);
        setTimeout(() => {
          setShowRegisterErrorModal(false);
        }, 2500);
        return null;
      }

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        reset();
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  //Função para tratar erros de validação
  const onError = (errors: FieldErrors<UserType>) => {
    if (errors.registery)
      setFieldsFormErrors((prev) => ({ ...prev, registery: true }));
    if (errors.username)
      setFieldsFormErrors((prev) => ({ ...prev, name: true }));
    if (errors.email) setFieldsFormErrors((prev) => ({ ...prev, email: true }));
    if (errors.password)
      setFieldsFormErrors((prev) => ({ ...prev, password: true }));
    if (errors.entry_time)
      setFieldsFormErrors((prev) => ({ ...prev, entry_time: true }));
    if (errors.departure_time)
      setFieldsFormErrors((prev) => ({ ...prev, departure_time: true }));

    setShowFormErrorModal(true);
    setTimeout(() => {
      setShowFormErrorModal(false);
    }, 2500);

    console.error("Erros de validação:", errors);
    setTimeout(() => {
      clearErrors();
      setFieldsFormErrors(initialErrorsForm);
    }, 2500);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm, onError)}
      className="relative flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden animate-fade-left "
    >
      <div className="flex w-full font-bold mb-4 ">
        <button
          type="button"
          className={`h-11 w-1/2 text-[#333333] cursor-default `}
        >
          Cadastro
        </button>
        <button
          type="button"
          onClick={onClickLoginButton}
          className={`h-11 w-1/2 text-[#333333] bg-[#F0F4F8] rounded-bl-lg `}
        >
          Login
        </button>
      </div>
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
            name="username"
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
            name="usertype"
            options={optionsOcupation}
            required={true}
            register={register}
          />
        </div>
        <div className="flex justify-between">
          <div className="w-[47.5%]">
            <LabelForm title="Horário de Entrada:" />
            <InputTime name="entry_time" required={true} register={register} />
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
      <div className="flex justify-center">
        <InputSubmit />
      </div>

      <RegisterFormErrorModal
        isOpen={showFormErrorModal}
        fields={fieldsFormErrors}
      />
      <RegisterSucessModal
        text="Usuário cadastrado com sucesso!"
        isOpen={showSuccessModal}
      />
      <RegisterErrorModal
        isOpen={showRegisterErrorModal}
        text="Erro ao se cadastrar"
      />
    </form>
  );
}
