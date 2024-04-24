import { Field } from "formik"

const CheckboxField = ({ id, name, label, ...props }) => (
  <div className="mb-4 flex items-center">
    <label htmlFor={id} className="block text-gray-700 font-bold mr-2">
      {label}
    </label>
    <Field type="checkbox" id={id} name={name} className="leading-tight" {...props} />
  </div>
)

export default CheckboxField
