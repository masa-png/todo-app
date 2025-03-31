interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  type = "button",
  disabled = false,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-[#5299b5] text-white py-2 px-4 text-sm rounded hover:bg-[#4588a3] focus:outline-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
