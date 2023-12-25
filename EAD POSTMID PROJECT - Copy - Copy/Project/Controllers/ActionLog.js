import ActionLog from '../Models/Actions.js';

const getDailyActions = async (req, res) => {
    try {
      const startDate = new Date('2023-12-01'); // Adjust the date as needed
  
      console.log('Start Date:', startDate); // Log start date for verification
  
      const dailyActions = await ActionLog.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      console.log('Daily Actions:', dailyActions);
      res.json(dailyActions);
    } catch (error) {
      console.error('Error fetching daily actions:', error);
      res.status(500).json({ error: 'Unable to fetch daily actions' });
    }
  };
  
export { getDailyActions };
