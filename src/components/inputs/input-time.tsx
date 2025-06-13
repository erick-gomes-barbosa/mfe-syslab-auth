export default function InputTime({ register, name, required }) {
  return (
    <input
      className="rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm bg-white select-none "
      type="time"
      {...(register ? register(name, { required }) : {})}
    />
  );
}
