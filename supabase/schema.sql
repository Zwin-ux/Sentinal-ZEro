-- Table for chat logs
create table if not exists chat_logs (
    id serial primary key,
    prompt text not null,
    response text not null,
    latency float,
    status text,
    timestamp bigint
);

-- Table for evaluation results (optional, for automated evals)
create table if not exists evaluation_results (
    id serial primary key,
    prompt text not null,
    response text not null,
    metric text,
    score float,
    timestamp bigint
);
