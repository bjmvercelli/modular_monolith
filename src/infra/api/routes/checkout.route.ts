import { Router } from "express";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", (req, res) => {
  res.status(200).send("Checkout route");
});