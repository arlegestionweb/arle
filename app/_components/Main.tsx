import { cn } from "../_lib/utils";

const Main = ({ children, extraClasses }: {
  children: React.ReactNode;
  extraClasses?: string;
}) => {
  return (
    <main className={cn(`relative z-10 lg:mb-[100vh] pt-[70px] md:pt-0`, extraClasses)}>
      {children}
    </main>
  );
}

export default Main;