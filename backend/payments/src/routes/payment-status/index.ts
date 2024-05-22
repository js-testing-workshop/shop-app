import express, { Request, Response } from "express";
import Stripe from "stripe";
import TypedRequest from "../../interfaces/typed-request";
import { requireAuth } from "common";

const router = express.Router();
const stripe = new Stripe(`${process.env.STRIPE_KEY}`);

router.get(
  "/payments/payment-status",
  requireAuth,
  async (req: TypedRequest<{ session_id: string }, any>, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details!.email,
    });
  }
);

export { router as paymentStatusRouter };
