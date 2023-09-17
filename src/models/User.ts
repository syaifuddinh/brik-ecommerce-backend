import { CategoryListInterface } from "../interfaces/CategoryInterface";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

var Connector = require("../config/connector.ts")

module.exports = class User {
    #table = "mt_user";
    #list: CategoryListInterface[] = <CategoryListInterface[]> [];

    async logout(token: string) {
        const conn = new Connector();
        const { id } = await this.findByToken(token);
        if(!id)  throw "err";
        const query = `UPDATE mt_user SET token = null WHERE id = '${id}'`;
        await conn.execute(query);

    }

    async getIsAuthed(tokenType: string, token: string): Promise<boolean> {
        if(tokenType !== "Bearer") return false;
        const data = await this.findByToken(token);
        return !!data

    }

    async validateCredential(username: string, password: string) {
        await this.validateUsernameIsExist(username, false);
        const data = await this.findByUsername(username);
        const passwordIsValid = bcrypt.compareSync(
            password,
            data.password
        );
        if(passwordIsValid === false) throw "Credential doesn't valid";
    }

    async findByToken(token: string) {
        const conn = new Connector();
        const query = `SELECT id, fullname, username, password FROM mt_user WHERE token = '${token}' AND expiredat > NOW()`;
        const { result } = await conn.getOne(query);

        return result;
    }


    async findByUsername(username: string) {
        const conn = new Connector();
        const query = `SELECT fullname, username, password FROM mt_user WHERE username = '${username}'`;
        const { result } = await conn.getOne(query);

        return result;
    }

    generateToken(): string {
          // Generate a random token using a cryptographically secure random number generator
          const token = crypto.randomBytes(32).toString('hex');
          return token;
    }

    async getAndSetCredential(username: string) {
        let token: string = this.generateToken();
        const expiredat = "CURRENT_TIMESTAMP + INTERVAL '5 days'";
        const conn = new Connector();
        const query = `UPDATE mt_user SET token = '${token}', expiredat = ${expiredat} WHERE username = '${username}'`;
        await conn.execute(query);

        return { token };
    }

    async login(username: string, password: string) {
        await this.validateCredential(username, password)
        const { token } = await this.getAndSetCredential(username)
        const { fullname } = await this.findByUsername(username);
        const payload = { fullname, token };

        return payload;
    }

    async store(fullname: string, username: string, password: string) {
        await this.validateUsernameIsExist(username, true);
        const conn = new Connector();
        const encryptedPassword = bcrypt.hashSync(password, 18);
        const query = `INSERT INTO mt_user (fullname, username, password) VALUES ('${fullname}', '${username}', '${encryptedPassword}')`;
        await conn.execute(query);
    }

    async validateUsernameIsExist(username: string, isErrorWhenExists: boolean) {
        const conn = new Connector();
        const query = `SELECT COUNT(id) AS count FROM mt_user WHERE username = '${username}'`;
        const { result } = await conn.getOne(query);
        if(isErrorWhenExists === true && result.count > 0) throw "Username is already exists"; 
        else if(isErrorWhenExists === false && result.count === 0) throw "Username is not exists"; 
    }
}