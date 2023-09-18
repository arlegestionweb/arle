import RedDot from "./RedDot";

const Button = ({children, active, className = ""}:
  {
    children: React.ReactNode;
    active?: boolean;
    className?: string;
  }) => {
  return (
    <button className={`px-3 py-1.5 border border-black relative ${className}`}>
      {children}
      {active && (
        <RedDot />
      )}
    </button>
  );
}

export default Button;