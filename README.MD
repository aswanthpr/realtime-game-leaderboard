# 🎮 Realtime Game Leaderboard System  

A **realtime game leaderboard backend system** built with **Node.js, Express, TypeScript**, and **Socket.IO**.  
It provides **real-time updates** to players’ scores, caching for high performance, and a clean **Service-Repository architecture**.  

---

## 🚀 Features  

- **Realtime Leaderboard**: Player scores are updated instantly across all connected clients using **Socket.IO**.  
- **REST API + WebSocket**: Combination of **HTTP endpoints** for initial data fetching and **WebSocket events** for live updates.  
- **Redis Caching**: Frequently accessed leaderboard data is cached for faster reads.  
- **MongoDB Database**: Stores player data with **connection pooling** and **indexing** for optimized queries.  
- **Compression**: API responses are compressed to reduce payload size.  
- **Rate Limiting**: Protects the server from excessive requests.  
- **Service-Repository Pattern**: Clean architecture with clear separation of concerns.  
- **TypeScript**: Strong static typing for better maintainability and fewer runtime errors.  

---

## 📡 API Endpoints  

### REST Endpoints  
Base URL: `http://localhost:3000/leaderboard`  

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/`              | Fetch leaderboard data             |
| POST   | `/player`        | Create a new player & save score   |
| PATCH  | `/player`        | Update an existing player’s score  |


### Query Parameters  
You can fetch leaderboard data using query parameters for **mode**, **region**, **limit**, **page**, and **sort**. 
###http://localhost:3000/leaderboard?mode=Arena&region=ASIA&limit=5&page=1&sort=desc


| Parameter | Type   | Allowed Values                              | Description               |
|-----------|--------|---------------------------------------------|---------------------------|
| `mode`    | string | `"Battlegruond"` \| `"Arena"` \| `"Evo"`    | Game mode                 |
| `region`  | string | `"ASIA"` \| `"EU"` \| `"US"` \| `"GLOBAL"`  | Player region             |
| `limit`   | number | Any positive integer                        | Number of results per page|
| `page`    | number | Any positive integer                        | Page number for pagination|
| `sort`    | string | `"asc"` \| `"desc"`                         | Sort order of scores      |



### Example Request  

### Socket Events  

| Event                   | Direction | Description                                |
|--------------------------|-----------|--------------------------------------------|
| `leaderboard:update`     | Server → Client | Broadcast updated leaderboard data |
| `leaderboard:fetch`      | Client → Server | Request leaderboard data from server |

---

## ⚙️ Environment Variables  

Create a `.env` file in the root directory with the following:  

```env
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URL=mongodb://127.0.0.1:27017/
