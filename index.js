import express from "express";
import { posts } from "./data/posts.js";
const app = express();
const port = 3000;
app.use(express.json());
app.get("/posts", (request, response) => {
  response.json(posts);
});
app.get("/posts/search", (req, res) => {
  const data = posts.filter((post) => post.title.includes(req.query.query));
  if (data) {res.json(data); }
  res.json({
    code: 404,
    message: "post not found",
  });
});

app.post("/posts/add", (req, res) => {
  const data = req.body;
  posts.push({
    id: 9999,
    ...data,
  });

  res.json({
    code: 200,
    message: "success",
  });
});

app.get("/posts/:productId", (request, response) => {
  // posts.forEach
  const data = posts.find((post) => post.id === +request.params.productId);
  if (data) return response.json(data);

  response.json({
    code: 404,
    message: "post not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
