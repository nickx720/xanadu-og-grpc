build-js : ## To build js
	protoc -I=./protos ogtemplate.proto --js_out=import_style=commonjs:./frontend --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend

docker-build :
	docker build -t envoy:v1 . && docker run -d --name envoy -p 9901:9901 -p 8080:8080 -p 50051:50051 envoy:v1
