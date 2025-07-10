import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import InputSelect from "../inputs/input-select";
import InputTime from "../inputs/input-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schema/user-schema";
import { UserType } from "../../types/user-type";
import { InsertUserFunction } from "../../repositories/user";
import { useState } from "react";
import RegisterSucessModal from "../modals/register-sucess-modal";
import RegisterErrorModal from "../modals/register-error-modal";

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

//Formulário de cadastro de usuário
export default function RegisterUserForm({ onClickLoginButton }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fieldsFormErrors, setFieldsFormErrors] = useState<FieldsFormErrors>({
    registery: false,
    name: false,
    email: false,
    password: false,
    entry_time: false,
    departure_time: false,
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    shouldFocusError: false,
    resolver: zodResolver(UserSchema),
  });

  const { insert } = InsertUserFunction();

  //Função para tratar o envio do formulário
  const submitForm: SubmitHandler<UserType> = async (data): Promise<void> => {
    try {
      const result = await insert(data);

      if (!result?.email) {
        //colocar log de erro
        // console.log("Usuário cadastrado com sucesso:", result);
        return null;
      }
      //exibe modal de sucesso por 2 segundos
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
    if (errors.name) setFieldsFormErrors((prev) => ({ ...prev, name: true }));
    if (errors.email) setFieldsFormErrors((prev) => ({ ...prev, email: true }));
    if (errors.password)
      setFieldsFormErrors((prev) => ({ ...prev, password: true }));
    if (errors.entry_time)
      setFieldsFormErrors((prev) => ({ ...prev, entry_time: true }));
    if (errors.departure_time)
      setFieldsFormErrors((prev) => ({ ...prev, departure_time: true }));

    setShowErrorModal(true);
    setTimeout(() => {
      setShowErrorModal(false);
    }, 2500);

    console.error("Erros de validação:", errors);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm, onError)}
      className="relative flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden animate-fade-left "
    >
      <div className="flex w-full font-bold mb-4 ">
        <button
          type="button"
          className={`h-11 w-1/2 text-[#333333] bg-[#F0F4F8] rounded-br-lg cursor-default `}
        >
          Cadastro
        </button>
        <button
          type="button"
          onClick={onClickLoginButton}
          className={`h-11 w-1/2 text-[#333333] `}
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

      <RegisterErrorModal isOpen={showErrorModal} fields={fieldsFormErrors} />
      <RegisterSucessModal
        text="Usuário cadastrado com sucesso!"
        isOpen={showSuccessModal}
      />
    </form>
  );
}
