import bcrypt from "bcrypt";

interface Information {
  name: string;
  email: string;
  age: number;
  id: string;
  password: string;
  location: string;
  phone: string;
}

const park: Information = {
  name: "박준형",
  email: "krapli441@gmail.com",
  age: 27,
  id: "krapli441",
  password: "dlrjtdmsqlalfqjsghdlqslek",
  location: "서울특별시 영등포구 의사당대로 1",
  phone: "01097249174",
};

const saltRounds: number = 10;

bcrypt.hash(park.password, saltRounds, (err, hash) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("암호화된 비밀번호 : " + hash);

  const hashedPassword: string = hash;
  bcrypt.compare(park.password, hashedPassword, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("암호 일치 여부 : " + result);
  });
});
