import http, { IncomingMessage, ServerResponse } from "http";

const PORT = 4000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

    // Route 1: GET /
    if (url === "/" && method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Hello Night!");
    }

    // Route 2: GET /status
    else if (url === "/status" && method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });

      const response = {
        status: "OK",
        time: new Date().toISOString(),
      };

      res.end(JSON.stringify(response));
    }

    // Route 3: 404 for everything else
    else {
      res.writeHead(404, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          error: "Not Found",
        }),
      );
    }
  },
);

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
