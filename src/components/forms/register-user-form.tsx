import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import InputSelect from "../inputs/input-select";
import InputTime from "../inputs/input-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schema/user-schema";
import { UserType } from "../../types/user-type";
import { useInsertUserFunction } from "../../repositories/user";

//Dados do tipo de usuário
const optionsOcupation: { name: string; key: number }[] = [
  { name: "Técnico", key: 1 },
  { name: "Professor", key: 2 },
  { name: "Aluno", key: 3 },
];

//Formulário de cadastro de usuário
export default function RegisterUserForm({ onClickLoginButton }) {
  const { register, handleSubmit, reset } = useForm<UserType>({
    shouldFocusError: false,
    resolver: zodResolver(UserSchema),
  });

  const { insert, error, loading } = useInsertUserFunction();
  //Função para tratar o envio do formulário
  const submitForm: SubmitHandler<UserType> = async (data): Promise<void> => {
    const result = insert(data);

    // if (!loading) console.log(result);
    // reset();
  };

  //Função para tratar erros de validação
  const onError = (errors: FieldErrors<UserType>) => {
    //Adicionar lógica para tratar erros de validação
    console.error("Erros de validação:", errors);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm, onError)}
      className="flex flex-col rounded-3xl bg-[#2C5B8C26] max-w-96 h-11/12 w-11/12 m-auto pb-7 overflow-hidden "
    >
      <div className="flex w-full font-bold mb-4 ">
        <button
          type="button"
          className={`h-11 w-1/2 text-[#333333] bg-[#F0F4F8] rounded-bl-lg `}
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
    </form>
  );
}
