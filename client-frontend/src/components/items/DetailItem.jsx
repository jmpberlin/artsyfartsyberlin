import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import spinner from './spinner.gif';
import { formatPrice } from '../../Utility/scripts/functions';

const DetailItem = (props) => {
  const onAddHandler = (article) => {
    props.onAddHandler({ item: article, quantity: 1 });
  };

  const id = props.match.params.id;

  const [article, setArticle] = useState(null);
  useEffect(() => {
    axios.get(`/api/items/${id}`).then((resFromDb) => {
      setArticle(resFromDb.data.item);
    });
  }, []);
  if (article === null) {
    return (
      <div className='borderbox flexwrapper flex-col'>
        <img src={spinner} alt='' />
      </div>
    );
  }
  return (
    <div className='m-3 flex  flex-col'>
      <div className=''>
        <img className='p-3' src={article.imgUrl} alt='' />
      </div>
      <div className='p-3 text-xs text-center items-center'>
        <p className='text-2xl m-4'>{article.name}</p>
        <p className='m-2'>{article.description}</p>
        <p className='m-2'>Width: {article.width} cm</p>
        <p className='m-2'>Height: {article.height} cm</p>
        <p className='m-2 text-lg'>Price: {formatPrice(article.price)}</p>
        <button
          onClick={() => {
            onAddHandler(article);
          }}
          className='border border-black p-2 gradient rounded '
        >
          Add to Cart
        </button>
        <br />
        <br />
        <Link to='/'>
          <button className='border border-black p-2 gradient rounded'>
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetailItem;
