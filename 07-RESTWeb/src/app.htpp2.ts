
import htttp2 from 'http2';
import fs from 'fs'

const server = htttp2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    
},(req, res) => {

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
        
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.end(htmlFile);
        
        return;
    } 
    
    if (req.url?.endsWith('.js') ) {
        res.writeHead(200, { 'Content-Type': 'aplication/javascript'})
    } else if (req.url?.endsWith('.css') ) {
        res.writeHead(200, { 'Content-Type': 'text/css'})
    }

    try {        
        
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end()
    }
})







const port = 8080

server.listen(port, () => {

    console.log(`Server is running on port ${port}`);

})