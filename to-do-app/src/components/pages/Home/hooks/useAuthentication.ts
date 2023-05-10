import axiosInstance from "../../../../api/axiosinstance";

let body = JSON.stringify({
  username: "admin",
  password: "password",
});

async function getAccessToken() {
  return await axiosInstance.post("/auth/login/", body);
}

const useAuthentication = () => {
  let data = getAccessToken();
  data
    .then((res) => {
      //@ts-ignore
      let token = res.data.accessToken;
      //@ts-ignore
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
    })
    .catch(() => {
      delete axiosInstance.defaults.headers.common["Authorization"];
    });
};

export default useAuthentication;
