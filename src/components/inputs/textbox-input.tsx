export default function TextboxInput({ name, register, required, type }) {
  return (
    <input
      type={type}
      className={`rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm bg-white select-none`}
      {...(register ? register(name, { required }) : {})}
    />
  );
}
