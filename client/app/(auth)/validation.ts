import * as yup from "yup"

const LoginSchema = yup.object({
    email:yup.string().required("Email required"),
    password:yup.string().required("Password required"),
})

const RegisterSchema = yup.object({
    username:yup.string().min(3,"Username must be at least 3 characters").max(15,"Username must be shorter than 15 characters")
    .required("Username required"),
    email:yup.string().email("Invalid Email").required("Email required"),
    password:yup.string().min(8,"Password must be at least 8 characters").max(20,"Password must be shorter than 20 characters")
    .required("Password required"),
    re_password:yup.string().min(8,"Password must be at least 8 characters").max(20,"Password must be shorter than 20 characters")
    .oneOf([yup.ref('password')],"Passwords don't match").required("Re-password required"),
})

export type RegisterType = yup.InferType<typeof RegisterSchema>

export type LoginType = yup.InferType<typeof LoginSchema>

export {RegisterSchema,LoginSchema}