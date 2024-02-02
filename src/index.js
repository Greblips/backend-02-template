const http = require("http");
const getUsers = require("./modules/users");

const PORT = 3003;
const HOST = "http://127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, HOST);
  const userName = url.searchParams.get("hello");

  if (request.url === "/") {
    response.statusMessage = "OK";
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("hello world");
    return;
  } else if (userName) {
    response.statusMessage = "OK";
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`"Hello, ${userName}"`);
    return;
  } else if (request.url === "/?hello=") {
    response.statusMessage = "Bad Request";
    response.setHeader("Content-Type", "text/plain");
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Введите имя");
    return;
  } else if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.writeHead(200, "Content-Type: application/json");
    response.end(getUsers);

    return;
  }

  response.status = 500;
  response.end();
  return;
});

server.listen(PORT, () => {
  console.log(`Сервер доступен по адресу: ${HOST}:${PORT}`);
});

// Написать обработчик запроса:
// - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
// - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
// - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
// - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
// - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
