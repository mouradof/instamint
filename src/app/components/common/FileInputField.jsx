const FileInputField = ({ name, handleImageChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
      Upload Image
    </label>
    <input
      id={name}
      name={name}
      type="file"
      onChange={handleImageChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
)

export default FileInputField
