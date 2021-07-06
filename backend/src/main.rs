use tonic::transport::Server;
use tonic:: { Request, Response, Status, Streaming};

use ogtemplate::chat_req_server::{ChatReq,ChatReqServer };
use ogtemplate::{ Empty,Msg, Req};

pub mod ogtemplate {
    tonic::include_proto!("ogtemplate");
}

fn main() {
    println!("Hello, world!");
}
