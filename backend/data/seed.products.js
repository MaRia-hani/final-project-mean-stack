const connectDB = require("../Config/db.config");
const Product = require("../Models/product.model"); 
const productsData = require("../data/products (2).json"); 

const insertProducts = async () => {
  try {
    await connectDB();
    await Product.insertMany(productsData);
    console.log("Products inserted successfully.");
    process.exit();
  } catch (error) {
    console.error("Failed to insert products:", error.message);
    process.exit(1);
  }
};

const deleteProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log("All products deleted successfully.");
    process.exit();
  } catch (error) {
    console.error("Failed to delete products:", error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "--insert") {
  insertProducts();
} else if (process.argv[2] === "--delete") {
  deleteProducts();
} else {
  console.log(" Unknown command. Use --insert or --delete");
  process.exit();
}
