#version 330

uniform vec3 uLightDir;

uniform vec3 uAmbientLight;
uniform vec3 uDiffuseLight;
uniform vec3 uSpecularLight;

uniform vec3 uAmbientMaterial;
uniform vec3 uDiffuseMaterial;
uniform vec3 uSpecularMaterial;


uniform float uSpecularPower;

uniform sampler2D uTexture;
uniform sampler2D uNormalMap;

in vec3 vNormal;
in vec3 vViewPath;
in vec2 vTexCoord;

in vec3 vT;
in vec3 vN;

out vec4 outColor;

void main() {
    vec3 L = normalize(uLightDir);
    vec3 normal = texture(uNormalMap, vTexCoord).rgb;
    normal = normalize(normal * 2.0 - 1.0);
    
    vec3 T = normalize(vT - dot(vT, vN) *vN);
    vec3 B = cross(T, vN);
    
	vec3 N = normalize(mat3(T, B, vN) * normal);

    vec3 ambient = uAmbientLight * uAmbientMaterial;
    
    float diffuseIntensity = max(dot(N, -L), 0.0);
    vec3 diffuse = diffuseIntensity * uDiffuseLight * uDiffuseMaterial;
       
    //Calculo do componente especular
	float specularIntensity = 0.0;
	if (uSpecularPower > 0.0) {
		vec3 V = normalize(vViewPath);
		vec3 R = reflect(L, N);
		specularIntensity = pow(max(dot(R, V), 0.0), uSpecularPower);
	}
    vec3 specular = specularIntensity * uSpecularLight * uSpecularMaterial;
    vec4 texel = texture(uTexture, vTexCoord);
    
    vec3 color = clamp(texel.rgb * (ambient + diffuse) + specular, 0.0, 1.0);
    outColor = vec4(color, texel.a);
}