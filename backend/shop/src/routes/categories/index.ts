import express, { Request, Response } from "express";
import { db } from "common";

const router = express.Router();

router.get("/categories", async (req: Request, res: Response) => {
  // TODO: use categories repo
  const categories = await db.read("categories");

  res.send(categories);
});

export { router as categoriesRouter };
