// const http = require("http");
// const url = require('url');
// const axios = require('axios');
// const estraFucti = require("./modulos/ExtraFunction.js")
// const server = http.createServer((req, res) => {
//   const { query, pathname } = url.parse(req.url, true);
//   const response = {
//     success: true,
//     message: "API Working",
//   };


//   res.writeHead(200, {
//     "Content-type": "application/json",
//   });
//   console.log('test',query, pathname);
//   res.end(JSON.stringify(response));
  
// });

// server.listen(3030, "127.0.0.1", () => {
//   console.log("Listening to requests on port 3030"+process.env.URL);
//   estraFucti();
// });

// console.log("after server");


const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;


//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});





// const prodcts = JSON.parse(fs.readFileSync(`${__dirname}/data/products.js`)) 
// console.log(prodcts);

// app.get("/api/v1/products", (req,res)=>{
//     res.status(200).json({
//         status:"success",
        
//         data:{
//             prodcts
//         }
//     })
// })

const getAllProducts = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/data/products.json`)
    );
  
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: products.length,
      data: {
        products,
      },
    });
  };

// app.post("/api/v1/products", (req, res) => {
//     const products = JSON.parse(
//       fs.readFileSync(`${__dirname}/data/products.js`)
//     );
//     products.push(req.body);
//     fs.writeFileSync(`${__dirname}/data/products.js`, JSON.stringify(products));
  
//     res.status(200).json({
//       status: "success",
//       data: {
//         products,
//       },
//     });
//   });


const addProduct = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/data/products.json`)
    );
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
  
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  };


const getProductById = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/data/products.js`)
    );
  
    const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
      res.status(200).json({
        status: "success",
        data: {
          product: foundProduct,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  };


//routes
// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", addProduct);
app.get("/api/v1/products/:id", getProductById);


const productRouter = express.Router();
app.use("/api/v1/products/", productRouter);

//routes
productRouter.route("/").get(getAllProducts).post(addProduct);
productRouter.route("/:id").get(getProductById);


app.listen(port, ()=>{
    console.log(`App running on port : ${port}`);
});