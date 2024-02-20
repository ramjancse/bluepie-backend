const authService = require("../../../../lib/auth");
const authenticationError = require("../../../../utils/error");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await authService.login({ email, password });
    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
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
