import { string } from "yup";

const phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{11}$/;

const phoneSchema = string()
    .required('Введите номер телефона')
    .matches(phoneRegExp, 'Неверный формат номера телефона');

export default phoneSchema;