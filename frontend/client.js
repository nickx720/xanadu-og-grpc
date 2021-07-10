const {Empty, Msg, Req} =require("./ogtemplate_pb");
const {ChatReqClient} = require("./ogtemplate_grpc_web_pb");
const Plotly = require('plotly.js-dist-min');

// Here you need input your server IP. Since I am using docker, hardcode
// here to make it's simple.
var client = new ChatReqClient("http://localhost:8080", null, null);

var user_name = "test";


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
            const { array} = res;
            const [x,y] = [array[0],array[1]];
            const trace = {
                x: [...x],
                y: [...y],
                type: 'scatter'
            };
            console.log(trace);
            const layout = {
                xaxis: {
                    type: 'log',
                    autorange: true
                }
            };
            Plotly.react('myDiv',[trace],layout);
        }
    });
}

connect_to_server(user_name);
const content = "asd";
(function() {
    setInterval(()=>{ 
        sending(user_name, content)
    }
        ,100);
})();

