import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
    SALT :number
    JWT_SECRET : string
    JWT_EXPRIRES_IN : string
    ENVIRONMENT : boolean
}

type DBConfig = {
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
}

type FrontendConfig= {
    FRONTEND_URL: string
}

dotenv.config();

export const serverConfig: ServerConfig =  {
    PORT: Number(process.env.PORT) || 3000,
    SALT : Number(process.env.SALT),
    JWT_SECRET : String(process.env.JWT_SECRET),
    JWT_EXPRIRES_IN : String(process.env.JWT_EXPRIRES_IN),
    ENVIRONMENT : Boolean(process.env.DEV_ENVIRONMENT)
};

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'test_db'
};

export const frontendConfig: FrontendConfig = {
    FRONTEND_URL: String(process.env.FRONTEND_URL)
};