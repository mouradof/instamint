import React from "react"

const ProfileImageOptions = ({ option, setOption }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-medium text-gray-700 mb-2">Profile Image:</label>
    <div className="flex items-center justify-between mb-2">
      {["current", "random", "default"].map(opt => (
        <div className="flex items-center" key={opt}>
          <input
            type="radio"
            name="profileImageOption"
            value={opt}
            checked={option === opt}
            onChange={() => setOption(opt)}
            className="hidden"
            id={`profile-${opt}`}
          />
          <label htmlFor={`profile-${opt}`} className="flex items-center cursor-pointer">
            <span
              className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${option === opt ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
            >
              {option === opt && <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
            </span>
            <span className="text-sm text-gray-700">{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
)

export default ProfileImageOptions
