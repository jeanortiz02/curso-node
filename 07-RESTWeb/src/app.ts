
import htttp from 'http';
import fs from 'fs'

const server = htttp.createServer((req, res) => {

    console.log(req.url);

    // res.write('hello world');
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hola Mundo</h1>');
    // //
    // res.end();

    // const data = { name: 'John Doel', age: 30, city: 'San Francisco'};
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if ( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }

})


const port = 8080

server.listen(port, () => {

    console.log(`Server is running on port ${port}`);

})