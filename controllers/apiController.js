const { Users } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            Users.authenticate(req.body)
                .then(user => {
                    res.status(200).json({
                        status: 'OK',
                        result: {
                            accessToken: user.generateToken()
                        }
                    })
                })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
              })
        }
    },

    register: async (req, res) => {
        const { username, email, password } = req.body
        
        const encryptedPassword = Users.encrypt(password)
        try {
            const user = await Users.findOne({
                where: { email },
              })
        
            const validateEmail = (email) => {
                return String(email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
            }
            if (!username || !email || !password) {
                return res.status(400).json({
                    result: 'failed',
                    message: 'Please missing credentials!',
                })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({
                    result: 'failed',
                    message: 'Please enter valid email address',
                })
            }
            
            if (user) {
                return res.status(400).json({
                    result: 'failed',
                    message: 'Email already existed',
                })
            }

            Users.create({
                username: username, 
                email: email, 
                password: encryptedPassword
            })
            .then(result => {
                res.status(200).json({
                    status: "OK",
                    result
                  })
              })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
              })
        }
    }
}