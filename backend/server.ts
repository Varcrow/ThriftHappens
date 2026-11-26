// Backend server for Thrift Happens online shop

// Imports

import express, { request, type Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import ClothesItem from "./models/clothesItem";

// Consts

const server: Express = express();
const port: Number = 3000;
const { MONGO_URI } = process.env;

// Middleware

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

// Connect to DB and start server

if (!MONGO_URI) {
  throw new Error("Mongo URI is not found in .env file");
}

mongoose
  .connect(MONGO_URI)
  .then(() =>
    server.listen(port, () => {
      console.log(`Connect to DB\nServer is listening on port ${port}`);
    }),
  )
  .catch((error) => console.log(error));

// Routes

// Root
server.get("/", (request, response) => {
  response.send("Server is live.");
});

// GET data api route
server.get("/data", async (request, response) => {
  try {
    const data = await ClothesItem.find();
    response.status(200).send(data);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

// POST route to add clothing article to db
server.post("/data", async (request, response) => {
  const {
    id,
    name,
    image,
    fit,
    category,
    size,
    color,
    description,
    price,
    quantity,
    itemQuantity,
  } = request.body;

  const newArticle = new ClothesItem({
    id,
    name,
    image,
    fit,
    category,
    size,
    color,
    description,
    price,
    quantity,
    itemQuantity,
  });

  try {
    await newArticle.save();
    response
      .status(201)
      .send({ message: `The new item with ${id} has been added successfully` });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

// DELETE route to delete one clothes article by id
server.delete("/data/:id", async (request, response) => {
  const id = Number(request.params.id);

  try {
    await ClothesItem.findOneAndDelete({ id })
    response.status(201).send({ message: `Item with ${id} has been successfully deleted` })
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
})

server.patch("/data/:id", async (request, response) => {
  const id = Number(request.params.id);
  const clothingArticle = request.body;
  console.log(clothingArticle);

  try {
    await ClothesItem.findOneAndUpdate({ id }, { ...clothingArticle });
    response.status(201).send({ message: `Item with ${id} has been successfully updated` })
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
})
