const router = require("express").Router();
const { controllers: noteController } = require("../api/v1/note");
const { controllers: authController } = require("../api/v1/auth");
// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require("../middleware/ownership");

router
  // .get('/api/v1/auth/register', (req, res)=>{
  //   res.send("Hello from register!");
  // })
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login);

// router
//   .route("/api/v1/notes")
//   .get(noteController.findAllItems)
//   .post(authenticate, authorize("admin", "user"), noteController.create);

// router
//   .route("/api/v1/notes/:id")
//   .get(noteController.findSingleItem)
//   .put(authenticate, authorize("admin", "user"), noteController.updateItem)
//   .patch(
//     authenticate,
//     authorize("admin", "user"),
//     noteController.updateItemPatch
//   )
//   .delete(
//     authenticate,
//     authorize("admin", "user"),
//     ownership(),
//     noteController.removeItem
//   );

module.exports = router;
