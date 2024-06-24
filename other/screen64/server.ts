const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url.startsWith('/data')) {
	console.log('Reading data..');
    const asciiContent = readData('data.dat');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(asciiContent);	
  }
  else if (req.method === 'GET'){
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   res.end('Server is up.');
  }

  function readData(name) {
try {
  const data = fs.readFileSync('resources/' + name, 'utf8');
  const data2 = data.replace(/[A-Z ]+/g, '');
  return data2;
} catch (err) {
  console.error('Error reading file:', err);
  return [];
}
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});