import { onRequestGet as __api_indexnow_js_onRequestGet } from "/Users/jinwei/Desktop/code/clark-huss-rooms/functions/api/indexnow.js"
import { onRequestPost as __api_indexnow_js_onRequestPost } from "/Users/jinwei/Desktop/code/clark-huss-rooms/functions/api/indexnow.js"
import { onRequestGet as ____path___js_onRequestGet } from "/Users/jinwei/Desktop/code/clark-huss-rooms/functions/[[path]].js"

export const routes = [
    {
      routePath: "/api/indexnow",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_indexnow_js_onRequestGet],
    },
  {
      routePath: "/api/indexnow",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_indexnow_js_onRequestPost],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [____path___js_onRequestGet],
    },
  ]