import React, { LegacyRef } from "react";

interface InputFormProps extends React.HTMLProps<HTMLInputElement> {
  errors?: string;
}

const InputForm = React.forwardRef(
  (props: InputFormProps, ref: LegacyRef<HTMLInputElement>) => {
    return (
      <div className="flex flex-col">
        <input
          ref={ref}
          {...props}
          className="border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:shadow"
        />
        {props.errors && <p className="text-red-500">{props.errors}</p>}
      </div>
    );
  }
);

export default InputForm;
