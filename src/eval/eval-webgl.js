vec3 surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v ) {

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = zeros3d( du+1, dv+1, dim )
		, knot_span_index_u = knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = knot_span_given_n( m, degree_v, v, knots_v )
		, uders = deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knots_u )
		, vders = deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knots_v )
		, temp = zeros2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {
		for (s = 0; s <= degree_v; s++) {
			temp[s] = zeros1d( dim );

			for (r = 0; r <= degree_u; r++) {
				temp[s] = Vec.add( temp[s], Vec.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {
			SKL[k][l] = zeros1d( dim );

			for (s = 0; s <= degree_v; s++) {
				SKL[k][l] = Vec.add( SKL[k][l], Vec.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

vec3 zeros1d(size) {
  return Vec.rep([size], 0);
}


vec3 zeros2d(rows, cols) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  return Vec.rep([rows, cols], 0);
}


vec3 zeros3d(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  return Vec.rep([rows, cols, dim], 0);
}

vec3 deriv_basis_functions_given_n_i( knot_span_index, u, p, n, knots )
{
	var ndu = zeros2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knots[knot_span_index+1-j];
		right[j] = knots[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = zeros2d(n+1, p+1)
		, a = zeros2d(2, p+1)
		, k = 1
		, s1 = 0
		, s2 = 1
		, d = 0
		, rk = 0
		, pk = 0
		, j1 = 0
		, j2 = 0;

	for(j = 0; j <= p; j++) {
		ders[0][j] = ndu[j][p];
	}

	for (r = 0; r<=p; r++) {
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;

		for (k=1; k<=n ;k++)
		{
			d = 0.0;
			rk = r - k;
			pk = p - k;

			if (r >= k) {
				a[s2][0] = a[s1][0] / ndu[pk+1][rk];
				d = a[s2][0]*ndu[rk][pk];
			}

			if (rk >= -1) {
				j1 = 1;
			} else {
				j1 = -rk;
			}

			if (r-1 <= pk) {
				j2 = k-1;
			} else {
				j2 = p - r;
			}

			for (j = j1; j <= j2; j++) {
				a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
				d += a[s2][j]*ndu[rk+j][pk];
			}

			if (r <= pk)
			{
				a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
				d += a[s2][k] * ndu[r][pk];
			}

			ders[k][r] = d;
			j = s1;
			s1 = s2;
			s2 = j;
		}
	}

	r = p;
	for (k = 1; k <= n; k++) {
		for (j = 0; j <= p; j++) {
			ders[k][j] *= r;
		}
		r *= (p-k);
	}

	return ders;

}

int knot_span_given_n( int n, int degree, float u, float[8] knots )
{
  if ( u >= knots[n+1] )
  {
    return n;
  }

  if ( u < knots[degree] )
  {
    return degree;
  }

  int low = degree;
  int high = n+1;
  float v = floor( (low + high) / 2 );
  int mid = int(v);

  while( u < knots[ mid ] || u >= knots[ mid + 1 ] )
  {
    if ( u < knots[ mid ] )
    {
      high = mid;
    }
    else
    {
      low = mid;
    }
    mid = floor( (low + high) / 2 );
  }

  return mid;
    }