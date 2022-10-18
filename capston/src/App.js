import React, { useEffect, useState } from "react";
import Login from "./login";
import Empinfo from "./empinfo";
import Findpw from "./login/findpw";
import MainNav from "./mainNav";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
//import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import * as Cookie from "./cookies/cookies";

const App = () => {
  //로그인 관련 트리거

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (Cookie.getCookie("loginInfo") == undefined) return;
    if (Object.keys(Cookie.getCookie("loginInfo")).length > 0) {
      //쿠키 정보가 있다면
      setIsLogin(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        {isLogin ? (
          <>
            {/* 비밀번호 찾기 */}
            <Route path="/findpw/" element={<Findpw />} />

            {/* 네비게이션으로 이동 */}
            <Route path="/mainNav/*" element={<MainNav />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    //<Empinfo />
  );
};

export default App;
