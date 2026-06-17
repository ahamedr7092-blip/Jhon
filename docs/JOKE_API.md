# Joke Generator API Documentation

## Overview

The Joke Generator API provides endpoints to fetch random jokes from the JokeAPI service. The API supports both single and two-part jokes across various categories.

## Base URL

```
http://localhost:3000/api/jokes
```

## Endpoints

### 1. Get a Random Joke

**Endpoint:** `GET /api/jokes/random`

**Description:** Fetches a single random joke

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/random
```

**Example Response (Single-part joke):**
```json
{
  "success": true,
  "message": "Here is your random joke!",
  "joke": {
    "type": "single",
    "joke": "Why don't scientists trust atoms? Because they make up everything!",
    "category": "General",
    "flags": {
      "nsfw": false,
      "religious": false,
      "political": false,
      "racist": false,
      "sexist": false,
      "explicit": false
    }
  }
}
```

**Example Response (Two-part joke):**
```json
{
  "success": true,
  "message": "Here is your random joke!",
  "joke": {
    "type": "twopart",
    "setup": "Why did the scarecrow win an award?",
    "delivery": "He was outstanding in his field!",
    "category": "General",
    "flags": {
      "nsfw": false,
      "religious": false,
      "political": false,
      "racist": false,
      "sexist": false,
      "explicit": false
    }
  }
}
```

### 2. Get Multiple Random Jokes

**Endpoint:** `GET /api/jokes/multiple`

**Description:** Fetches multiple random jokes

**Query Parameters:**
- `count` (optional): Number of jokes to fetch (max: 10, default: 3)

**Example Request:**
```bash
# Get 5 jokes
curl "http://localhost:3000/api/jokes/multiple?count=5"
```

**Example Response:**
```json
{
  "success": true,
  "count": 5,
  "jokes": [
    {
      "type": "single",
      "joke": "Why don't scientists trust atoms? Because they make up everything!",
      "category": "General",
      "flags": { /* flags */ }
    },
    {
      "type": "twopart",
      "setup": "Why did the scarecrow win an award?",
      "delivery": "He was outstanding in his field!",
      "category": "General",
      "flags": { /* flags */ }
    }
  ]
}
```

## Error Responses

### Failed to Fetch Joke

**Status Code:** 500

```json
{
  "success": false,
  "error": "Failed to fetch joke",
  "message": "Connection error or API unavailable"
}
```

### Not Found

**Status Code:** 404

```json
{
  "success": false,
  "error": "Not Found",
  "message": "Route /api/invalid not found"
}
```

## Usage Examples

### JavaScript/Node.js

```javascript
// Single joke
fetch('http://localhost:3000/api/jokes/random')
  .then(res => res.json())
  .then(data => console.log(data.joke));

// Multiple jokes
fetch('http://localhost:3000/api/jokes/multiple?count=5')
  .then(res => res.json())
  .then(data => console.log(data.jokes));
```

### Python

```python
import requests

# Single joke
response = requests.get('http://localhost:3000/api/jokes/random')
print(response.json()['joke'])

# Multiple jokes
response = requests.get('http://localhost:3000/api/jokes/multiple?count=5')
print(response.json()['jokes'])
```

### cURL

```bash
# Single joke
curl -X GET http://localhost:3000/api/jokes/random

# Multiple jokes
curl -X GET "http://localhost:3000/api/jokes/multiple?count=3"
```

## Features

✅ **Multiple Joke Formats**: Single-part and two-part jokes
✅ **Category Support**: Various joke categories available
✅ **Content Flags**: NSFW, religious, political, racist, sexist, explicit flags
✅ **Batch Requests**: Get multiple jokes in one request
✅ **Error Handling**: Comprehensive error responses
✅ **Fast Responses**: Optimized for performance

## API Source

This API uses the free **JokeAPI** service:
- **URL**: https://v2.jokeapi.dev
- **Documentation**: https://jokeapi.dev
- **Rate Limiting**: Varies by endpoint

## Joke Categories

The JokeAPI supports the following categories:
- **General** - General jokes
- **Programming** - Programming-related jokes
- **Knock-knock** - Knock-knock jokes
- **Any** - Random from all categories (default)

## Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-06-17T18:00:00.000Z"
}
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Test the API:**
   ```bash
   curl http://localhost:3000/api/jokes/random
   ```

Enjoy the jokes! 😂
