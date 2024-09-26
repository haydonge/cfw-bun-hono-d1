import { Hono } from 'hono';
import { cors } from 'hono/cors';

export type Env = {
  DB: D1Database;
}
const app = new Hono<{Bindings: Env}>()

app.use('*', cors({
  origin: '*', // 允许所有来源
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))
//tasks api

// 读取所有任务 (Read All)
app.get('/tasks', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM tasks").all();
  return c.json(results);
})

app.get('/tasks/:id', async (c) => {
  const id = c.req.param('id');
  const { results } = await c.env.DB.prepare("SELECT * FROM tasks WHERE id = ?").bind(id).all();
  if (results.length === 0) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(results[0]);
})

// 创建新任务 (Create)

app.post('/tasks', async (c) => {
  const body = await c.req.json();
  const { content, applicant, apply_date, due_date, duration } = body;
  
  const { success } = await c.env.DB.prepare(
    "INSERT INTO tasks (content, applicant, apply_date, due_date, duration) VALUES (?, ?, ?, ?, ?)"
  ).bind(content, applicant, apply_date, due_date, duration).run();
  if (success) {
    return c.json({ message: "Task created successfully" }, 201);
  }
  return c.json({ error: "Failed to create task" }, 500);
})




app.put('/tasks/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { content, applicant, apply_date, due_date, duration } = body;
  const { success } = await c.env.DB.prepare(
    "UPDATE tasks SET content = ?, applicant = ?, apply_date = ?, due_date = ?, duration = ? WHERE id = ?"
  ).bind(content, applicant, apply_date, due_date, duration, id).run();
  if (success) {
    return c.json({ message: "Task updated successfully" });
  }
  return c.json({ error: "Failed to update task" }, 500);
})


app.delete('/tasks/:id', async (c) => {
  const id = c.req.param('id');
  const { success } = await c.env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
  if (success) {
    return c.json({ message: "Task deleted successfully" });
  }
  return c.json({ error: "Failed to delete task" }, 500);
})


//   帖子， POST

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




// 事件， EVENT
app.get('/events', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM events").all();
  return c.json(results);
})

// Read one event
app.get('/events/:id', async (c) => {
  const id = c.req.param('id');
  const { results } = await c.env.DB.prepare("SELECT * FROM events WHERE id = ?").bind(id).all();
  if (results.length === 0) {
    return c.json({ error: "Event not found" }, 404);
  }
  return c.json(results[0]);
})

// Create a new event
app.post('/events', async (c) => {
  const body = await c.req.json();
  const { content, applicant, applydate, duedate, duration, responsible, start, end } = body;
  const { success } = await c.env.DB.prepare(
    "INSERT INTO events (content, applicant, apply_date, due_date, duration, responsible, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(content, applicant, applydate, duedate, duration, responsible, start, end).run();
  if (success) {
    return c.json({ message: "Event created successfully" }, 201);
  }
  return c.json({ error: "Failed to create event" }, 500);
})



// Update an event 更新事件
app.put('/events/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { task_content, applicant, apply_date, due_date, duration, responsible, is_completed, start, end, status } = body;
  const { success } = await c.env.DB.prepare(
    "UPDATE events SET task_content = ?, applicant = ?, apply_date = ?, due_date = ?, duration = ?, responsible = ?, is_completed = ?, start = ?, end = ?, status = ? WHERE id = ?"
  ).bind(task_content, applicant, apply_date, due_date, duration, responsible, is_completed, start, end, status, id).run();
  if (success) {
    return c.json({ message: "Event updated successfully" });
  }
  return c.json({ error: "Failed to update event" }, 500);
})


// Delete an event
app.delete('/events/:id', async (c) => {
  const id = c.req.param('id');
  const { success } = await c.env.DB.prepare("DELETE FROM events WHERE id = ?").bind(id).run();
  if (success) {
    return c.json({ message: "Event deleted successfully" });
  }
  return c.json({ error: "Failed to delete event" }, 500);
})




// Move task from tasks to events (assign)
//是否有必要做成API?
// 将任务从 tasks 移动到 events（分配）

// 将任务从 tasks 移动到 events（分配）
app.post('/assign/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { responsible, start, end } = body;

  // 验证必要的参数
  if (!responsible || !start || !end) {
    return c.json({ error: "缺少必要的参数：responsible, start, end" }, 400);
  }

  // 获取任务
  const { results } = await c.env.DB.prepare("SELECT * FROM tasks WHERE id = ?").bind(id).all();
  if (results.length === 0) {
    return c.json({ error: "任务未找到" }, 404);
  }
  const task = results[0];

  try {
    // 插入到 events 表
    const insertResult = await c.env.DB.prepare(`
      INSERT INTO events (
        tasK_content, applicant, apply_date, due_date, duration, 
        responsible, start, end, status, is_completed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      task.content,
      task.applicant,
      task.apply_date,
      task.due_date,
      task.duration,
      responsible,
      start,
      end,
      'assigned',
      0  // is_completed 默认为 0 (false)
    ).run();

    if (!insertResult.success) {
      throw new Error("插入 events 失败");
    }

    // 从 tasks 表删除
    const deleteResult = await c.env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();

    if (!deleteResult.success) {
      // 如果删除失败，我们需要回滚插入操作
      await c.env.DB.prepare("DELETE FROM events WHERE id = ?").bind(insertResult.meta.last_row_id).run();
      throw new Error("从 tasks 删除失败");
    }

    return c.json({ message: "任务分配成功", eventId: insertResult.meta.last_row_id });
  } catch (error) {
    console.error("分配任务时出错:", error);
    return c.json({ error: "分配任务失败" }, 500);
  }
});




// 将事件从 events 移回 tasks（返回）
app.post('/return/:id', async (c) => {
  const id = c.req.param('id');

  // 获取事件
  const { results } = await c.env.DB.prepare("SELECT * FROM events WHERE id = ?").bind(id).all();
  if (results.length === 0) {
    return c.json({ error: "事件未找到" }, 404);
  }
  const event = results[0];

  try {
    // 插入到 tasks 表
    const insertResult = await c.env.DB.prepare(
      "INSERT INTO tasks (content, applicant, apply_date, due_date, duration) VALUES (?, ?, ?, ?, ?)"
    ).bind(event.task_content, event.applicant, event.apply_date, event.due_date, event.duration).run();

    if (!insertResult.success) {
      throw new Error("插入 tasks 失败");
    }

    // 从 events 表删除
    const deleteResult = await c.env.DB.prepare("DELETE FROM events WHERE id = ?").bind(id).run();

    if (!deleteResult.success) {
      // 如果删除失败，我们需要回滚插入操作
      await c.env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(insertResult.meta.last_row_id).run();
      throw new Error("从 events 删除失败");
    }

    return c.json({ message: "事件成功返回到任务" });
  } catch (error) {
    console.error("返回事件到任务时出错:", error);
    return c.json({ error: "返回事件到任务失败" }, 500);
  }
});

export default app

//需要修改.
