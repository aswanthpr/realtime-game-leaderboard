declare namespace NodeJS {
    interface ProcessEnv {
    MONGO_URL :string
    PORT: string;
    NODE_ENV:string
    REDIS_HOST:string
    REDIS_PORT:string
}
}