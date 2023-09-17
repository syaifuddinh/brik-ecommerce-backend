import { ProductInterface } from "./interfaces/ProductInterface";
import { StoringProductAPIInterface } from "./interfaces/ProductInterface";
import path from "path";

const express = require('express');
const multer = require('multer');
var dotenv = require('dotenv');
const bodyParser = require('body-parser');
var CategoryController = require("./controllers/CategoryController.ts");
var ProductController = require("./controllers/ProductController.ts");
var AuthController = require("./controllers/AuthController.ts");
var AuthMiddleware = require("./middlewares/AuthMiddleware.ts");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/images', express.static('storage'));

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'storage/'); // Set the storage folder
  },
  filename: (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });


const allowCrossDomain = (req: any, res: any, next: any) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
  res.setHeader(`Access-Control-Allow-Headers`, `*`);
  next();
};

app.use(allowCrossDomain);

app.use("/product", AuthMiddleware.Validate)
app.use("/category", AuthMiddleware.Validate)

app.post('/auth/register', async (req: any, res: any) => {
    const fullname = req.body.fullname as string;
    const username = req.body.username as string;
    const password = req.body.password as string;
    res.send(
             await AuthController.store(fullname, username, password)
    );
});

app.post('/auth/login', async (req: any, res: any) => {
    const username = req.body.username as string;
    const password = req.body.password as string;
    res.send(
             await AuthController.login(username, password)
    );
});

app.get('/auth/validate', async (req: any, res: any) => {
    const authorization = req.headers.authorization;
    res.send(
             await AuthController.validate(authorization)
    );
});


app.post('/auth/logout', async (req: any, res: any) => {
    const authorization = req.headers.authorization;
    res.send(
             await AuthController.logout(authorization)
    );
});

app.get('/category', async (req: any, res: any) => {
    res.send(
             await CategoryController.get()
    );
});

app.get('/product', async (req: any, res: any) => {
    const { keyword, start, limit } = req.query;
    res.send(
             await ProductController.get(start, limit, keyword)
    );
});

app.get('/product/:id', async (req: any, res: any) => {
    const { id } = req.params;
    res.send(
            await ProductController.show(id)
    );
});

app.post('/product', upload.single("thumbnail"), async (req: any, res: any) => {
    const query =  <StoringProductAPIInterface> req.body;
    query.thumbnail = req.file;
    res.send(
            await ProductController.store(query)
    );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});