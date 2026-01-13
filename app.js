const http = require('http');
const os = require('os');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>Module 9 - Exercise 3A</title></head>
      <body style="font-family: Arial, sans-serif; margin: 40px;">
        <h1>Module 9 - Exercise 3A</h1>
        <h2>Jenkins + GitHub + LocalStack ECR</h2>
        <p><strong>Hostname:</strong> ${os.hostname()}</p>
        <p><strong>Platform:</strong> ${os.platform()}</p>
        <p><strong>Architecture:</strong> ${os.arch()}</p>
        <p><strong>Node Version:</strong> ${process.version}</p>
        <p><strong>Built by:</strong> Andrew</p>
        <p><strong>Build Date:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p>✅ Source: GitHub</p>
        <p>✅ Built by: Jenkins</p>
        <p>✅ Stored in: LocalStack ECR</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
