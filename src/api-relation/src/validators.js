import { z } from "zod"

// generic
export const stringValidator = z.string()
export const idValidator = z.string()
export const integerValidator = z.number().int()
export const numberValidator = z.number()
export const booleanValidator = z.boolean()
