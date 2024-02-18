const { generateHash, hashMatched } = require("../../../../utils/hashing");
const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");
const mongoose = require("mongoose");
const User = require("./../../../../model/User");

const register = async (req, res, next) => {
  const { username, name, email, password } = req.body;
  console.log(req.body);

// //working code
//   try {
//     const newUser = new User({
//       username: "john_doe",
//       email: "john@example.com",
//       password: "password123", // Note: You should hash passwords before storing them
//       age: 30,
//     });

//     newUser.save();
//   } catch (error) {
//     console.error("Error inserting user:", err);
//   }
// //working code end

    try {
      const user = await authService.register({ username, name, email, password });
 
      // access token generation
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const accessToken = await generateToken({ payload });
      
      const response = {
        code: 201,
        message: "Signup successful",
        data: {
          access_token: accessToken,
        },
        links: {
          self: {
            href: req.url,
          },
          login: {
            href: '/auth/login',
          },
        },
      };
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
};

module.exports = register;
