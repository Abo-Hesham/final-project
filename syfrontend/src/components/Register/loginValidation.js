import * as Yup from "yup"

export const loginValidation = Yup.object({
    email:Yup.string().min(4).max(100).required("Please Enter Your email").email(),
    password:Yup.string().min(4).required("Please Enter Your Password")
})