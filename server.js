/**
 * Created by rishabhshukla on 10/05/17.
 */

var http = require('http');
var host = '127.0.0.1';
var port = '9000';
var fs = require('fs');
var path = require('path');

var mimes = {
    '.html':'text/html',
    '.jpg':'image/jpg',
    '.css':'text/css',
    '.js': 'text/javascript'
};

var server = http.createServer(function (req, res) {

    var filepath = (req.url==='/')? ('./index.html') : ('.'+req.url);

    var contentType = mimes[path.extname(filepath)];
    console.log(filepath+" "+contentType);
    fs.exists(filepath, function(file_exists){
        console.log(file_exists);
        if(file_exists){
            // fs.readFile(filepath, function(error, content){
            //     if(error){
            //         res.writeHead(500);
            //         res.end();
            //     }else{
            //         res.writeHead(200, {'Content-Type':contentType});
            //         res.end(content,'utf-8')
            //     }
            // })
            res.writeHead(200, {'Content-Type':contentType});
            var readStream =  fs.createReadStream(filepath).pipe(res);
            readStream.on('error',function () {
                        res.writeHead(500);
                        res.end();
            })
        }else{
            res.writeHead(404);
            res.end('Page not found');
        }
    });

}).listen(port,host,function () {
    console.log('Server Running on http '+host+':'+port);
});
