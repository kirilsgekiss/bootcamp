$.import("custom", "type");
var sType = $.request.parameters.get("type");

var sOutput = "" +
	"<html>" +
	"<head>" +
	"<title>Hello, World!</title>" +
	"</head>" +
	"<body>" +
	"<h1>Hello, World!</h1>" +
	"<p>Current server time: " + Date() + "</p>" +
	"<p>Current user: " + $.session.getUsername() + "</p>" +
	"</body>" +
	"</html>";
try {
	var sContentType = $.custom.type.getType(sType);
	$.response.contentType = sContentType;
} catch (err) {
	sOutput = "Failed to execute action: " + err.toString();
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
$.response.setBody(sOutput);