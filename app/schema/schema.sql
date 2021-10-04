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
task_id int not null,
tasklist_id int not null,
primary key(task_id, tasklist_id),
foreign key(task_id) references task (id) on delete cascade,
foreign key(tasklist_id) references tasklist(id) on delete cascade
);
