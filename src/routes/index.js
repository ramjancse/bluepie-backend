const router = require("express").Router();
const { controllers: artistController } = require("../api/v1/artist");
const { controllers: albumController } = require("../api/v1/album");
const { controllers: authController } = require("../api/v1/auth");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
// const ownership = require("../middleware/ownership");

// Auth Route
router
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login);

// Artist Route
router
  .route("/api/v1/artists")
  .get(artistController.findAllItems)
  .post(authenticate, authorize("admin", "user"), artistController.create);

router
  .route("/api/v1/artists/:id")
  .get(artistController.findSingleItem)
  .put(authenticate, authorize("admin", "user"), artistController.updateItem)
//   .patch(
//     authenticate,
//     authorize("admin", "user"),
//     artistController.updateItemPatch
//   )
  .delete(
    authenticate,
    authorize("admin", "user"),
    artistController.removeItem
  );

// Album Routes
router
  .route("/api/v1/albums")
  .get(albumController.findAllItems)
  .post(authenticate, authorize("admin", "user"), albumController.create);

router.route("/api/v1/albums/:id")
  .get(albumController.findSingleItem)
  .put(authenticate, authorize("admin", "user"), albumController.updateItem)
//   .patch(
//     authenticate,
//     authorize("admin", "user"),
//     albumController.updateItemPatch
//   )
  .delete(
    authenticate,
    authorize("admin", "user"),
    albumController.removeItem
  );

module.exports = router;
