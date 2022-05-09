const { Users, Products } = require('../models')
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
    },

    dataById: async(req, res) => {
        try {
            const data = await Products.findByPk(req.params.id)
            if(!data){
                res.status(400).json({
                    status: "ERROR",
                    message: "no ID found"
                })
            }else{
                res.status(200).json({
                    status: "OK",
                    result: data
                })
            }   
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
              })
        }
    },

    dataFindAll: async(req, res) => {
        try {
            const data = await Products.findAll()
            if(!data){
                res.status(400).json({
                    status: "ERROR",
                    message: "no Products found"
                })
            }else {
                res.status(200).json({
                    status: "OK",
                    result: data
                })
            }   
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
              })
        }
    },

    dataAdd: async(req, res)=> {
        try {
            const {name, price, image_url} = req.body
            console.log(name)
            await Products.create({
                name,
                price, 
                image_url
            }).then(result => [
                res.status(201).json({
                    status: "OK",
                    result
                })
            ])
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
            })
        }
    },

    dataUpdate: async(req,res) => {
        try {
            const id = req.params.id;
            const { name, price, image_url} = req.body
            const updateResult = await Products.update({
                name, price, image_url
            }, {where: {id}})

            if(updateResult == 0){
                res.status(400).json({
                    status: "ERROR",
                    message: "no ID found"
                })
            }else{
                await Products.findByPk(id)
                .then(result => {
                    // console.log(result)
                    res.status(201).json({
                        status: "OK",
                        result
                    })
                })
            }
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
            })
        }
    },

    dataDelete: async(req, res) => {
        try {
            const id = req.params.id;
            const deleteResult = await Products.destroy({where: {id}})

            if(deleteResult != 0){
                res.status(200).json({
                    status: "OK",
                    result: `${id} deleted`
                })
            }else if(deleteResult == 0){
                res.status(400).json({
                    status: "ERROR",
                    message: "no ID found"
                })
            }
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
            })
        }
    }
}