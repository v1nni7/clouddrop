import { object, ref, string } from 'yup'

export const signUpSchema = object().shape({
  confirmPassword: string()
    .required('Confirme sua senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .oneOf([ref('password')], 'As senhas não coincidem'),
  password: string()
    .required('Insira sua senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmEmail: string()
    .required('Confirme seu e-mail')
    .email('Insira um e-mail válido')
    .oneOf([ref('email')], 'Os e-mails não coincidem'),
  email: string()
    .required('Insira seu e-mail')
    .email('Insira um e-mail válido'),
  username: string().required('Insira seu usuário'),
  name: string().required('Insira seu nome'),
})

export const signInSchema = object().shape({
  password: string().required('Insira sua senha'),
  email: string()
    .required('Insira seu e-mail')
    .email('Insira um e-mail válido'),
})
