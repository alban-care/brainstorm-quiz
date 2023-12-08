import Icons from "./Icons";

const Logo = () => (
  <div className="flex items-center">
    <Icons.logo className="w-8 h-8 text-inherit" />
    <span className="ml-2 uppercase text-inherit font-bold hidden md:block">
      Remue-Méninges
    </span>
  </div>
);

export default Logo;
