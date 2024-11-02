const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;



// 主页路由
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1><p>Welcome to the Calendar Project</p>');
});

// API路由
app.get('/:project/getapi', (req, res) => {
    const { project } = req.params;
    const apiPath = path.join(__dirname, 'api', project, 'getapi.js');
    
    if (fs.existsSync(apiPath)) {
        const getApiHandler = require(apiPath);
        getApiHandler(req, res);
    } else {
        res.status(404).send('API not found');
    }
});

// 图片生成路由
app.get('/:project/getpic', (req, res) => {
    const { project } = req.params;
    const picPath = path.join(__dirname, 'api', project, 'getpic.js');
    
    if (fs.existsSync(picPath)) {
        const getPicHandler = require(picPath);
        getPicHandler(req, res);
    } else {
        res.status(404).send('Image generator not found');
    }
});

// 静态文件服务
app.use(express.static('public'));
app.use('/styles', express.static('styles'));
app.use('/fonts', express.static('fonts'));

// 处理所有其他路由
app.get('/:project/*', (req, res) => {
    const { project } = req.params;
    const htmlPath = path.join(__dirname, 'public', project, 'index.html');
    
    if (fs.existsSync(htmlPath)) {
        res.sendFile(htmlPath);
    } else {
        res.status(404).send('Project not found');
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});