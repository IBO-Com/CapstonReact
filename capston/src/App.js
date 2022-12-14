import React, { useEffect, useState } from "react";
import Login from "./login";
import Empinfo from "./empinfo";
import Findpw from "./login/findpw";
import MainNav from "./mainNav";
import Changepw from "./login/changepw";

import {
  BrowserRouter,
  HashRouter,
  Route,
  Router,
  Routes,
} from "react-router-dom";
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
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        {isLogin ? (
          <>
            {/* 비밀번호 찾기 */}
            <Route path="/findpw/" element={<Findpw />} />

            {/* 비밀번호 변경 */}
            <Route path="/changepw/" element={<Changepw />} />

            {/* 네비게이션으로 이동 */}
            <Route path="/mainNav/*" element={<MainNav />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </HashRouter>
    //<Empinfo />
  );
};

export default App;
