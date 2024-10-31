const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 注册字体
const { registerFont } = require('canvas');
registerFont(path.join(__dirname, 'fonts', 'simhei.ttf'), { family: 'SimHei' });

// API路由
app.get('/:project/getapi', (req, res) => {
    const { project } = req.params;
    const getApiHandler = require(`./api/${project}/getapi.js`);
    getApiHandler(req, res);
});

// 图片生成路由
app.get('/:project/getpic', (req, res) => {
    const { project } = req.params;
    const getPicHandler = require(`./api/${project}/getpic.js`);
    getPicHandler(req, res);
});

// 静态文件服务
app.use(express.static('public'));
app.use('/styles', express.static('styles'));
app.use('/fonts', express.static('fonts'));

// 处理所有其他路由
app.get('/:project/*', (req, res) => {
    const { project } = req.params;
    res.sendFile(path.join(__dirname, 'public', project, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});