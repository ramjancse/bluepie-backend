const router = require("express").Router();
const { controllers: artistController } = require("../api/v1/artist");
const { controllers: authController } = require("../api/v1/auth");
// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require("../middleware/ownership");

router
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login);

router
  .route("/api/v1/artists")
  .get(artistController.findAllItems)
//   .post(authenticate, authorize("admin", "user"), artistController.create);

// router
//   .route("/api/v1/artists/:id")
//   .get(artistController.findSingleItem)
//   .put(authenticate, authorize("admin", "user"), artistController.updateItem)
//   .patch(
//     authenticate,
//     authorize("admin", "user"),
//     artistController.updateItemPatch
//   )
//   .delete(
//     authenticate,
//     authorize("admin", "user"),
//     ownership(),
//     artistController.removeItem
//   );

module.exports = router;
