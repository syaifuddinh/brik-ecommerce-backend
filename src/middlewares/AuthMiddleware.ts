var User = require("../models/User.ts");

module.exports = new class AuthMiddleware {
    async Validate(req: any, res: any, next: any) {
        console.log("validate")

        const fail = () => {
            // res.status(401).send({ message: "Unauthorized" });
            res.send({ message: "Unauthorized" });
            throw "error";
        }


        try {
            const authorization = req.headers.authorization;
            if(!authorization) fail(); 
            else {
                if(!authorization.split) fail()
                else {
                    const [ tokenType, token ] = authorization.split(" ") as string[];
                    console.log({token})
                    try {
                        const user = new User();
                        const isAuth = await user.getIsAuthed(tokenType, token);
                        if(isAuth === false) fail();
                    } catch(e) {
                        // return res.status(500).send({message: e})
                        return res.send({message: e})
                    }
                }
            }

            next()
        } catch {

        }

    }
}