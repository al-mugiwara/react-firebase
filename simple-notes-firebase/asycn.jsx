import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const Login = () => {
  const [text, setText] = useState("TextDisini");

  // function callFirstBane(callBack) {
  //   setTimeout(() => {
  //     callBack("Text");
  //   }, 2000);
  // }

  // function callLastName(callback2) {
  //   setTimeout(() => {
  //     callback2("Hei");
  //   }, 2000);
  // }
  // const klik = () => {
  //   callFirstBane((result) => {
  //     const first = result;
  //     callLastName((result2) => {
  //       const last = result2;
  //       const name = first + last;
  //       setText(name);
  //     });
  //     //
  //   });
  //   //
  // };

  function callFirstBane() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Pk");
      }, 2000);
    });
  }

  // function callLastName(first) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(first + "Hulk");
  //     }, 2000);
  //   });
  // }
  // const klik = () => {
  //   callFirstBane()
  //     .then((result) => {
  //       return callLastName(result);
  //     })
  //     .then((result2) => {
  //       setText(result2);
  //     });
  // };
  function callLastName() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hulk");
      }, 2000);
    });
  }

  // const klik = () => {
  //   Promise.all([callFirstBane(), callLastName()]).then(([result, result2]) => {
  //     setText(result + result2);
  //   });
  // };

  const klik = async () => {
    const first = await callFirstBane();
    const second = await callLastName();
    const name = first + second;
    setText(name);
  };

  return (
    <div className="App">
      <button onClick={klik}>Login</button>
      <div></div>
      <h2>{text}</h2>
    </div>
  );
};

root.render(
  <StrictMode>
    <Login />
  </StrictMode>
);
