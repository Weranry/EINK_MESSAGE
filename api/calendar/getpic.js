const { createCanvas, registerFont } = require('canvas');
const getCalendarData = require('../../lib/calendar');
const path = require('path');

registerFont(path.join(__dirname, '../../fonts', 'simhei.ttf'), { family: 'SimHei' });

function drawCalendar(data) {
    const canvas = createCanvas(400, 300);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 400, 300);

    ctx.fillStyle = 'black';

    ctx.font = 'bold 24px SimHei';
    ctx.fillText(`${data.SolarYear}${data.SolarMonth}${data.SolarDay}`, 20, 40);
    ctx.fillText(data.WeekDay, 20, 70);

    ctx.font = '18px SimHei';
    ctx.fillText(`${data.lunarMonth}${data.lunarDay}`, 20, 100);

    ctx.font = '14px SimHei';
    let y = 130;
    ctx.fillText(`农历：${data.ganzhiYear} ${data.ganzhiMonth} ${data.ganzhiDay}`, 20, y);
    y += 20;
    ctx.fillText(`月相：${data.yuexiang}`, 20, y);
    y += 20;
    ctx.fillText(`物候：${data.wuhou}`, 20, y);
    y += 20;
    ctx.fillText(`节气：${data.hou}`, 20, y);
    if (data.shujiu !== 'N/A') {
        y += 20;
        ctx.fillText(`数九：${data.shujiu}`, 20, y);
    }
    if (data.fu !== 'N/A') {
        y += 20;
        ctx.fillText(`伏：${data.fu}`, 20, y);
    }

    return canvas;
}

module.exports = (req, res) => {
    const { project } = req.query;
    console.log(`Generating image for project: ${project}`);
    
    const data = getCalendarData();
    const canvas = drawCalendar(data);
    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
};