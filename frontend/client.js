const {Empty, Msg, Req} =require("./ogtemplate_pb");
const {ChatReqClient} = require("./ogtemplate_grpc_web_pb");

// Here you need input your server IP. Since I am using docker, hardcode
// here to make it's simple.
var client = new ChatReqClient("http://localhost:8080", null, null);

var user_name = prompt("Please input your name:", "test");


console.log(user_name);

function connect_to_server(name) {
    const req = new Req();
    req.setUserName(name);

    const stream = client.connectServer(req);
    stream.on("data", (res) => {
        const uname = res.getUserName();
        const content = res.getContent();

        const el = document.createElement("p");
        el.textContent = uname + ": " + content;
        document.getElementById("chats").append(el);
    });
}

function sending(name, content) {
    const req = new Msg();
    req.setUserName(name);
    req.setContent(content);

    client.sending(req, {}, (err, res) => {
        if (err) {
            console.log(`Unexpected error for sayHello: code = ${err.code}` +
                        `, message = "${err.message}"`);
        } else {
            console.log("Send msg successfully!");
            console.log(res);
        }
    });
}

connect_to_server(user_name);

window.send = function() {
    const content = document.getElementById("inputTxt").value;
    console.log("Input content: " + content);
    sending(user_name, content);
    sending(user_name, content);

    document.getElementById("inputTxt").value = "";
}

