import { Hono } from 'hono'

export type Env = {
  DB: D1Database;
}

const app = new Hono<{Bindings: Env}>()

// 读取所有帖子 (Read All)
app.get('/posts', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM posts").all();
  return c.json(results);
})

// 读取单个帖子 (Read One)
app.get('/posts/:id', async (c) => {
  const id = c.req.param('id');
  const { results } = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).all();
  if (results.length === 0) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json(results[0]);
})

// 创建新帖子 (Create)
app.post('/posts', async (c) => {
  const body = await c.req.json();
  const { title, content } = body;
  const { success } = await c.env.DB.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").bind(title, content).run();
  if (success) {
    return c.json({ message: "Post created successfully" }, 201);
  }
  return c.json({ error: "Failed to create post" }, 500);
})

// 更新帖子 (Update)
app.put('/posts/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { title, content } = body;
  const { success } = await c.env.DB.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?").bind(title, content, id).run();
  if (success) {
    return c.json({ message: "Post updated successfully" });
  }
  return c.json({ error: "Failed to update post" }, 500);
})

// 删除帖子 (Delete)
app.delete('/posts/:id', async (c) => {
  const id = c.req.param('id');
  const { success } = await c.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  if (success) {
    return c.json({ message: "Post deleted successfully" });
  }
  return c.json({ error: "Failed to delete post" }, 500);
})

export default app