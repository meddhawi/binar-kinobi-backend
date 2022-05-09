'use strict';
require('dotenv').config();

const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({username, password, email}) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({username, password: encryptedPassword, email})
          .then(result => {
            Promise.resolve(result)
            console.log(result)
          })
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)

    // Method untuk authenticate, login
    static authenticate = async({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email }})
        if(!user) return Promise.reject("Email not found!");
        const isPasswordValid = user.checkPassword(password);
        if(!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(user);
      } catch(err) {
        return Promise.reject(err);
      }
    }

    // generate token JWT
    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email
      }
      // Generate token
      return jwt.sign(payload, process.env.SECRET_KEY)
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};