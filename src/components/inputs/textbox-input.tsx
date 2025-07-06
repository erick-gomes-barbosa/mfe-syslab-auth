import { useForm } from "react-hook-form";

interface InputTextProps {
  name: string;
  register: ReturnType<typeof useForm>["register"];
  required: boolean;
  type: "text" | "email" | "password" | "number";
  valueAsNumber?: boolean;
}

// Componente de entrada de texto para os formulários de cadastro
export default function TextboxInput({
  name,
  register,
  required,
  type,
  valueAsNumber = false,
}: InputTextProps) {
  return (
    <input
      type={type}
      className={`rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm bg-white select-none`}
      {...register(name, {
        required: required,
        valueAsNumber: valueAsNumber,
      })}
    />
  );
}
