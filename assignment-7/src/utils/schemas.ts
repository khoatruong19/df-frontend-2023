/* eslint-disable prefer-regex-literals */
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(8, 'Password must contain at least 8 characters!')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One symbol',
    ),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const BookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'Book name must contain at least 5 characters!'),
  author: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]*$/g, 'Contains only letters and spaces'),
})

export type BookSchemaType = z.infer<typeof BookSchema>
