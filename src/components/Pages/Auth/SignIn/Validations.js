import * as yup from "yup"

const validations=yup.object().shape({
    email:yup.string().email("Geçerli Bir email Girin").required("zorunlu alan"),
    password:yup.string().min(5,"parola en az 5 karakter olmalıdır.").required("zorunlu olan")

})

export default validations