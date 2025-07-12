import { createProxyMiddleware } from "http-proxy-middleware";
import type { Express } from "express";
module.exports = function (app: Express) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        })
    );
};
