const TextAreaField = ({ name, placeholder, errors, touched, ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
      {placeholder}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] && touched[name] ? "border-red-500" : ""
      }`}
      {...props}
    />
  </div>
)

export default TextAreaField
