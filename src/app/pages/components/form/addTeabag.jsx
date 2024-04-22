import React, { useState } from "react"
import { Formik, Form, FieldArray, Field } from "formik"
import axios from "axios"
import { z, ZodError } from "zod"

const validationSchema = z.object({
  name: z.string().nonempty("Teabag name is required"),
  description: z.string(),
  newEmail: z.string().email("Invalid email format"),
})

const AddTeabagForm = ({ onSubmit, closeModal }) => {
  const [userEmails, setUserEmails] = useState([])

  const handleAddUser = (email) => {
    setUserEmails((prevEmails) => [...prevEmails, email])
  }

  const handleRemoveUser = (index) => {
    setUserEmails((prevEmails) => prevEmails.filter((_, i) => i !== index))
  }
  const validateForm = (values) => {
    try {
      validationSchema.parse(values)
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors.reduce((acc, curr) => {
          if (curr.path[0] === "newEmail" && values.newEmail === "") {
            return acc
          }

          return {
            ...acc,
            [curr.path[0]]: curr.message,
          }
        }, {})
      }
    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    const response = await axios.post(`http://localhost:4001/10/createTeabag`, {
      ...values,
      userEmails: userEmails,
    })
    onSubmit(response.data)
    resetForm()
    setUserEmails([])
    closeModal()
}
  

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        private: false,
        newEmail: "",
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className="w-full">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Group name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Group name"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name && touched.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <Field
              component="textarea"
              id="description"
              name="description"
              placeholder="Description group"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.description && touched.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && touched.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="newEmail" className="block text-gray-700 font-bold mb-2">
              Add Email
            </label>
            <div className="flex items-center mb-2">
              <Field
                type="email"
                name="newEmail"
                placeholder="Enter email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.newEmail && touched.newEmail ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  if (values.newEmail) {
                    handleAddUser(values.newEmail)
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Add
              </button>
            </div>
            {errors.newEmail && touched.newEmail && <div className="text-red-500">{errors.newEmail}</div>}
          </div>
          {userEmails.length > 0 && (
            <div className="mb-4 border rounded p-2 max-h-20 overflow-y-auto">
              <FieldArray name="userEmails">
                {() => (
                  <div>
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
                )}
              </FieldArray>
            </div>
          )}
          <div className="mb-4 flex items-center">
            <label htmlFor="private" className="block text-gray-700 font-bold mr-2">
              Private
            </label>
            <Field type="checkbox" id="private" name="private" className="leading-tight" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Teabag
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddTeabagForm
