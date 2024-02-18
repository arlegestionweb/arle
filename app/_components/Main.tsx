const Main = ({ children, extraClasses }: {
  children: React.ReactNode;
  extraClasses?: string;
}) => {
  return (
    <main className={`relative z-10 lg:mb-[100vh] pt-[50px] md:pt-0 ${extraClasses ? extraClasses : ""}`}>
      {children}
    </main>
  );
}

export default Main;