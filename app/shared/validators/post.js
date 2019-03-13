import { string } from 'yup'

export const post = {
  title: string().required(),
  contents: string().required()
}
