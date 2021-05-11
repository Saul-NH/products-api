
const checkInputsSignIn = (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            ok : false,
            message : 'You need an email and password'
        })
    }
    next()
}

module.exports = {
    checkInputsSignIn
}