const http = require('http');

const DEVOPS_ENGINEER = 'Ugoji Dumebi'; 

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    const healthcheck = {
      status: 'ok',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      devopsEngineer: DEVOPS_ENGINEER,
      timestamp: Date.now()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(healthcheck));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'not_found' }));
  }
});

server.listen(3000, () => {
  console.log('Health check server running at port 3000');
});
