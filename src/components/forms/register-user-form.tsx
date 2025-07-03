import TextboxInput from "../inputs/textbox-input";
import { useForm, SubmitHandler } from "react-hook-form";
import LabelForm from "../labels/label-form";
import InputSubmit from "../inputs/input-submit";
import InputSelect from "../inputs/input-select";
import InputTime from "../inputs/input-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schema/user-schema";
import { UserType } from "../../types/user-type";

//Dados do tipo de usuário
const optionsOcupation: { name: string; id: number }[] = [
  { name: "Técnico", id: 1 },
  { name: "Professor", id: 2 },
  { name: "Aluno", id: 3 },
];

export default function RegisterUserForm({ onClickLoginButton }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    shouldFocusError: false,
    resolver: zodResolver(UserSchema),
  });

  const submitForm = (data): void => {
    // console.log(data);
    reset();
  };

  const onError = (errors: any) => {
    // console.log("Erros de validação:", errors);
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
