CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`org` text,
	`project` text,
	`onboarded` integer DEFAULT false
);
