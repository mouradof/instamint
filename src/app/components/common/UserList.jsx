const UserList = ({ userEmails, handleRemoveUser, ...props }) => (
  <div className="mb-4 border rounded p-2 max-h-20 overflow-y-auto" {...props}>
    {userEmails.map((email, index) => (
      <div key={index} className="flex items-center mb-2">
        <div className="text-gray-700 mr-2">{email}</div>
        <button
          type="button"
          onClick={() => {
            handleRemoveUser(index)
          }}
          className="text-red-500 font-bold"
        >
          &#10006;
        </button>
      </div>
    ))}
  </div>
)

export default UserList
