import axios from 'axios';

const getAllUser = () =>{
    return  axios.get('https://jsonplaceholder.typicode.com/users')

}
const getUserDetails = (id) =>{
    return  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

}
const updateUser = (id, user) => {
    return axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
  };
const getAlbumById = (idUser) => {
    return axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${idUser}`)
}
const addNewAlbum = (data) => {
    return axios.post(`https://jsonplaceholder.typicode.com/albums`,data)
}
const deleteAlbum = (idAlbum) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/albums/${idAlbum}`)
}
const getAllPhotos = () =>{
    return  axios.get('https://jsonplaceholder.typicode.com/photos')

}
const searchAlbumById = (albumID) =>{
    return  axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`)

}
export {searchAlbumById,getAllPhotos,deleteAlbum,addNewAlbum, getAllUser,getUserDetails,updateUser,getAlbumById}