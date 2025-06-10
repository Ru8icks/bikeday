const request = require('supertest');
const axios = require('axios');
const app = require('./app'); 

jest.mock('axios');

describe('GET /api/weather', () => {
    beforeEach(() => {
        axios.get.mockClear();  
    });

    
  it('should return weather data for a valid city', async () => {
    
    axios.get.mockImplementation((url) => {
      if (url.includes('geocoding-api')) {
        return Promise.resolve({
          data: {
            results: [{
              latitude: 51.5085,
              longitude: -0.1257,
              name: 'London',
              country: 'United Kingdom'
            }]
          }
        });
      }
      if (url.includes('forecast')) {
        return Promise.resolve({
          data: { }
        });
      }
      return Promise.reject(new Error('not found'));
    });

    const response = await request(app).get('/api/weather?city=london');

    expect(response.statusCode).toBe(200);
    expect(response.body.city).toEqual('London, United Kingdom');
    expect(response.body).toHaveProperty('weather');
  });

  it('should return a 400 error if city is not provided', async () => {
    const response = await request(app).get('/api/weather');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('City is required');
  });

  it('should return a 404 error for a city that is not found', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } }); 
    
    const response = await request(app).get('/api/weather?city=nonexistentcity');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('City not found: nonexistentcity');
  });

  it('should serve data from cache on the second request for the same city', async () => {
  
    axios.get.mockImplementation((url) => {
      if (url.includes('geocoding-api')) {
        return Promise.resolve({ data: { 
            results: [{ 
                latitude: 40.7, 
                longitude: -74.0, 
                name: 'New York', 
                country: 'USA' }] 
            } 
        });
      }
      if (url.includes('forecast')) {
        return Promise.resolve({ 
            data: {} 
        });
      }
      return Promise.reject(new Error('not found'));
    });

    const firstResponse = await request(app).get('/api/weather?city=newyork');
    expect(firstResponse.statusCode).toBe(200);
    expect(axios.get).toHaveBeenCalledTimes(2);

    const secondResponse = await request(app).get('/api/weather?city=newyork');
    expect(secondResponse.statusCode).toBe(200);
    expect(axios.get).toHaveBeenCalledTimes(2); 
    
    expect(secondResponse.body.city).toEqual('New York, USA');
  });
});
