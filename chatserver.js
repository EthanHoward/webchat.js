var net = require("net");

function server() {
    var server = net.createServer(function(client) {
        console.log("Client connect. \nClient local address : " + client.localAddress + ":" + client.localPort + "\nClient remote address " + client.remoteAddress + ":" + client.remotePort)
        client.setEncoding("utf-8");
        client.setTimeout(1000);

        client.on("data", function(data) {
            console.log("Recive client send data => " + data + "\nData size => " + client.bytesRead);
            client.end("Server recived data => " + data + ", send back to client data size => " + client.bytesRead);
            client.on("end", function (){
                console.log("Client Disconnect.");

                server.getConnections(function(err, count) {
                    if (!err)
                    {
                        console.log("%d Users are still connected to the server", count);

                    } else {
                        console.error(JSON.stringify(err));
                    }
                });
            });
        
            client.on("timeout", function() {
                console.log("Client timed out!");
            });
        });
    });

    server.listen(25565, function() { 
        var SV_Info = server.address();
        var SV_Info_Json = JSON.stringify(SV_Info);
        console.log("TCP Server listening on address : " + SV_Info_Json);
        server.on("close", function(error) {
            console.error(JSON.stringify(error));
        })
    })
}

server();