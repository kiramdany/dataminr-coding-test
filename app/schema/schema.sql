create table task
(
id int generated always as identity primary key,
title text,
updated_at timestamptz default current_timestamp,
description text,
completed boolean default FALSE,
"order" int
);

create table tasklist
(
id int generated always as identity primary key,
title text,
updated_at timestamptz default current_timestamp
);

create table task_tasklist
(
task_id int references task (id),
tasklist_id int references tasklist(id)
);
