import express, { Request, Response } from "express";
import Stripe from "stripe";
import { requireAuth } from "common";

const router = express.Router();
const stripe = new Stripe(`${process.env.STRIPE_KEY}`);

router.get(
  "/payments/orders",
  requireAuth,
  async (req: Request, res: Response) => {
    const { data } = await stripe.checkout.sessions.list({
      customer_details: { email: req.currentUser!.email },
      status: "complete",
    });

    const orders = data.map((order) => ({
      status: order.status,
      created: order.created,
      products: Object.values(order.metadata || {}).map((product) =>
        JSON.parse(product),
      ),
    }));

    res.send(orders);
  },
);

export { router as ordersRouter };
