export default function InputSubmit({ text }) {
  return (
    <input
      className="py-2 bg-[#2C5B8C] w-9/12 rounded-[30px] font-semibold text-base text-white cursor-pointer"
      type="submit"
      value={text ? text : "Cadastrar"}
    />
  );
}
