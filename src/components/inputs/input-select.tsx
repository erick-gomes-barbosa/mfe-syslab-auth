import { useForm } from "react-hook-form";

// Componente de seleção para os formulários de cadastro
interface InputSelectProps {
  options: { name: string; key: number }[];
  name: string;
  required: boolean;
  register: ReturnType<typeof useForm>["register"];
}

export default function InputSelect({
  options,
  name,
  required,
  register,
}: InputSelectProps) {
  return (
    <select
      {...register(name, { required })}
      className="rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm  bg-white select-none"
    >
      {options.map((option) => (
        <option key={option.key} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
