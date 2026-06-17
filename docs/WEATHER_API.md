# Weather Dashboard API Documentation

## Overview

The Weather Dashboard API provides comprehensive weather information fetched from OpenWeatherMap. Get current weather, 5-day forecasts, air quality data, and complete weather dashboards.

## Base URL

```
http://localhost:3000/api/weather
```

## Requirements

You need an OpenWeatherMap API key (free tier available):
1. Sign up at https://openweathermap.org/api
2. Get your API key
3. Add to `.env` file: `OPENWEATHER_API_KEY=your_key`

See [Weather Setup Guide](./WEATHER_SETUP.md) for details.

## Current Weather Endpoints

### 1. Get Current Weather by City

**Endpoint:** `GET /api/weather/current?city=London&units=metric`

**Query Parameters:**
- `city` (required): City name
- `units` (optional): `metric` (Celsius), `imperial` (Fahrenheit), `standard` (Kelvin). Default: `metric`

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/current?city=London&units=metric"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Weather for London",
  "location": {
    "name": "London",
    "country": "GB",
    "coordinates": {
      "latitude": 51.51,
      "longitude": -0.13
    }
  },
  "current": {
    "temperature": 15.2,
    "feelsLike": 14.8,
    "minTemp": 13.5,
    "maxTemp": 16.8,
    "pressure": 1013,
    "humidity": 72,
    "visibility": 10000,
    "description": "Clouds",
    "detailed": "overcast clouds",
    "icon": "04d",
    "windSpeed": 4.5,
    "windDirection": 230,
    "windGust": 7.2,
    "cloudiness": 90,
    "rainfall": null,
    "snowfall": null,
    "sunrise": "2026-06-17T04:45:00.000Z",
    "sunset": "2026-06-17T21:15:00.000Z",
    "timestamp": "2026-06-17T18:30:00.000Z"
  }
}
```

### 2. Get Current Weather by Coordinates

**Endpoint:** `GET /api/weather/coordinates?lat=51.5&lon=-0.1&units=metric`

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude
- `units` (optional): `metric`, `imperial`, `standard`. Default: `metric`

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/coordinates?lat=51.5&lon=-0.1&units=metric"
```

## Forecast Endpoints

### 3. Get 5-Day Forecast by City

**Endpoint:** `GET /api/weather/forecast?city=London&units=metric`

**Query Parameters:**
- `city` (required): City name
- `units` (optional): `metric`, `imperial`, `standard`. Default: `metric`

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/forecast?city=London"
```

**Example Response:**
```json
{
  "success": true,
  "message": "5-day forecast for London",
  "location": {
    "name": "London",
    "country": "GB",
    "coordinates": {
      "latitude": 51.51,
      "longitude": -0.13
    }
  },
  "forecast": {
    "2026-06-18": [
      {
        "timestamp": "2026-06-18T00:00:00.000Z",
        "temperature": 14.5,
        "feelsLike": 14.1,
        "pressure": 1015,
        "humidity": 75,
        "description": "Clouds",
        "detailed": "broken clouds",
        "icon": "04d",
        "windSpeed": 3.8,
        "windDirection": 240,
        "cloudiness": 75,
        "rainfall": null,
        "snowfall": null,
        "visibility": 10000,
        "precipitationProbability": 0.2
      }
    ],
    "2026-06-19": [
      {
        "timestamp": "2026-06-19T00:00:00.000Z",
        "temperature": 16.2,
        "feelsLike": 15.9,
        "pressure": 1012,
        "humidity": 68,
        "description": "Clear",
        "detailed": "clear sky",
        "icon": "01d",
        "windSpeed": 2.5,
        "windDirection": 200,
        "cloudiness": 5,
        "rainfall": null,
        "snowfall": null,
        "visibility": 10000,
        "precipitationProbability": 0
      }
    ]
  },
  "totalForecasts": 40
}
```

### 4. Get 5-Day Forecast by Coordinates

**Endpoint:** `GET /api/weather/forecast/coordinates?lat=51.5&lon=-0.1&units=metric`

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude
- `units` (optional): `metric`, `imperial`, `standard`. Default: `metric`

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/forecast/coordinates?lat=51.5&lon=-0.1"
```

## Air Quality Endpoint

### 5. Get Air Quality Data

**Endpoint:** `GET /api/weather/air-quality?lat=51.5&lon=-0.1`

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/air-quality?lat=51.5&lon=-0.1"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Air quality for coordinates (51.5, -0.1)",
  "coordinates": {
    "latitude": 51.5,
    "longitude": -0.1
  },
  "aqi": 2,
  "aqiLevel": "Fair",
  "pollutants": {
    "carbonMonoxide": 287.45,
    "nitrogenDioxide": 14.56,
    "nitrogenMonoxide": 2.3,
    "ozone": 45.67,
    "sulphurDioxide": 3.21,
    "particulateMatter2_5": 12.45,
    "particulateMatter10": 25.67,
    "ammonia": 1.23
  },
  "timestamp": "2026-06-17T18:30:00.000Z"
}
```

## Complete Dashboard Endpoint

### 6. Get Complete Weather Dashboard

**Endpoint:** `GET /api/weather/dashboard?city=London&units=metric`

**Query Parameters:**
- `city` (required OR use lat/lon): City name
- `lat` (required if no city): Latitude
- `lon` (required if no city): Longitude
- `units` (optional): `metric`, `imperial`, `standard`. Default: `metric`

**Description:** Get current weather, 5-day forecast, and air quality in one request.

**Example Request:**
```bash
curl "http://localhost:3000/api/weather/dashboard?city=London"

# Or with coordinates
curl "http://localhost:3000/api/weather/dashboard?lat=51.5&lon=-0.1"
```

**Example Response:**
```json
{
  "success": true,
  "dashboard": {
    "location": {
      "name": "London",
      "country": "GB",
      "coordinates": {
        "latitude": 51.51,
        "longitude": -0.13
      }
    },
    "current": {
      "temperature": 15.2,
      "feelsLike": 14.8,
      "humidity": 72,
      "description": "Clouds",
      "windSpeed": 4.5,
      "visibility": 10000,
      "sunrise": "2026-06-17T04:45:00.000Z",
      "sunset": "2026-06-17T21:15:00.000Z"
    },
    "forecast": {
      "2026-06-18": [...],
      "2026-06-19": [...]
    },
    "airQuality": {
      "aqi": 2,
      "aqiLevel": "Fair",
      "pollutants": {...}
    }
  }
}
```

## Weather Icons

OpenWeatherMap provides weather condition icons. Display them using:

```
https://openweathermap.org/img/wn/{icon}@2x.png
```

Common icons:
- `01d` - Clear sky (day)
- `01n` - Clear sky (night)
- `02d` - Few clouds (day)
- `02n` - Few clouds (night)
- `03d` - Scattered clouds
- `04d` - Broken clouds
- `09d` - Shower rain
- `10d` - Rain
- `11d` - Thunderstorm
- `13d` - Snow
- `50d` - Mist

## Temperature Conversions

### Celsius to Fahrenheit
```
(celsius × 9/5) + 32
```

### Fahrenheit to Celsius
```
(fahrenheit - 32) × 5/9
```

### Kelvin to Celsius
```
kelvin - 273.15
```

## Air Quality Index (AQI) Levels

| AQI | Level | Description |
|-----|-------|-------------|
| 1 | Good | Air quality is satisfactory |
| 2 | Fair | Air quality is acceptable |
| 3 | Moderate | Members of sensitive groups may experience health effects |
| 4 | Poor | Some members of general public may experience health effects |
| 5 | Very Poor | Health alert |

## Error Responses

### Bad Request

**Status Code:** 400

```json
{
  "success": false,
  "error": "City parameter is required"
}
```

### Not Found

**Status Code:** 404

```json
{
  "success": false,
  "error": "Weather data not found",
  "message": "city not found"
}
```

### Server Error

**Status Code:** 500

```json
{
  "success": false,
  "error": "Failed to fetch weather",
  "message": "API Error"
}
```

## Usage Examples

### JavaScript/Node.js

```javascript
// Get current weather
const getWeather = async (city) => {
  const response = await fetch(
    `http://localhost:3000/api/weather/current?city=${city}`
  );
  const data = await response.json();
  console.log(data.current);
};

// Get complete dashboard
const getDashboard = async (city) => {
  const response = await fetch(
    `http://localhost:3000/api/weather/dashboard?city=${city}`
  );
  const data = await response.json();
  console.log(data.dashboard);
};

// Get forecast
const getForecast = async (city) => {
  const response = await fetch(
    `http://localhost:3000/api/weather/forecast?city=${city}`
  );
  const data = await response.json();
  console.log(data.forecast);
};
```

### Python

```python
import requests

# Get current weather
response = requests.get(
    'http://localhost:3000/api/weather/current',
    params={'city': 'London', 'units': 'metric'}
)
print(response.json()['current'])

# Get dashboard
response = requests.get(
    'http://localhost:3000/api/weather/dashboard',
    params={'city': 'London'}
)
print(response.json()['dashboard'])
```

### cURL

```bash
# Get current weather
curl "http://localhost:3000/api/weather/current?city=London"

# Get forecast
curl "http://localhost:3000/api/weather/forecast?city=London"

# Get air quality
curl "http://localhost:3000/api/weather/air-quality?lat=51.5&lon=-0.1"

# Get complete dashboard
curl "http://localhost:3000/api/weather/dashboard?city=London"

# Get weather in Fahrenheit
curl "http://localhost:3000/api/weather/current?city=New%20York&units=imperial"
```

## Features

✅ **Current Weather** - Real-time weather conditions
✅ **5-Day Forecast** - Weather predictions with 3-hour intervals
✅ **Air Quality** - Pollution and AQI data
✅ **Multiple Units** - Celsius, Fahrenheit, Kelvin
✅ **By City** - Search by city name
✅ **By Coordinates** - Search by latitude/longitude
✅ **Complete Dashboard** - All data in one request
✅ **Error Handling** - Comprehensive error responses
✅ **Real-time Data** - Updated from OpenWeatherMap API
✅ **Free API** - Uses OpenWeatherMap free tier

## API Limits

- **Free Tier**: 60 calls/minute
- **Forecast**: 5 days ahead (8-day intervals)
- **History**: Not available on free tier
- **Updates**: Every 10 minutes

## Getting Started

1. **Get API Key:**
   ```bash
   # Visit https://openweathermap.org/api
   # Sign up and get your free API key
   ```

2. **Configure:**
   ```bash
   # Add to .env
   OPENWEATHER_API_KEY=your_key_here
   ```

3. **Test:**
   ```bash
   curl "http://localhost:3000/api/weather/current?city=London"
   ```

Your weather dashboard is ready to use! 🌤️
