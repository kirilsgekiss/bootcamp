function test1() {
	var oConnection = $.hdb.getConnection();
	var sCategory = $.request.parameters.get("cat");
	var fnGetProducts = oConnection.loadProcedure("test");
	if (!sCategory) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody("Category not passed");
		return;
	}
	try {
		var oResultSet = fnGetProducts(sCategory).resp;
/*		if (oResultSet.length === 0) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody("No Items found for this conditions");
			return;
		}
		var sBody = "";
		for (var i = 0; i < oResultSet.length; i++) {
			sBody +=
				oResultSet[i].PRODUCTID + "\t" +
				oResultSet[i].CATEGORY + "\t" +
				oResultSet[i].CURRENCY + "\t" +
				oResultSet[i].PRICE + "\t" +
				oResultSet[i].WEIGHTMEASURE + "\t" +
				oResultSet[i].WEIGHTUNIT + "\n";
		}
		$.response.status = $.net.http.OK;
		$.response.contentType = "application/vnd.ms-excel; charset=uft-16le";
		$.response.headers.set("Content-Disposition", "attachment; filename=list.xls");
		$.response.setBody(sBody);*/
		$.response.setBody(fnGetProducts(sCategory).resp);
		oConnection.commit();
	} catch (oException) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(JSON.stringify({
			message: oException.message
		}));
	}
	oConnection.close();
}
test1();