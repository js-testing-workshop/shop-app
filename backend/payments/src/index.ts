import app from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.STRIPE_KEY) {
    throw new Error("STRIPE_KEY must be defined");
  }

  process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
  });

  app.listen(process.env.PORT, () => {
    console.log(`Payment Service: Listening on port ${process.env.PORT}`);
  });
};

start();
