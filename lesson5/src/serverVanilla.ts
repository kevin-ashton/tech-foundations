import * as http from "http";

let todoLists: { id: string; text: string; toggled: boolean }[] = [];

const server = http.createServer((req, res) => {
  // Collect data from the request
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  // Respond to the request
  req.on("end", () => {
    // Only respond to POST requests

    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ url: req.url }));
    } else if (req.method === "POST") {
      switch (req.url) {
        case "/list":
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(todoLists));
          break;
        case "/create":
          const newItem = JSON.parse(data);
          todoLists.push(newItem);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
          break;
        case "/toggle":
          const t1 = JSON.parse(data);
          todoLists = todoLists.map((item) => {
            if (t1.id === item.id) {
              return {
                id: item.id,
                text: item.text,
                toggled: !item.toggled,
              };
            } else {
              return item;
            }
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({}));
          break;
        case "/delete":
          const d1 = JSON.parse(data);
          todoLists = todoLists.filter((item) => d1.id !== item.id);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({}));
          break;
        default:
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Not Found" }));
      }
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
