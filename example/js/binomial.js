if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var choose = {};
}
else // node.js context
{
	var choose = module.exports = {};
}

(function( choose, undefined ) {

	var memo = new Array(50);

	choose.get = function(n, k) {

		if (k === 0) {
			return 1;
		}

		if (n === 0 || k > n) {
			return 0;
		}

		if (k > n - k) {
        	k = n - k
        }

		if ( memo_exists(n,k) ) {
			return get_memo(n,k);
		}

	    var r = 1,
	    	n_o = n;

	    for (var d=1; d <= k; d++) {

	    	if ( memo_exists(n_o, d) ) {
	    		n--;
	    		r = get_memo(n_o, d);
	    		continue;
	    	}

			r *= n--;
	  		r /= d;

	  		memoize(n_o, d, r);
	    	
	    }

	    return r;

	};

	choose.get_no_memo = function(n, k) {

		if (k === 0) {
			return 1;
		}

		if (n === 0 || k > n) {
			return 0;
		}

		if (k > n - k) {
        	k = n - k
        }

	    var r = 1,
	    	n_o = n;

	    for (var d=1; d <= k; d++) {

			r *= n--;
	  		r /= d;

	    }

	    return r;
	};

	function memo_exists(n, k) {

		return ( memo[n] != undefined && memo[n][k] != undefined );

	};

	function get_memo(n, k) {

		return memo[n][k];

	};

	function memoize(n, k, val) {

		if ( memo.length < n ) {
			memo.length = n;
			memo[n] = new Array(k+5);
		} else if ( memo[n] === undefined ) {
			memo[n] = new Array(k);
		}

		if (memo[n].length < k) {
			memo[n] = new Array(k+5);
		}

		memo[n][k] = val;

	};

})(choose);