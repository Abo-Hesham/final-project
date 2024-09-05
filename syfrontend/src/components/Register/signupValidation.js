import * as Yup from "yup"


export const signupValidation = Yup.object({
    username:Yup.string().min(4).max(20).required("Please Enter username"),
    email:Yup.string().min(4).max(100).email("Please Enter Valid email").required("please enter the email"),
    password:Yup.string().min(8).required("Please Enter Password")
})