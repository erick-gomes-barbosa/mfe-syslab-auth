import iconSucess from "../../assets/images/icon-sucess.svg";
export default function RegisterSucessModal({
  text,
  isOpen,
}: {
  text: string;
  isOpen: boolean;
}) {
  if (isOpen) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center items-center px-12 py-12 bg-white gap-2 rounded-[2rem] shadow-lg shadow-[#00000040] animate-fade-up animate-duration-[500ms] animate-delay-200 animate-ease-out">
          <img src={iconSucess} alt="icon-sucess" />
          <p className="whitespace-nowrap text-lg">{text}</p>
        </div>
      </div>
    );
  }

  return null;
}
