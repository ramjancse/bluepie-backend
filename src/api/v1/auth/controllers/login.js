const authService = require("../../../../lib/auth");
const authenticationError = require("../../../../utils/error");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;

  try {
    const {accessToken, user} = await authService.login({ email, password, ipAddress,userAgent });
    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
        user : {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
          role: user.role,
          status: user.status,
          profilePicture: user.profilePicture,
        }
      },
      links: {
        self: {
          href: req.url,
        },
      },
    };
    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: "Login Failed",
      message: err.message
    });
  }
};

module.exports = login;
