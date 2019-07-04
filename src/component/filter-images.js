import React from 'react';

const FilterImages = (props) => {

  const imagesArray = props.images.filter((item, index) => index % 4 === props.column);

  const result = imagesArray.map((item) => {
    return <img key={item.id} src={item.previewURL} data-src={item.largeImageURL} onClick={props.clickHandler} alt={item.tags}/>
  });

  return result;
}

export default FilterImages;