import Header from "./Header";
import { ThemeProvider } from "./themeProvider";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="remue-meninges-ui-theme">
      {/* change defaultTheme to system, dark, or light */}
      <div className="container flex flex-col">
        <Header />
        <main className=" bg-inherit">{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
