const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
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

exports.addProduct = (req, res) => {

  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
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


exports.UpdateProductById = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    var red = req.body;
    console.log(red)
    const foundProduct = products.find((p) => p.id == req.params.id);
    foundProduct.name = red.name;
    foundProduct.price = red.price;
    foundProduct.category = red.category;

    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

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


  exports.DelProduct = (req, res) => {

    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    var Redt = req.params.id;
    console.log(Redt)
    products.splice(Redt, 1);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  };
