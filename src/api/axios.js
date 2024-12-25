import axios from "axios";

const instance = axios.create({
  baseURL: "https://go-driver-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;