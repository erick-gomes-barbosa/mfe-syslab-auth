import iconError from "../../assets/images/icon-error.svg";

export default function LoginErrorModal({
  isOpen,
  onClickClose,
}: {
  isOpen: boolean;
  onClickClose: () => void;
}) {
  if (isOpen) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-center items-center bg-white gap-2 md:px-10 py-6 rounded-[2rem] shadow-lg shadow-[#00000040] animate-fade-up animate-duration-[500ms] animate-delay-200 animate-ease-out">
          <div className="flex justify-center items-center gap-2">
            <img src={iconError} alt="icon-error" />
            <p className="text-lg whitespace-nowrap">Erro no login!</p>
          </div>
          <div className="flex justify-center w-72 text-center ">
            <p>
              O e-mail ou a senha inserida não são válidos.
              <br /> Verifique-os e tente novamente.
            </p>
          </div>
          <button
            className="bg-blueMedium px-12 py-2 rounded-full text-white"
            onClick={onClickClose}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return null;
}
