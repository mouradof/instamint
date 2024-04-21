import React from "react"
import { Formik, Form, Field } from "formik"

const AddTeabagForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        groupName: "",
        description: "",
        isPublic: false,
      }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values)
        resetForm()
      }}
    >
      {() => (
        <Form>
          <div className="mb-4">
            <label htmlFor="groupName" className="block text-gray-700 font-bold mb-2">
              Group name
            </label>
            <Field
              type="text"
              id="groupName"
              name="groupName"
              placeholder="Nom du groupe"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <Field
              component="textarea"
              id="description"
              name="description"
              placeholder="Description du groupe"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isPublic" className="block text-gray-700 font-bold">
              
            </label>
            <Field
              type="checkbox"
              id="isPublic"
              name="isPublic"
              className="mr-2 leading-tight"
            />
            <label htmlFor="isPublic" className="text-gray-700">
              Public
            </label>
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
