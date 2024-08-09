interface IInputProps {
  type: string;
  name: string;
  placeholder: string;
  errors?: string[];
}

export default function Input({
  type,
  name,
  placeholder,
  errors = [],
}: IInputProps) {
  return (
    <>
      <input
        className="w-full rounded-md p-3 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-400 transition-all"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
