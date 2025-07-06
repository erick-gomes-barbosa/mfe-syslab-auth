//Botão para enviar os formulários de cadastro e login
export default function InputSubmit({ text }: { text?: string }) {
  return (
    <input
      className="py-2 bg-[#2C5B8C] w-9/12 rounded-[30px] font-bold  text-white cursor-pointer"
      type="submit"
      value={text ? text : "Cadastrar"}
    />
  );
}
