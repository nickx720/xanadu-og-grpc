use std::collections::HashMap;
use std::pin::Pin;
use std::sync::Arc;

use futures::Stream;
use rand::Rng;
use tokio::sync::{RwLock, mpsc};
use tonic::transport::Server;
use tonic:: { Request, Response, Status, Streaming};
use ogtemplate::chat_req_server::{ChatReq,ChatReqServer };
use ogtemplate::{ Msg, Req, ResponseArray};

pub mod ogtemplate {
    tonic::include_proto!("ogtemplate");
}

const POINTS: usize = 500;

// Pair of mpsc channel
#[derive(Debug)]
struct Shared {
    senders: HashMap<String, mpsc::Sender<Msg>>
}

impl Shared {
    fn new() -> Self {
        Shared { 
            senders:HashMap::new(),
        }
    }
}

#[derive(Debug)]
struct Service {
    shared: Arc<RwLock<Shared>>
}
impl Service {
    fn new(shared: Arc<RwLock<Shared>>) -> Self {
        Service{shared }
    }

}

#[tonic::async_trait]
impl ChatReq for Service {
    type ConnectServerStream = Pin<Box<dyn Stream<Item = Result<Msg,Status>> + Send + Sync + 'static>,>;

    async fn connect_server(&self,request: Request<Req>) ->Result<Response<Self::ConnectServerStream>,Status> {
        let name = request.into_inner().user_name;
        let (stream_tx, stream_rx) = mpsc::channel(1);

        let (tx, mut rx) = mpsc::channel(1);
        {
            self.shared.write().await.senders.insert(name.clone(), tx);
        }

        let shared_clone = self.shared.clone();
        tokio::spawn(async move {
            while let Some(msg) = rx.recv().await {
                match stream_tx.send(Ok(msg)).await {
                    Ok(_)=> {},
                    Err(_)=> {
                        println!(
                            "[Remote] stream tx sending error. Remote {}",
                            &name
                        );
                        shared_clone.write().await.senders.remove(&name);
                    }
                }
            }
        });

        Ok(Response::new(Box::pin(tokio_stream::wrappers::ReceiverStream::new(stream_rx),)))
    }

    async fn sending(&self, request:Request<Msg>) ->Result<Response<ResponseArray>,Status> {
        let req_data = request.into_inner();
        let user_name = req_data.user_name;
        let content = req_data.content;
        let msg = Msg { user_name,content };
        let mut x:Vec<f32> = Vec::with_capacity(POINTS);
        let mut y:Vec<f32> = Vec::with_capacity(POINTS);
        (0..POINTS).for_each(|i|{
            let value = rand::thread_rng().gen_range(0.0..0.5);
            x.push(i as f32);
            y.push(f32::sin(value));
        });
        Ok(Response::new(ResponseArray{
            x ,
            y,
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(),Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse().unwrap();
    println!("Sending server listening on {}", addr);

    let shared = Arc::new(RwLock::new(Shared::new()));
    let service = Service::new(shared.clone());

    Server::builder().add_service(ChatReqServer::new(service)).serve(addr).await?;
    Ok(())

}
