// // const Plant = require('../models/plantModel');
// // const plantDataController = require('../controllers/plantDataController');

// xdescribe('plantDataController', () => {
//   const res = { locals: {} };
//   const next = jest.fn();

//   describe('getPlants', () => {
//     it('should retrieve plant data for a given location', async () => {
//       const req = {
//         query: {
//           location: // location ,
//         },
//       };

//       Plant.find = jest
//         .fn()
//         .mockResolvedValue([{ name: 'Plant 1' }, { name: 'Plant 2' }]);

//       await plantDataController.getPlants(req, res, next);

//       expect(res.locals.plants).toEqual([
//         { name: 'Plant 1' },
//         { name: 'Plant 2' },
//       ]);
//       // Assert that next middleware is called
//       expect(next).toHaveBeenCalled();
//     });

//     it('should handle error if no data found for a given location', async () => {
//       const req = {
//         query: {
//           location: 'NonexistentLocation',
//         },
//       };

//       Plant.find = jest.fn().mockResolvedValue([]);

//       const next = jest.fn();

//       await plantDataController.getPlants(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(Object));
//     });

//     it('should handle errors thrown during data retrieval', async () => {
//       const req = {
//         query: {
//           location: // location
//         },
//       };

//       Plant.find = jest.fn().mockRejectedValue(new Error('Database Error'));

//       const next = jest.fn();

//       await plantDataController.getPlants(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.any(Object));
//     });
//   });
// });
