import * as yup from "yup"

const editSchema = yup.object().shape({
    title:yup.string().required(),
    description:yup.string().min(5).required(),
    price:yup.number().required().positive().integer(),
})

export default editSchema