import { Application, send } from "@oak/oak";
import { fromFileUrl } from "@std/path";

const clientRoot = fromFileUrl(new URL("../client", import.meta.url));
const app = new Application();

app.use(async (context) => {
    const requestPath =
        context.request.url.pathname === "/" ?
            "/index.html" :
            context.request.url.pathname;
    try {
        await send(context, requestPath, { root: clientRoot });
    }
    catch {
        context.response.status = 404;
    }
});

const port = Number(Deno.args[0] ?? "16732");
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
