fn main() {
    tonic_build::compile_protos("../protos/ogtemplate.proto").unwrap();
}
