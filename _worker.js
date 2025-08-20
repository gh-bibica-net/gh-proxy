export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        
        // Proxy tất cả requests đến GitHub
        if (url.pathname !== '/') {
            // Tạo URL đích
            let targetUrl = new URL(`https://github.com/bibicadotnet/microsoft-edge-multi-portable/releases/download/${url.pathname}${url.search}`);
            
            // Tạo request mới với headers gốc
            let newRequest = new Request(targetUrl, {
                method: request.method,
                headers: request.headers,
                body: request.body
            });
            
            return fetch(newRequest);
        }
        
        // Serve static assets cho root path
        return env.ASSETS.fetch(request);
    }
};
