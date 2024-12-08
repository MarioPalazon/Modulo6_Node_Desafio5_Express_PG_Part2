const gestorPosts=require("../models/gestorPost.js");

const agregarPost= async (req,res)=>{
    try {
        
        const{titulo,url:img,descripcion}=req.body;

        if(titulo.trim()==="" || img.trim()==="" || descripcion.trim()===""){
            res.status(400).json({
                "status":"nok",
                "msg":"todos los campos son obligatorios"                
            });
            return;
        }

        const rowCount= await gestorPosts.agregarPost(titulo,img,descripcion,0);
        if(rowCount>0){
            res.status(201).json({
                "status":"ok",
                "msg":"Post agredado correctamente",
            });
        }else{
            res.status(400).json({
                "status":"nok",
                "msg":"Problemas al agregar el Post"                
            });
        }

        return;

    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error
        });
    }
}

const getPosts= async (req,res)=>{
    try {

        const data=await gestorPosts.obtenerPost();
        if(data.length>=0){
            res.status(200).json(data);
            return;    
        }else{
            res.status(400).json({
                "status": "NOK",
                "msg":"problemas al obtener los posts"
            });
        }
        
    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error
        });
    }
}

const updatePost=async (req,res)=>{
    try {

        const{id}=req.params;
        
        const existePost= await gestorPosts.obtenerPostPorId(id);

        if(!existePost){
            res.status(404).json({
                "status": "NOK",
                "msg":"no existe post para dar like"
            });
            return;
        }

        const rowCount =await gestorPosts.updateLikes(id);
        if(rowCount>0){
            res.status(200).json({
                "status": "OK",
                "msg":"se actualizo el like correctamente"
            });
            
        }else{
            res.status(400).json({
                "status": "NOK",
                "msg":"problemas al actualizar"
            });
        }

    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error
        });
    }
}

const deletePost=async (req,res)=>{
    try {
        
        const{id}=req.params;
        
        const existePost= await gestorPosts.obtenerPostPorId(id);

        if(!existePost){
            res.status(404).json({
                "status": "NOK",
                "msg":"no existe post para dar like"
            });
            return;
        }

        const rowCount =await gestorPosts.deletePost(id);
        if(rowCount>0){
            res.status(200).json({
                "status": "OK",
                "msg":"se elimino el post correctamente"
            });            
        }else{
            res.status(400).json({
                "status": "NOK",
                "msg":"problemas al eliminar o el post no existe"
            });
        }

    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error
        });
    }
}

module.exports={
    agregarPost,
    getPosts,
    updatePost,
    deletePost
}