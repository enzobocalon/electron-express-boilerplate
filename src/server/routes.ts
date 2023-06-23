import { Router } from "express";
import { prisma } from "./lib/prisma";

export const router = Router();

router.get('/', async (_, res) => {
  const posts = await prisma.posts.findMany();
  res.send(posts);
})

router.post('/', async (req, res) => {
  const {title, content, userId} = req.body;
  const post = await prisma.posts.create({
    data: {
      content,
      title,
      userId,
    }
  })

  res.send(post)
})