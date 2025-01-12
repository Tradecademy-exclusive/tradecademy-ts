import Joi from 'joi'

export const validateCourseSchema = (schema: unknown) => {
  try {
    const joiSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      cover: Joi.string().required(),
    })

    const { error } = joiSchema.validate(schema)

    if (error) {
      return { error }
    } else {
      return { error: null }
    }
  } catch (err) {
    return { error: err }
  }
}
