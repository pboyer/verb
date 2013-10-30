// inherits surface

function revolvedSurface(S, T, theta, m, Pj, wj, n, U, Pij, wij){

	if (theta <= 90) {
		narcs = 1;
	} else {
		if (theta <= 180){
			narcs = 2;
			U[3]= U[4] = 0.5;
		} else if (theta <= 270){
			narcs = 3;
			U[3]= U[4] = 1/3;
			U[5]= U[6] = 2/3;
		} else {
			narcs = 4;
			U[3]= U[4] = 1/3;
			U[5]= U[6] = 2/3;
			U[7]= U[8] = 2/3;
		}
	}

	dbtheta = theta/narcs;
	var j = 3 + 2 * (narcs-1);
	for (var i = 0; i < 3; j++, i++){
		U[i] = 0.0;
		U[j] = 1.0;
	}

	n = 2 * narcs;
	wm = Math.cos(dtheta/2.0);
	var angle = 0.0;
	for (var i = 1; i < narcs; i++){
		angle = angle + dtheta;
		cosines[i] = Math.cos(angle);
		sines[i] = Math.sin(angle);
	}

	for (var j = 0; j <= m; j++){

		PointToLine(S, T, Pj[j], 0);
		X = Pj[j] - O;
		r = VecNormalize(X);
		VecCrossProduct(T,X,Y);
		Pij[0][j] = P0 = Pj[j];
		wij[0][j] = wj[j];
		T0 = Y;
		index = 0;
		angle = 0.0;

		for (var i = 1; i <= narcs; i++){

			P2 = O + r*cosines[i]*X + r * sines[i] * Y;
			Pij[index+2][j] = P2;
			wij[index+2][j] = wj[j];
			T2 = -sines[i] * X + cosines[i] * Y;
			Intersect3DLines(P0, T0, P2, T2, Pij[index+1][j]);
			wij[index+1][j] = wm * wj[j];
			index += 2;
			if (i < narcs)
			{
				P0 = P2;
				T0 = T2;
			}
		}


	}

}
