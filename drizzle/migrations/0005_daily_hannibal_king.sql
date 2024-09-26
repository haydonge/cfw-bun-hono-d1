CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_content` text NOT NULL,
	`applicant` text NOT NULL,
	`apply_date` text NOT NULL,
	`due_date` text NOT NULL,
	`duration` integer NOT NULL,
	`responsible` text NOT NULL,
	`is_completed` integer DEFAULT 0,
	`start` text NOT NULL,
	`end` text NOT NULL,
	`status` text DEFAULT 'assigned'
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`content` text(255) NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`applicant` text NOT NULL,
	`apply_date` text NOT NULL,
	`due_date` text NOT NULL,
	`duration` integer NOT NULL
);
