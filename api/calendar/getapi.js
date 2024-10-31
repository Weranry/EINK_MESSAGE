const getCalendarData = require('../../lib/calendar');

module.exports = (req, res) => {
    const { project } = req.query;
    console.log(`Generating API data for project: ${project}`);
    
    const data = getCalendarData();
    res.status(200).json(data);
};