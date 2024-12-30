import React from "react";
import logo from "../../../public/Logo.png";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <>
      <header className="fixed w-full backdrop-blur-3xl z-[120]">
        <div className="p-4">
          <Image src={logo} alt="LingoAI Logo" width={30} height={30} />
        </div>
        <div className="bg-foreground h-[1px] w-[30%] min-w-[200px]"></div>
      </header>
    </>
  );
};

export default Header;
