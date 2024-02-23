import * as http from "http";

type HttpHandler = (p: { body: any }) => Object;

export class CoolServer {
  private port: number;
  private startHasRun: boolean = false;

  private postUrls: { [url: string]: HttpHandler } = {};

  constructor(p: { port: number }) {
    this.port = p.port;
  }

  start() {
    if (this.startHasRun) {
      console.warn("Server has already started");
      return;
    }
    this.startHasRun = true;

    const server = http.createServer((req, res) => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        if (req.method === "POST") {
          if (this.postUrls[req.url]) {
            let body: any = {};
            try {
              body = JSON.parse(data);
            } catch (e) {}

            const ro = this.postUrls[req.url]({ body });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(ro));
          } else {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "URL not registered" }));
          }
        } else {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Method Not Allowed" }));
        }
      });
    });

    server.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }

  registerPost(p: { url: string; fn: HttpHandler }) {
    this.postUrls[p.url] = p.fn;
  }
}
