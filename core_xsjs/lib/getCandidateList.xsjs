function downloadCandidateCSV(){
	var vLimit = $.request.parameters.get("limit");
	if (isNaN(parseInt(vLimit, 10)) || vLimit < 0) {
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.contentType = "text/json";
		var oResponse = {
			message: "The Parameter 'limit' must be set!"
		};
		$.response.setBody(JSON.stringify(oResponse));
		return;
	}
	var oConnection = $.hdb.getConnection();
	
	var sQuery = "SELECT CANDIDATE_ID, FULL_NAME, EMAIL, BIRTH_DAY, RATING, CONTINENT " +
	"FROM \"Candidate\" " + "LIMIT ?";
	
	var oResultSet = oConnection.executeQuery(sQuery, vLimit);
	
	var sBody = "";
	for (var i = 0; i < oResultSet.length; i++) {
		sBody += oResultSet[i].CANDIDATE_ID + "," +
			oResultSet[i].FULL_NAME + "," +
			oResultSet[i].EMAIL + "," +
			oResultSet[i].BIRTH_DAY + "," +
			oResultSet[i].RATING + "," +
			oResultSet[i].CONTINENT + "\n";
	}
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/csv";
	$.response.headers.set("Content-Disposition", "attachment; filename=list.csv");
	$.response.setBody(sBody);
	oConnection.close();
	
}
downloadCandidateCSV();