Post = require('../models/userModel');

const userController = {
    getPosts: async (req, res) => {
         try{
            const posts = await Post.findAll({include : [{all : true}]});

            res.json({
                posts
            });
         }catch(err){
            console.log("error getting post", err);

            res.status(500).json({
                error: "an error occurred while getting posts",
            });
         }
    },

    getPost: async (req, res) => {
        const {postId} = req.params;

        try{
            const post = await Post.findByPk(postId, {include: [{all: true}]});

            if(!post){
                return res.status(404).json({
                    error: "post not found"
                });
            }
            res.json({post});
        }catch(err){
            console.log("error getting post", err);

            res.status(500).json({
                error: "an error occurred while getting the post",
            });
        }
    },
    createPost: async (req, res) =>{
        const {link, description} = req.body;

        try{
            const post = await Post.create({
                link,
                description,
                comments: [],    
            });
            res.json({
                message: 'Post created successfully', post
            });
        }catch(err){
            console.log("error creating post:", err);
            res.status(500).json({
              err: "An error occurred while creating the post"
            });
        }
    },

    addComment: async (req, res) => {
        console.log("Request body:", req.body);
        const {postId} = req.params;
        const {commentText} = req.body;

        try{
            const post = await Post.findByPk(postId);

            if(!post){
                return res.status(404).json({
                    error: "post not found"
                });
            }

            console.log("Received postId:", postId);
            console.log("Received commentText:", commentText);
            console.log("Current post.comments:", post.comments);
            
            post.comments.push(commentText);

            await post.save();

            res.json({
                message: "comment added successfully", post
            });
        }catch (err){
            console.log("error adding the comment", err);

            res.status(500).json({
                error: "an error occurred while adding the comment"
            });
        }
    },
    deletePost: async (req, res) => {
        const {postId} = req.params;

        try{
            const post = await Post.findByPk(postId);

            if(!post){
                return res.status(404).json({
                    error: "post not found"
                });
            }

            const deletedPost = await post.destroy();

            if(!deletedPost){
                return res.status(404).json({
                    error: "post not found"
                });
            }
            res.json({
                message: "post deleted successfully"
            });
        } catch(err){
            console.log("error deleting post:",  err);
            res.status(500).json({
                error: "an error occurred while deleting the post"
            });
        }

    },


};
module.exports = userController;
