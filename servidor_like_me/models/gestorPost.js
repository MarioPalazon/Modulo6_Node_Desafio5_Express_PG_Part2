const pool=require('../db/conexion.js');

const agregarPost=async (titulo,img,descripcion,likes)=>{
    try {
        const query="Insert into posts (id,titulo,img,descripcion,likes) Values (default,$1,$2,$3,$4)";

        const values=[titulo,img,descripcion,likes];
        const {rowCount}=await pool.query(query,values);
        return rowCount;

    } catch (error) {        
        return error;
    }

}

const obtenerPost=async ()=>{
    try {
        const query="select * from posts";
        const {rows}=await pool.query(query);

        return rows;

    } catch (error) {
        return error;
    }
}

const obtenerPostPorId = async (id)=>{
    try {
        const query="select id from posts where id=$1";
        const values=[id]
        const {rowCount}=await pool.query(query,values);
        if(rowCount>0){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return error;
    }
}

const updateLikes= async (id)=>{
    try {
        const query="update posts set likes= likes + 1 where id=$1";
        const values=[id]
        const {rowCount}=await pool.query(query,values);
        return rowCount;

    } catch (error) {
        return error;
    }
}

const deletePost=async(id)=>{
    try {
        const query="delete from posts where id=$1";
        const values=[id]
        const {rowCount}=await pool.query(query,values);
        return rowCount;

    } catch (error) {
        return error;
    }
}

module.exports={
    agregarPost,
    obtenerPost,
    obtenerPostPorId,
    updateLikes,
    deletePost
}