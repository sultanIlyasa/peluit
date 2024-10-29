import * as yup from "yup"

const loginSchema = yup.object().shape({
    npm: yup.number("NPM is incorrect").required("NPM can't be empty"),
    password: yup.string().required()
})

const registerSchema = yup.object().shape({
    email: yup.string().email("Please enter the correct email").required("Email can't be empty"),
    fullname: yup.string().required("Fullname can't be empty"),
    password: yup.string().min(8, "Password must be 8-16 characters and contain both numbers and letters/special characters.").max(16, "Password must be 8-16 characters and contain both numbers and letters/special characters.").required("Passwrod can't be empty")
})

const forgetSchema = yup.object().shape({
    email: yup.string().email("Please enter the correct email").required("Email can't be empty")
})

const resetSchema = yup.object().shape({
    password: yup.string().required()
})

export {loginSchema, registerSchema, forgetSchema, resetSchema}