const http = require("http");

const hostname = "127.0.0.1";
const port = 3005;

const server = http.createServer((req, res) => {
  let body: any = [];
  console.log("Method", req.method);
  console.log("Headers:", req.headers);

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("Body:", body);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello World\n");
    });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
