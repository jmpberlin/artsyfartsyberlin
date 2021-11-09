import axios from 'axios';
import React, { useEffect, useState, useParams } from 'react';
import { Link } from 'react-router-dom';
import spinner from './spinner.gif';

const DetailItem = (props) => {
  const priceParser = (cents) => {
    let decimal = (cents / 100).toString();

    let splitArr = decimal.split('.');

    if (splitArr.length === 1) {
      return splitArr[0] + ',' + '00' + ' €';
    }
    if (splitArr.length > 1) {
      return splitArr[0] + ',' + splitArr[1] + ' €';
    }
  };
  const onAddHandler = (article) => {
    console.log(article);
    props.onAddHandler({ item: article, quantity: 1 });
  };

  const id = props.match.params.id;

  const [article, setArticle] = useState(null);
  useEffect(() => {
    axios.get(`/items/${id}`).then((resFromDb) => {
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
        <p className='m-2 text-lg'>Price: {priceParser(article.price)}</p>
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
