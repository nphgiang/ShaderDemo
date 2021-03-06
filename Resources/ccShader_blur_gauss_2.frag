#ifdef GL_ES
precision lowp float;
#endif

#define N 10

varying vec2 v_texCoord;

uniform vec2 u_resolution;

vec4 blur2(sampler2D t, vec2 p)
{
  vec4 sum = vec4(0.0);
  int count = 0;
  vec2 delta = vec2(1.0, 1.0) / u_resolution;
  for (int i = -N; i <= N; i++)
  {
    for (int j = -N; j <= N; j++)
    {
      vec2 uv;
      uv.x = p.x - float(i) * delta.x;
      uv.y = p.y - float(j) * delta.y;
      if (uv.x < 0 || uv.x > 1 || uv.y < 0 || uv.y > 1)
        continue;
      sum += texture2D(t, uv);
      count ++;
    }
  }
  return sum / float(count);
}

void main()
{
 	gl_FragColor = blur2(CC_Texture0, v_texCoord);
}