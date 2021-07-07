build-js : ## To build js
	protoc -I=./protos ogtemplate.proto --js_out=import_style=commonjs:./frontend --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend
