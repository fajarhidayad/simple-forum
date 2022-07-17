import React, { Children } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <main className={`mt-10 pb-10 ${className}`}>
      <div className="container">
        <div className="max-w-[1045px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6 items-start">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Container;
