import React, { useEffect, useState } from 'react';
import { getAllPhotos, searchAlbumById } from '../services/ApiService';

const Photos = () => {
    const [allPhotos, setAllphotos] = useState([])
    const [displayedPhotos, setDisplayedPhotos] = useState([]);
    const [displayCount, setDisplayCount] = useState(12);
    const [albumID, setAlbumID] = useState();
    useEffect(() => {
        fetchAllPhotos()

    }, [])

    const fetchAllPhotos = async () => {
        const res = await getAllPhotos()
        const data = res.data
        setAllphotos(data)
        setDisplayedPhotos(data.slice(0, displayCount))

    }
    // console.log("allptos", allPhotos);
    // console.log("displayedPhotos", displayedPhotos);
    // console.log("render trc");
    const handleCountPage = () => {
    // console.log("render trong");

        setDisplayCount(displayCount + 12);

        if(albumID){
            setDisplayedPhotos(allPhotos.filter(photo => photo.albumId === Number(albumID)).slice(0, displayCount + 12));
        }
        else {
             setDisplayedPhotos(allPhotos.slice(0, displayCount + 12));

         }

    }
    const handleSearchPhotosById = async (event) => {
        const res = await searchAlbumById(albumID)
        const data = res.data
        setDisplayedPhotos(data.slice(0, displayCount))
        //sau khi click sang search khac set lai count thanh 12 
         setDisplayCount(12)
        //hien thi 12  thang dau tien , neu an load more thì count lúc này đã đc set thành 12 ở dòng trên
        setDisplayedPhotos(data.filter(photo => photo.albumId === Number(albumID)).slice(0, 12));
        
    }
    return (
        <div className="photos-container container">
            <h1>Photos</h1>
            
            <div>
                <div className="row"  >
                    <div className="col-md-4 ">
                        <input type="text"
                            placeholder='Search by album ID'
                            className="form-control"
                            value={albumID}
                            onChange={(event) => setAlbumID(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearchPhotosById();
                                }
                            }}
                        />


                    </div>

                    <div className="col-md-2">
                        <button
                            className='btn btn-primary'
                            onClick={(event) => { handleSearchPhotosById(event) }}
                        >  Search</button>
                    </div>
                </div>
            </div>
            <div className="photosItem row">

                {   
                    displayedPhotos.map((photo) => {
                        return (
                            <div className="col-md-3 my-2">

                                <div className="card " style={{ width: "18rem" }}>
                                    <img src={photo.url} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ width: '250px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {photo.title}</h5>
                                        <p className="card-text">id:{photo.id}</p>
                                        <p className="card-text">albumId:{photo.albumId}</p>

                                    </div>
                                </div>
                            </div>

                        )
                    })

                }

                <div className='text-center my-3'>
                    <button className="btn btn-primary col-md-4"
                        onClick={() => { handleCountPage() }}>Load More</button>
                </div>


            </div>
        </div>
    );
};

export default Photos;