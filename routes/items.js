var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const uploader = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

// GET ALL ITEMS FROM THE ITEM DB
router.get('/allItems/', (req, res, next) => {
  Item.find({ archived: false })
    .then((resFromDb) => {
      res.json(resFromDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

//

router.get('/searchBarItems', (req, res, next) => {
  const query = req.query.search;

  Item.find({ name: { $regex: query, $options: 'i' } }).then(
    (foundArticles) => {
      // console.log(foundArticles);
      res.json({
        msg: 'everything worked',
        success: 'true',
        articles: foundArticles,
      });
    }
  );
});
/// ADD TO DB ORDER ROUTE!!

router.post('/addToOrder', (req, res, next) => {
  const itemId = req.body.item._id;
  const orderId = req.session.currentOrder;
  Order.findOne({ _id: orderId }).then((currentOrder) => {
    let indexOfArt = currentOrder.items.findIndex(
      (e) => e.item.toString() === itemId
    );
    if (indexOfArt === -1) {
      Order.findByIdAndUpdate(
        orderId,
        {
          $push: {
            items: { item: req.body.item._id, quantity: req.body.quantity },
          },
        },
        { new: true }
      ).then((resFromDb) => {
        res.json({
          msg: 'article not existent before. Pushed to the Array',
          success: true,
          cartLength: resFromDb.items.length,
        });
      });
    }
    if (indexOfArt !== -1) {
      Order.findByIdAndUpdate(
        orderId,
        {
          $inc: { [`items.${indexOfArt}.quantity`]: req.body.quantity },
        },
        { new: true }
      ).then((resFromDb) => {
        res.json({
          msg: 'Article existed before, changed the quantity',
          success: true,
          cartLength: resFromDb.items.length,
        });
      });
    }
  });
});

// GET ALL ITEMS OUT OF THE USER ORDER ENTRY IN THE DB!

router.get('/userOrder', (req, res, next) => {
  const orderId = req.session.currentOrder;
  if (!req.session.currentUser) {
    Order.findById(orderId)
      .populate('items.item')
      .then((userOrderFromDb) => {
        res.json(userOrderFromDb);
      });
  }
  if (req.session.currentUser) {
    const userId = req.session.currentUser._id;
    Order.findOne({ cartUser: userId })
      .populate('items.item')
      .then((userOrderFromDb) => {
        res.json(userOrderFromDb);
      });
  }
});

// SET QUANTITY IN THE CART

router.post('/setQuantityOfCartItem', (req, res, next) => {
  const orderId = req.session.currentOrder;
  const newQuan = req.body.obj.quantity;
  const articleId = req.body.obj.item;
  if (newQuan < 0) {
    return;
  }
  Order.findOne({ _id: orderId })
    .then((resFromDb) => {
      const index = resFromDb.items.findIndex(
        (e) => e.item.toString() === articleId
      );
      return index;
    })
    .then((index) => {
      Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: { [`items.${index}.quantity`]: newQuan },
        }
      ).then((returnValue) => {
        res.json({ message: 'set the new value', success: true });
      });
    });
});

// DELETE ARTICLE FROM ORDER

router.post('/deleteFromCart', (req, res, next) => {
  const orderId = req.session.currentOrder;
  Order.findByIdAndUpdate(
    orderId,
    {
      $pull: { items: { item: req.body.articleId } },
    },
    { new: true }
  ).then((resFromDb) => {
    // console.log(resFromDb.items.length);
    res.json({
      msg: 'deleted the Item from the Cart',
      success: true,
      cartLength: resFromDb.items.length,
    });
  });
});

/// FIND ONE ARTICLE TO DISPLAY DETAIL VIEW

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Item.findById(id).then((resFromDb) => {
    res.json({ item: resFromDb });
  });
});

// UPLOAD PICTURE TO CLOUDINARY
router.post(
  '/newItem/picUpload',
  uploader.single('imageUrl'),
  (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ success: true, picUrl: req.file.path });
  }
);

// UPLOAD DATA FOR NEW ITEM
router.post('/newItem/dataUpload', (req, res, next) => {
  // console.log('there is req.body');
  // console.log(req.body);
  const { name, imgUrl, price, width, height, description } = req.body;
  const articleNumber = uuidv4();
  // console.log(articleNumber);
  Item.create({
    name,
    imgUrl,
    price,
    width,
    height,
    description,
    articleNumber,
  }).then((newlyCreatedItem) => {
    res.json({ success: true, item: newlyCreatedItem });
  });
});

// GET ALL ITEMS ( ALSO THE ARCHIVED ONE ) ADMIN ROUTE
router.get('/admin/getAllItems', (req, res, next) => {
  Item.find()
    .then((allItems) => {
      res.json({ success: true, items: allItems });
    })
    .catch((err) => res.json({ success: false, message: err }));
});

/// ADMIN ROUTE TO DELETE ITEM FROM SHOP!
router.delete('/deleteItemFromStore/:id', (req, res, next) => {
  if (req.session.currentUser.role !== 'admin') {
    res.json({
      success: false,
      msg: 'user is not logged in or user is not an admin and lacks authorization for this action!',
    });
    return;
  }
  Item.findByIdAndUpdate(req.params.id, { archived: true }).then(
    (resFromDelete) => {
      console.log(resFromDelete);

      res.json({
        success: true,
        msg: 'everything worked!',
      });
    }
  );
});
router.post('/restoreItem/:id', (req, res, next) => {
  // console.log('Hit the route!');
  if (req.session.currentUser.role !== 'admin') {
    res.json({
      success: false,
      msg: 'user is not logged in or user is not an admin and lacks authorization for this action!',
    });
    return;
  }
  Item.findByIdAndUpdate(req.params.id, { archived: false }).then(
    (resFromRestore) => {
      res.json({
        success: true,
        msg: 'everything worked!',
      });
    }
  );
});
module.exports = router;
