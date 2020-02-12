import React, {useState, useRef, useEffect} from 'react';
import Modal from './modal';
import FilterImages from './filter-images';

function ImageGrid() {
  let isFetch = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImage] = useState([]);
  const [modalImage, setModalImage] = useState("");
  let [count, setCount] = useState(1);

  useEffect(() => {
    // get all images, 30 images per load
    const getImages = () => {
      const url = `https://pixabay.com/api/?key=12937325-2751ca46c27b868deede35ca0&image_type=all&per_page=30&page=${count}`;
      
      fetch (url)
      .then((res) => res.json())
      .then((data) => {
        let result = data.hits.map((item) => {
          return {
            id: item.id,
            tags: item.tags,
            previewURL: item.previewURL,
            largeImageURL: item.largeImageURL
          }
        })
        setIsLoading(false);
        result = [...images, ...result];
        setImage(result);
        isFetch.current = false;
      })
      .catch((err) => {
        console.log('err', err);
        isFetch.current = false;
      });
    }

    getImages();
  }, [count])

  useEffect(() => {
    const loadMore = () => {    
      if (isFetch.current) {
        return;
      }

      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) {
        isFetch.current = true;
        setCount(count + 1);
      }
  }
    window.addEventListener('scroll', debounce(loadMore, 100));

    return () => window.removeEventListener('scroll', debounce(loadMore, 100));
  }, [count])

  const debounce = (fn, delay) => {
    let timeOut = false;
    
    return function () {
      clearTimeout(timeOut)
      timeOut = setTimeout(fn, delay);
    }
  }

  
  
  // display image in modal
  const getSingleImage = (event) => {
    setModalImage(<img alt='' src={event.target.dataset.src} />);
  }

   // close modal
   const closeModal = () => {
    setModalImage("");
  }

  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) :
        images.length > 0 && <> 
          <div className="column">{<FilterImages clickHandler={getSingleImage} images={images} column={0}/>}</div>
          <div className="column">{<FilterImages clickHandler={getSingleImage} images={images} column={1}/>}</div>
          <div className="column">{<FilterImages clickHandler={getSingleImage} images={images} column={2}/>}</div>
          <div className="column">{<FilterImages clickHandler={getSingleImage} images={images} column={3}/>}</div>

          {modalImage && <Modal onCloseHandle={closeModal} image={modalImage}/>
          }
        </>
      }
    </>
  )
}

export default ImageGrid;