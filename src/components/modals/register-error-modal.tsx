import iconError from "../../assets/images/icon-error.svg";
type ErrorModalProps = {
  isOpen: boolean;
  fields: {
    registery: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
    entry_time: boolean;
    departure_time: boolean;
  };
};
export default function RegisterErrorModal({
  isOpen,
  fields = {
    registery: false,
    name: false,
    email: false,
    password: false,
    entry_time: false,
    departure_time: false,
  },
}: ErrorModalProps) {
  const invalidFields = [
    ...(fields.registery ? ["Matrícula"] : []),
    ...(fields.name ? ["Nome"] : []),
    ...(fields.email ? ["E-mail"] : []),
    ...(fields.password ? ["Senha"] : []),
    ...(fields.entry_time ? ["Horário de Entrada"] : []),
    ...(fields.departure_time ? ["Horário de Saída"] : []),
  ];
  if (isOpen) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-center items-center bg-white gap-2 px-10 py-6 rounded-[2rem] shadow-lg shadow-[#00000040] animate-fade-up animate-duration-[500ms] animate-delay-200 animate-ease-out">
          <div className="flex justify-center items-center gap-2">
            <img src={iconError} alt="icon-error" />
            <p className="text-lg whitespace-nowrap">Erro no cadastro!</p>
          </div>
          <div className="flex justify-center w-72 break-words ">
            <p>
              Verifique os campos:{" "}
              {invalidFields.map((field, index) => (
                <span className="font-bold" key={field}>
                  {field}
                  {index < invalidFields.length - 2 ? ", " : ""}
                  {index === invalidFields.length - 2 ? " e " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
