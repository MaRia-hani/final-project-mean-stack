const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart.controller');
const { authMW } = require("../Util/auth");

router.post("/addtocart", authMW, cartController.addToCart);

router.post("/removefromcart", authMW, cartController.removeFromCart);


router.get("/:id", authMW, cartController.getCart);


router.delete("/clearcart", authMW, cartController.clearCart);

module.exports = router;