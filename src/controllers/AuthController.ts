"use strict";


var ResponseConstructor = require("../response.ts");
var User = require("../models/User.ts");
module.exports = new class AuthController {
    async store(fullname: string, username: string, password: string) {
        try {
            const user = new User(); 
            await user.store(fullname, username, password)
            return new ResponseConstructor({ });
        } catch(e) {
            const r = new ResponseConstructor({})
            return r.failure(e);
        }
    }
    async login(username: string, password: string) {
        try {
            const user = new User(); 
            const data = await user.login(username, password)
            return new ResponseConstructor({ data });
        } catch(e) {
            const r = new ResponseConstructor({})
            return r.failure(e);
        }
    }

    async validate(authorization?: string) {
        try {
            if(!authorization) throw "error"; 
            if(!authorization.split) throw "error"
            const [ tokenType, token ] = authorization.split(" ") as string[];
            const user = new User();
            const isAuth = await user.getIsAuthed(tokenType, token);
            if(isAuth === false) throw "error";
            const data = { isAuth: true }
            return new ResponseConstructor({ data });
        } catch(e) {
            const data = { isAuth: false }
            const r = new ResponseConstructor({ data })

            return r;
        }
    }

    async logout(authorization?: string) {
        try {
            if(!authorization) throw "error"; 
            if(!authorization.split) throw "error"
            const [ tokenType, token ] = authorization.split(" ") as string[];
            const user = new User();
            await user.logout(token);
            return new ResponseConstructor({ data: null });
        } catch(e) {
            const r = new ResponseConstructor({})

            return r.failure(e);
        }
    }
};
