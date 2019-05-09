/**
 * @author yfmei
 * 2018/7/6
 */
import axios from "axios/index"

// create an axios instance
const service = axios.create({
  withCredentials: true, // 跨域时携带cookie等认证信息
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    "Content-Type": "multipart/form-data"
    // "Access-Control-Allow-Origin": "http://localhost:8081",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
})

export default service
