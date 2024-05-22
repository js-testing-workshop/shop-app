import express from "express";
// This library allows us to change express's default behaviuor of handling 'async' errors
// Instead of writing 'next(err)' we can directly 'throw' an error even inside 'async' function
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";
import { errorHandler } from "common";
import { NotFoundError } from "common";
import { createPaymentRouter } from "./routes";
import { paymentStatusRouter } from "./routes/payment-status";
import { ordersRouter } from "./routes/orders";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // disable secure cookies (transmitted only over https) for test environment
    secure: process.env.NODE_ENV === "production",
  }),
);

app.use("/api", createPaymentRouter);
app.use("/api", paymentStatusRouter);
app.use("/api", ordersRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
