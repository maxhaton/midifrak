import vibe.vibe;

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 8080;
	settings.bindAddresses = ["::1", "127.0.0.1"];

	auto route = new URLRouter; 

	route.get("/", &hello);
	route.get("*", serveStaticFiles("public/"));


	listenHTTP(settings, route);
	
	logInfo("Please open http://127.0.0.1:8080/ in your browser.");
	runApplication();
}

void hello(HTTPServerRequest req, HTTPServerResponse res)	
{
	res.render!("index.dt", req);
}
