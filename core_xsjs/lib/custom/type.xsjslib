function getType(sType){
	var oType = {
		"plain":"text/plain",
		"html":"text/html"
	};
	return oType[sType] || function(){
		throw new Error("Type not passed or does not exist");
	}();
}  