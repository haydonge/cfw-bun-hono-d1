import {sql } from "drizzle-orm";
import { sqliteTable,text,integer }  from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id",{ mode: 'number'}).primaryKey( { autoIncrement: true } ),
  title: text("title",{length: 255}).notNull(),
  content: text("content",{length: 255}).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
});

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(), //任务内容
  applicant: text('applicant').notNull(), //申请人
  applydate: text('apply_date').notNull(), //申请日期
  duedate: text('due_date').notNull(), //任务截止日期
  duration: integer('duration').notNull(),  //任务持续时间
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('task_content').notNull(),  // 任务内容
  applicant: text('applicant').notNull(),  // 申请人
  applydate: text('apply_date').notNull(),  // 申请日期
  duedate: text('due_date').notNull(),  // 任务截止日期
  duration: integer('duration').notNull(),  // Duration of the task in minutes or hours
  responsible: text('responsible').notNull(),  //任务负责人
  iscompleted: integer('is_completed').default(0),  // 完成状态 (0 = not completed, 1 = completed)
  start: text('start').notNull(),  // 任务开始时间
  end: text('end').notNull(),  // 任务结束时间
  status: text('status').default('assigned'),  // 任务状态, e.g., 'assigned', 'returned'
});

// tasks 作为导入的未完成的任务表， events作为任务管理系统的事件表
// 任何任务都只能存在于一个表中.
// 任务可以进入已分配状态(events表中status为'assigned')，也可以进入已完成状态(events表中status为'returned'), 也可以退回Tasks表中,所有在Tasks表中的任务都可以被重新分配.
