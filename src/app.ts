import express from "express";
import path from "path";

const app = express();

const port = 2080;

app.use(express.static(path.join(__dirname, "../")));

// index.html 페이지
app.get("/", (req, res) => {
  res.type("text/html");
  res.sendFile(__dirname + "/../index.html");
});

// 404 페이지 작성
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행중입니다`);
});
