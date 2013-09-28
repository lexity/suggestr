var http = require('http');
var fs = require('fs');

const app_secret = 'cdd5b1aef66a02797bf0b31ca51fdc03';
const app_token = '5df6a052321393b3c2c1870d325e1cdf';
const connection_password = '97745fd17fc4d1db689af49776587e35';

const api_host = "sandbox-api.lexity.com";

const httpPort = 12321;

const path = process.argv[1].split('/').slice(0, -1).join('/') + '/';
const INJECT_CODE = fs.readFileSync(path + "inject.js").toString();

const INNER_HTML = fs.readFileSync(path + "product_view.html").toString();

var products = [];

// The node request/response paradigm listens for response chunks until the
// response is complete. If you don't care about the individual chunks, but want
// to execute code when the response is complete, use this helper method, which
// returns a function to pass as the callback in http.request(options, callback)
function chunkedResponseHelper(cb) {
  return function(response) {
    var response_body = "";
    response.on('data', function (chunk) {
      response_body += chunk;
    });
    response.on('end', function () {
      cb(response_body);
    });
  };
}

var req = http.request({
  hostname: api_host,
  path: '/api/v1/store/dd8a30c4/products.json',
  method: 'GET',
  auth: app_secret + ':' + connection_password,
  headers: {'Content-Type': 'application/json'},
}, chunkedResponseHelper(function(response_body) {
  products = JSON.parse(response_body)['products'];

  console.log('Found ' + products.length + ' products.');

  startServer();
}));

req.on('error', function(e) {
  console.error("Error: ", e.message);
});
req.end();

function startServer() {
  var normal = http.createServer();
  normal.addListener("request", handleRequest);
  normal.listen(httpPort);
  console.log("Server started on port " + httpPort);
}

function handleRequest(req, res) {
  console.log(req.url);
  if (req.url === '/inject.js') {
    res.write(INJECT_CODE);
  } else {
    res.write(getProductDisplay(req.url));
  }
  res.end();
}

function getProductDisplay(current_url) {
  var product = recommendProduct(current_url);

  return INNER_HTML.replace('%pname%', product.title).replace('%img_src%', product.images[0].src);
}

// This is the secret sauce.
function recommendProduct(current_url) {
  return products[0];
}