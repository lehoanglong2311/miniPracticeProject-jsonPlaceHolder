import React, { useEffect, useState,memo  } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import './UserDetail.scss'
import { addNewAlbum, deleteAlbum, getAlbumById, getUserDetails, updateUser } from '../services/ApiService';
const UserDetail = () => {

  const [user, setUser] = useState('')

  const { id } = useParams();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [album, setAlbum] = useState([]);
  const [addAlbum, setAddAlbum] = useState('');


  const [disPlayForm, setDisPlayForm] = useState(false);
  console.log("re-render bên ngoài");

  useEffect(() => {
    fetchUserDetail()
    //console.log("re-render");
    fetchAlbumByUserID()
  }, [])
  const fetchUserDetail = async () => {
    try {
      const res = await getUserDetails(id)
      const data = res.data
      setUser(data)

    } catch (error) {
      console.log(error);
    }

  }
  const fetchAlbumByUserID = async () => {
    try {
      const res = await getAlbumById(id)
      const data = res.data
      // console.log("album",data);
      setAlbum(data)

    } catch (error) {
      console.log(error);
    }

  }
  const handleEditContact = () => {
    setDisPlayForm(true)
    setEmail(user?.email)
    setPhone(user?.phone)
    setWebsite(user?.website)

  }
  const handleReset = () => {
    setEmail(user?.email)
    setPhone(user?.phone)
    setWebsite(user?.website)
  }
  const handleSubmit = async () => {


    setDisPlayForm(false)

    const UpdateContact = {

      ...user,
      email,
      phone,
      website
    }

    try {
      const res = await updateUser(id, UpdateContact)
      const data = res.data
      setUser(data)

    } catch (error) {
      console.log(error);
    }



  }


  const handleAddNewAlbum = async (event) => {
    event.preventDefault();
    try {
      const newAlbum = {
        "userId": user?.id,
        "id": album.length + 1,
        "title": addAlbum

      }
      const res = await addNewAlbum(newAlbum)
      console.log("resnew", res);
      const data = res.data
      setAlbum([
        ...album,
        data
      ])
      setAddAlbum('')
    } catch (error) {

    }

  }
  const handleDeleteAlbum = async (albumID) => {
    // const res = 
    await deleteAlbum(albumID)
    // console.log("del", res);
    // const data = res.data 

    setAlbum(album.filter((a) => { return a.id !== albumID }))

  }
  return (
    <div className="user-detail-container container">
      <h1>{user?.name}</h1>
      <div className='detail-infor'>
        <div className='row'>
          <div className='col-md-6 '>
            <h4 className='text-info '>Personal: </h4>

            <div>    Id: <span className='mb-0 fw-bold'>{user?.id}</span></div>
            <div>    Username: <span className='mb-0 fw-bold'>{user?.username}</span></div>

            <div className=' my-2'>
              <h4 className='text-info '>Address: </h4>
              <div>Street: <span className='mb-0 fw-bold'>{user?.address?.street}</span> </div>
              <div>  Suite: <span className='mb-0 fw-bold'>{user?.address?.suite}</span></div>
              <div> City:  <span className='mb-0 fw-bold'>{user?.address?.city}</span></div>
              <div> Zipcode: <span className='mb-0 fw-bold'>{user?.address?.zipcode}</span> </div>

            </div>
            <div className='my-2 '>
              <h4 className='text-info '>Company: </h4>

              <div>    Name: <span className='mb-0 fw-bold'>{user?.company?.name}</span></div>
              <div>    CatchPhrase:<span className='mb-0 fw-bold'>{user?.company?.catchPhrase}</span></div>
              <div>    Bs: <span className='mb-0 fw-bold'>{user?.company?.bs}</span></div>

            </div>
          </div>

          <div className='col-md-6'>
            <h4 className='text-info '>Contact: </h4>
            {

              disPlayForm

                ?
                <>
                  <form className="row g-3">
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="Website">Website:</label>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="Phone">Phone:</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-success col-md-2 my-2 "
                      onClick={() => handleSubmit()}
                    >Submit</button>

                  </form>

                  <button
                    onClick={() => handleReset()}
                    className='btn btn-danger col-md-2'>reset</button>
                </>
                :
                <>
                  <div>Email: <span className='mb-0 fw-bold'>{user?.email}</span></div>
                  <div>Website <span className='mb-0 fw-bold'>{user?.website}</span>:</div>
                  <div>Phone: <span className='mb-0 fw-bold'>{user?.phone}</span></div>
                  <button
                    onClick={() => handleEditContact()}
                    className='btn btn-success'>Edit</button>

                </>


            }

          </div>

        </div>

      </div>
      <hr></hr>

      <div className='Photo-Albums'>

        <h4>Photo Albums:</h4>
        <div className='' >
          <form className="row" onSubmit={handleAddNewAlbum} >
            <div className="col-md-4 ">
              <input type="text"
                placeholder='Title of new album'
                className="form-control"
                value={addAlbum}
                onChange={(event) => setAddAlbum(event.target.value)}
              />


            </div>

            <div className="col-md-2">
              <button
                className='btn btn-success'
              // onClick={(event) => { handleAddNewAlbum(event) }}
              >  New album</button>
            </div>
          </form>

        </div>

        <div className="row albumPhotos ">
          {
            album.map((item, index) => {
              return (
                <>

                  <div className=" col-md-5 albumItem  mb-3 py-3 my-3 mx-2 row">

                    <div className="col-md-10 "
                      key={`album ${index}`}
                    >{index + 1}  | {item.title}


                    </div>
                    <div className="col-md-2">
                      <button onClick={() => handleDeleteAlbum(item.id)} className="btn btn-danger">X</button>
                    </div>
                  </div>

                </>
              )
            })

          }
        </div>





      </div>
    </div>
  );
};

export default memo(UserDetail);
