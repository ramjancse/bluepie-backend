const router = require("express").Router();
const { controllers: artistController } = require("../api/v1/artist");
const { controllers: userController } = require("../api/v1/user");
const { controllers: labelController } = require("../api/v1/label");
const { controllers: albumController } = require("../api/v1/album");
const { controllers: authController } = require("../api/v1/auth");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
// const ownership = require("../middleware/ownership");

// Auth Route
router
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login);

  // User account

  router
  .route("/api/v1/users")
  .get(authenticate, authorize("admin", "user"), userController.findAllItems)
  // .post(authenticate, authorize("admin", "user"), artistController.create);


  router
  .route("/api/v1/users/:id")
  .get(authenticate, authorize("admin", "user"), userController.findSingleItem)
  .put(authenticate, authorize("admin", "user"), userController.updateItem)
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

// Label Route
router
  .route("/api/v1/labels")
  .get(labelController.findAllItems)
  .post(authenticate, authorize("admin", "user"), labelController.create);

router
  .route("/api/v1/labels/:id")
  .get(labelController.findSingleItem)
  .put(authenticate, authorize("admin", "user"), labelController.updateItem)
//   .patch(
//     authenticate,
//     authorize("admin", "user"),
//     labelController.updateItemPatch
//   )
  .delete(
    authenticate,
    authorize("admin", "user"),
    labelController.removeItem
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
