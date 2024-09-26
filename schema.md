from

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  taskId: integer('task_id').references(() => tasks.id),
  start: text('start').notNull(),
  end: text('end').notNull(),
});

to:
export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  taskId: integer('task_id').references(() => tasks.id),  // Reference to the original task ID
  taskContent: text('task_content').notNull(),  // Content of the task
  applicant: text('applicant').notNull(),  // Person who applied for the task
  applyDate: text('apply_date').notNull(),  // Date the task was applied for
  dueDate: text('due_date').notNull(),  // Due date of the task
  duration: integer('duration').notNull(),  // Duration of the task in minutes or hours
  responsible: text('responsible').notNull(),  // Person responsible for the task
  isCompleted: integer('is_completed').defaultTo(0),  // Completion status (0 = not completed, 1 = completed)
  start: text('start').notNull(),  // Start time of the task/event
  end: text('end').notNull(),  // End time of the task/event
  status: text('status').defaultTo('assigned'),  // Status of the task, e.g., 'assigned', 'returned'
});




命令行:

bun db:generate

bunx wrangler d1 migrations apply cfw-bun-hono-drizzle-d1 --remote
