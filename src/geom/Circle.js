// is a data structure representing a circle

function makeCircle(O, X, Y, r, ths, the, n, U, Pw) {

	if (the < ths) the = 360 + ths;
	var theta = the - ths
		, narcs = 0;

	if (theta <= 90) {
		narcs = 1;
	} else {
		if (theta <= 180){
			narcs = 2;
		} else if (theta <= 270){
			narcs = 3;
		} else {
			narcs = 4;
		}
	}

	var dtheta = theta / narcs
		, n = 2 * narcs
		. w1 = Math.cos( dtheta / 2) // convert to rads
		, P0 = O + r * Math.cos(ths) * X + r * Math.sin(ths) * Y
		, T0 = -Math.sin(ths) * X + Math.cos(ths) * Y
		, Pw[0] = P0
		, index = 0
		, angle = ths;

	for (var i = 1; i <= narcs; i++){

		var angle += dtheta;
		var P2 = O + r * Math.cos(angle) * X + r * Math.sin(angle) * Y;
		Pw[index+2] = P2;
		var T2 = -Math.sin(angle) * X + Math.cos(angle) * Y;
		Intersect3DLines(P0, T0, P2, T2, dummy, dummy, P1);
		Pw[index+1] = w1 * P1;
		index += 2;
		if (i < narcs){
			P0 = P2;
			T0 = T2;
		}
	}

	j = 2 * narcs + 1;

	for (var i = 0; i < 3; i++){
		U[i] = 0.0;
		U[i+j] = 1.0;
	}

	switch (narcs){
		case 1: break;
		case 2: U[3] = U[4] = 0.5; break;
		case 3: U[3] = U[4] = 1/3;
						U[5] = U[6] = 2/3; break;
		case 4: U[3] = U[4] = 0.25;
						U[5] = U[6] = 0.5;
						U[7] = U[8] = 0.75; break;
	}

}