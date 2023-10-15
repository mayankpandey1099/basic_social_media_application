const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/', userController.createPost);
router.get('/', userController.getPosts);
router.get('/:postId', userController.getPost);

router.post('/:postId', userController.addComment);
router.delete('/:postId', userController.deletePost);

module.exports = router;