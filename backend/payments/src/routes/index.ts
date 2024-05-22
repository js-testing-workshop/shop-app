import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "common";
import Stripe from "stripe";
import Product from "../types/product";

const router = express.Router();
const stripe = new Stripe(`${process.env.STRIPE_KEY}`);

router.post(
  "/payments",
  requireAuth,
  [
    body("products").isArray({ min: 1 }).withMessage("No Products to buy"),
    body("products.*.images")
      .isArray({ min: 1 })
      .withMessage("No Images for the product"),
    body("products.*.title").notEmpty().withMessage("Title is required"),
    body("products.*.rating").notEmpty().withMessage("Rating is required"),
    body("products.*.price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("products.*.category").notEmpty().withMessage("Category is required"),
    body("products.*.brand").notEmpty().withMessage("Brand is required"),
    body("products.*.quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ gt: 0 })
      .withMessage("Quantity should be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let line_items: any = [];
    let metadata: { [name: string]: any } = {};

    req.body.products.forEach((product: Product, i: number) => {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.title,
            images: product.images,
            metadata: {
              rating: product.rating,
              category: product.category,
              brand: product.brand,
            },
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      });

      metadata[`product_${i + 1}`] = JSON.stringify({
        title: product.title,
        images: [product.images[0]],
        price: product.price,
        quantity: product.quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      metadata,
      customer_email: req.currentUser?.email,
      // payment_method_types: ["card", "ideal"],
      ui_mode: "embedded",
      mode: "payment",
      return_url: `${process.env.CLIENT_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  }
);

export { router as createPaymentRouter };
