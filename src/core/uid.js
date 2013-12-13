// ####uid()
// 
// Generate a unique id.
//
// **returns**
// + *Number*, The id

verb.core.uid = (function(){
	var id = 0;
	return function() {
		return id++;
	};
})();