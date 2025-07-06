//Label que identifica o título de um campo de formulário
export default function LabelForm({ title }: { title: string }) {
  return (
    <label className="text-grayDark text-sm  max-sm320:text-[12px] select-none">
      {title}
    </label>
  );
}
