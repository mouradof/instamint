import React from "react"
import { useField } from "formik"

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name)

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-gray-700 font-bold mb-4">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          meta.error && meta.touched ? "border-red-500" : ""
        }`}
      />
    </div>
  )
}

export default InputField
