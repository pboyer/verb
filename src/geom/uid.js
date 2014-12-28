// ####uid()
// 
// Generate a unique id.
//
// **returns**
// + *Number*, The id

verb.uid = (function(){
	var id = 0;
	return function() {
		return id++;
	};
})();