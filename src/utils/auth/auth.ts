import bcrypt from 'bcrypt';
import {serverConfig}  from '../../configs/server.config';

const {SALT} = serverConfig;

export async function hashPassword (password: string): Promise<string> {
    try {
        const hashed = await bcrypt.hash(password, SALT);
        return hashed;
    } catch (error) {
        throw error;
    }   
};