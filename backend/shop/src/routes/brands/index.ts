import express, { Request, Response } from "express";

import { db } from "common";

const router = express.Router();

router.get("/brands", async (req: Request, res: Response) => {
  // TODO: use brands repo
  const brands = await db.read("brands");

  res.send(brands);
});

export { router as brandsRouter };
