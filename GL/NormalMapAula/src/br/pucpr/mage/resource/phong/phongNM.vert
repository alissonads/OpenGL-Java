#version 330

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uWorld;

uniform vec3 uCameraPosition;

in vec3 aPosition;
in vec3 aNormal;
in vec3 aTangent;
in vec2 aTexCoord;

out vec3 vNormal;
out vec3 vViewPath;
out vec2 vTexCoord;

out vec3 vT;
out vec3 vN;

void main() {
	vec4 worldPos = uWorld * vec4(aPosition, 1.0);
    gl_Position =  uProjection * uView * worldPos;
    vNormal = (uWorld * vec4(aNormal, 0.0)).xyz;
    vViewPath = uCameraPosition - worldPos.xyz;
    vTexCoord = aTexCoord;    
    
    vT = normalize(vec3(uWorld * vec4(aTangent, 0.0)));
    vN = normalize(vec3(uWorld * vec4(aNormal, 0.0)));
}