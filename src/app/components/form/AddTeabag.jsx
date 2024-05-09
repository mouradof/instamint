import React, { useState } from "react"
import { Formik, Form } from "formik"
import { z, ZodError } from "zod"
import InputField from "../common/InputField"
import TextAreaField from "../common/TextAreaField"
import FileInputField from "../common/FileInputField"
import CheckboxField from "../common/CheckboxField"
import FormButton from "../common/FormButton"
import Button from "../common/Button"
import UserList from "../common/UserList"
import Toast from "../common/Toast"

const validationSchema = z.object({
  name: z.string().nonempty("Teabag name is required"),
  description: z.string(),
  newEmail: z.string().email("Invalid email format")
})

const AddTeabagForm = ({ onSubmit, closeModal, idUser, createTeabagFunction }) => {
  const [userEmails, setUserEmails] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState(null)

  const handleAddUser = email => {
    setUserEmails(prevEmails => [...prevEmails, email])
  }

  const handleRemoveUser = index => {
    setUserEmails(prevEmails => prevEmails.filter((_, i) => i !== index))
  }

  const handleImageChange = event => {
    setSelectedImage(event.target.files[0])
  }

  const validateForm = values => {
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
            [curr.path[0]]: curr.message
          }
        }, {})
      }
    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("private", String(values.private))
      formData.append("invitedEmailsUsers", JSON.stringify(userEmails))

      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      const [error, data] = await createTeabagFunction({ idUser, formData })

      if (error) {
        setError(error)

        return
      }

      onSubmit(data)
      resetForm()
      setUserEmails([])
      setSelectedImage(null)
      closeModal()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      {error && <Toast message={error.message} isSuccess={false} />}
      <Formik
        initialValues={{
          name: "",
          description: "",
          private: false,
          newEmail: ""
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="w-full">
            <InputField
              name="name"
              placeholder="Group name"
              type="text"
              errors={errors}
              touched={touched}
              label="Group name"
            />
            <TextAreaField name="description" placeholder="Description group" errors={errors} touched={touched} />
            <div className="flex items-center justify-between">
              <InputField
                name="newEmail"
                placeholder="Enter email"
                type="email"
                errors={errors}
                touched={touched}
                label="Invite friends"
              />
              <Button
                text="Add"
                type="button"
                onClick={() => {
                  if (values.newEmail) {
                    handleAddUser(values.newEmail)
                  }
                }}
                className="mt-6"
              />
            </div>
            {userEmails.length > 0 && <UserList userEmails={userEmails} handleRemoveUser={handleRemoveUser} />}
            {errors.newEmail && touched.newEmail && <div className="text-red-500">{errors.newEmail}</div>}
            <FileInputField name="image" handleImageChange={handleImageChange} />
            <CheckboxField id="private" name="private" label="Private" />
            <FormButton text="Add Teabag" />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddTeabagForm
