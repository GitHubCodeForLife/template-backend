// Importing node modules
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import passport from "passport";
import cors from "cors";

// routes
import routes from "../routes/main.routes";
import orderRouter from "./OrderBC/OrderRouter";
import commentsRouter from "./CommentBC/CommentRouter";
import productRouter from "./ProductCategoryBC/productRouter";
import categoryRouter from "./ProductCategoryBC/categoryRouter";
import storeRouter from "./StoreBC/storeRouter";
import cartRouter from "./Cart/CartRouter";

import connectDB from "../../config/MongoDBConfig";

// set up cors
const whitelist = [process.env.URL_FRONT_END, process.env.URL_WEB];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
// consts
const app = express();

// Connect DB
connectDB();

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize());

app.use("/", routes);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/comment", commentsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/store", storeRouter);
app.use("/api/cart", cartRouter);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  // destructuring
  const { address, port: currentport } = server.address();
  // string interpolation:
  console.log(`Product service listening at http://${address}:${currentport}`);
});

export default app;
