const getCalendarData = require('../../lib/calendar');

module.exports = (req, res) => {
    console.log('Generating API data for calendar');
    const data = getCalendarData();
    res.json(data);
};