build-js : ## To build js
	protoc -I=./protos ogtemplate.proto --js_out=import_style=commonjs:./frontend --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend

docker-build :
	docker rm -f envoy &&  docker build -t envoy:v1 .  

docker-run : 
	docker run -d --name envoy -p 9901:9901 -p 8080:8080 envoy:v1


build-js-npx :
	cd frontend && rm -rf dist && npx webpack --devtool source-map client.js && cd ../
