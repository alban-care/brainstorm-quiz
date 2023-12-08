import SwitchToggleTheme from "./SwitchToggleTheme";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="h-16">
      <div className="flex items-center justify-between h-full mx-auto max-w-7xl">
        <Logo />
        <div className="flex items-center space-x-4">
          <SwitchToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
