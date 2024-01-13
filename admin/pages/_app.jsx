import React, { useEffect, useState } from "react";
import LayoutMain from "@/components/layouts/LayoutMain";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Spin, message, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CreateContext } from "@/context/ContextProviderGlobal";
const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState(null);
  useEffect(() => {
    router.events.on("routeChangeStart", loadingStart);
    router.events.on("routeChangeComplete", loadingEnd);
    router.events.on("routeChangeError", loadingEnd);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingEnd);
      router.events.off("routeChangeError", loadingEnd);
    };
  }, [router, router.events]);

  useEffect(()=>{
    if(localStorage.getItem("user")) {
      setUserData(localStorage.getItem("user"))
    }
  }, [])

  useEffect(()=>{
    if(user) {
      router.push('/')
    }
  }, [user])

  const loadingStart = () => {
    setLoading(true);
  };
  const successNoti = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const setUserData = (data) => {
    setUser(data);
  };

  const errorNoti = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const loadingEnd = () => {
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token_admin");
    setUser(null);
    router.push("/login");
  };
  const data = {
    user,
    successNoti,
    logout,
    errorNoti,
    setUserData
  };
  const getLayout =
    Component.getLayout || ((page) => <LayoutMain>{page}</LayoutMain>);
  return (
    <CreateContext.Provider value={data}>
      {contextHolder}
      <Spin spinning={loading} indicator={antIcon}>
        {getLayout(<Component {...pageProps} />)}
      </Spin>
    </CreateContext.Provider>
  );
}

export default MyApp;
