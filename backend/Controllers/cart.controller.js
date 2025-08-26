const Cart = require("../Models/cart.model");
const Product = require("../Models/product.model");


(async () => {
  try {
    await Cart.collection.dropIndex("user_1");
    console.log("Index user_1 dropped");
  } catch (err) {
    console.log("No index user_1 found:", err.message);
  }
})();

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, quantity, size } = req.body;

    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({ message: "Quantity must be between 1 and 10" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [], totalPrice: 0 });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity > 10) {
        return res.status(400).json({ message: "Max 10 items per product" });
      }
    } else {
      cart.items.push({
        productId,
        name,
        size,
        quantity,
        price
      });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};



exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId, size , quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );
    if (!existingItem) return res.status(404).json({ message: "Item not found in cart" });

    if(quantity>1){
      cart.items = cart.items.map((item)=>{
        if(item.productId.toString() === productId && item.size === size){
          item.quantity= item.quantity-1 ;
        }
        return item ;
      })
    }else{
      cart.items = cart.items.filter(
        (item) => !(item.productId.toString() === productId && item.size === size)
      );
    }

    

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};


exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });

  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};