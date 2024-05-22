import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

const services = [
  { name: "shop", port: 3001 },
  { name: "auth", port: 3002 },
  { name: "payments", port: 3003 },
];

for (const service of services) {
  app.use(
    `/api/${service.name}`,
    // @ts-ignore
    createProxyMiddleware({
      target: `http://localhost:${service.port}/`,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
    }),
  );
}

app.all("*", (req, res) => {
  res.status(404).send({
    errors: [{ message: "Not found" }],
  });
});

app.use((err, req, res, next) => {
  console.error("Error: ", err);

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
});

app.listen(PORT, () => {
  console.info(`Gateway server is running on port ${PORT}`);
});
