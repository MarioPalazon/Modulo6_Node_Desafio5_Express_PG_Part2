const express= require('express');
const api=express.Router();

//importando el controlador
const PostsController=require('../controllers/postsController');

//creamos nuestras rutas para acceder al api
api.post('/',PostsController.agregarPost);
api.get('/',PostsController.getPosts);
api.put('/like/:id',PostsController.updatePost);
api.delete('/:id',PostsController.deletePost);

module.exports= api;