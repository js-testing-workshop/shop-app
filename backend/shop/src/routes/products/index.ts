import express, { Request, Response } from "express";
import { body } from "express-validator";
import productsRepo from "./repo";
import { requireAuth } from "common";
import { validateRequest } from "common";

const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
  const { query } = req;
  const { products, totalCount } = await productsRepo.getData(query);

  res.set("X-Total-Count", totalCount);
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.send(products);
});

router.post(
  "/products",
  requireAuth,
  [
    // NOTE: 85000 - yes, is's a magic number
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("price")
      .isInt({ min: 0, max: 85000 })
      .withMessage("Price must be a number between 0 and 85000"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("rating")
      .isInt({ min: 0, max: 5 })
      .withMessage("Rating must be a number between 0 and 5"),
    body("category").notEmpty().withMessage("Category is required"),
    body("images")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one image is required"),
  ],
  validateRequest,
  async (req: any, res: any) => {
    const { body } = req;
    const result = await productsRepo.createProduct(body);

    res.send(result);
  }
);

export { router as productsRouter };
