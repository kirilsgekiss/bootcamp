/*$.response.contentType = "text/plain";
var param1 = $.request.parameters.get("param1");
var output = "Hello from " + param1;
$.response.setBody(output);
*/
$.response.contentType = "text/html";
var param1 = $.request.parameters.get("param1");
var output = "Hello from " + param1 + "<br><br>";
var conn = $.db.getConnection();
var pstmt = conn.prepareStatement("SELECT CURRENT_USER FROM DUMMY");
var rs = pstmt.executeQuery();
if (!rs.next()) {
	$.response.setBody("Failed to retrieve data");
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
	output = output + "Response from my SQL. The current user is: " + rs.getString(1);
}
rs.close();
pstmt.close();
conn.close();
$.response.setBody(output);