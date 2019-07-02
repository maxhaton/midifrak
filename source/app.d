import vibe.vibe;

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 80;
	settings.bindAddresses = ["::1", "127.0.0.1"];

	auto route = new URLRouter; 

	route.get("/", &hello);
	route.get("/newdesign", &startNew);
	route.get("/jsontester/:input/:number", &jsonTest);
	route.get("*", serveStaticFiles("public/"));


	listenHTTP(settings, route);
	
	logInfo("Please open http://127.0.0.1:8080/ in your browser.");
	runApplication();
}
void jsonTest(HTTPServerRequest req, HTTPServerResponse res)
{
	import std.conv;
	struct output {
		string input;
		int wah;
	}
	logInfo(req.params["input"]);
	res.writePrettyJsonBody(output(req.params["input"], req.params["number"].to!int));
}
void startNew(HTTPServerRequest req, HTTPServerResponse res)
{
	res.render!("newdesign.dt");
}
void hello(HTTPServerRequest req, HTTPServerResponse res)	
{
	res.render!("index.dt", req);
}
