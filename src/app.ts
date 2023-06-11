import express from "express";
import path from "path";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import mysql from "mysql2";
import connection from "./DBconnect";
import { error } from "console";

const app = express();
const port = 2080;

const saltRounds: number = 10;

// exprss 미들웨어 설정
app.use(express.static(path.join(__dirname, "../")));
app.use(bodyParser.urlencoded({ extended: false }));

connection.connect((err) => {
  if (err) {
    console.error("DB연결에 실패했습니다", err);
    return;
  }
  console.log("DB연결에 성공했습니다");
});

// index.html 페이지
app.get("/", (req, res) => {
  res.type("text/html");
  res.sendFile(__dirname + "/../index.html");
});

app.post("/register", (req, res) => {
  // form 데이터 받아오기
  const { name, email, age, id, password, location, phone } = req.body;

  // 잘 제출됐는지 확인
  console.log("이름:", name);
  console.log("이메일:", email);
  console.log("나이:", age);
  console.log("아이디:", id);
  console.log("패스워드:", password);
  console.log("주소:", location);
  console.log("휴대전화번호:", phone);

  console.log("여기서부터 암호화 시작");

  bcrypt.hash(name, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("암호화된 비밀번호 : " + hash);

    const hashedPassword: string = hash;

    bcrypt.compare(name, hashedPassword, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("암호 일치 여부 :" + result);
    });

    try {
      const query =
        "INSERT INTO user_information (name, email, age, id, password, location, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [name, email, age, id, hashedPassword, location, phone];
      connection.query(query, values);
    } catch (err) {
      console.log(err);
    }
  });

  res.send("회원가입이 완료되었습니다.");
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
