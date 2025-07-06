import { useForm } from "react-hook-form";

interface InputTimeProps {
  register: ReturnType<typeof useForm>["register"];
  name: string;
  required: boolean;
}

// Componente de entrada de tempo para os formulários de cadastro
export default function InputTime({
  register,
  name,
  required,
}: InputTimeProps) {
  return (
    <input
      className="rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm bg-white select-none "
      type="time"
      {...register(name, { required })}
    />
  );
}
