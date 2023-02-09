const joi= require('joi')

const validator= (schema) => (payload) =>
        schema.validate(payload,{abortEarly:false})
    

const signupSchema = joi.object({
    email:joi.string().email().required(),
    username:joi.string().required(),
    password:joi.string().min(3).max(10).required()
});

const loginSchema= joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()

})

const addblogSchema= joi.object({
    title:joi.string().required(),
    body:joi.string().required(),
    image:joi.any()
})
const messageSchema= joi.object({
    email:joi.string().email().required(),
    message:joi.string().required()
})
const commentSchema= joi.object({
    comment:joi.string().required()
})

exports.validateSignup = validator(signupSchema)
exports.validateLogin = validator(loginSchema)
exports.validateAddblog = validator(addblogSchema)
exports.validateMessages = validator(messageSchema)
exports.validateCommnet = validator(commentSchema)

