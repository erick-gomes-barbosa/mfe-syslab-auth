export default function InputSelect({ options, name, required, register }) {
  return (
    <select
      {...(register ? register(name, { required }) : {})}
      className="rounded-[20px] px-3 h-7 w-full outline-[#2C5B8C] text-sm  bg-white select-none"
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
