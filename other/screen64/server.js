var fs = require('fs');
var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url.startsWith('/data')) {
        console.log('Reading data..');
        var asciiContent = readAscii('data.dat');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(asciiContent);
    }
    else if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server is up.');
    }
    function readAscii(name) {
        try {
            var data = fs.readFileSync('resources/' + name, 'utf8');
            return data;
        }
        catch (err) {
            console.error('Error reading file:', err);
            return '';
        }
    }
});
server.listen(3000, 'localhost', function () {
    console.log('Server running at http://localhost:3000/');
});
