# Analysis Responses

## Candidate Information

| Field | Value |
|-------|-------|
| **Name** | |
| **Date** | |

---

# Performance & Architecture Decisions

## Question 1: Performance Bottlenecks

### Bottleneck 1

**What:**  
Unpaginated project and comment queries (fetching all data at once)

**Why it’s a problem:**  
As the number of projects or comments grows, responses become slower, memory usage increases, and the frontend renders more data than needed, hurting performance and user experience.

**Solution:**  
- Add pagination (`limit` / `offset` or cursor-based pagination)  
- Use indexed columns such as `created_at`, `client_id`, and `project_id`  
- Fetch only required fields using DTOs or `select` queries  
- Lazy-load comments (load comments only when needed)

---

### Bottleneck 2

**What:**  
Fetch requests are not being cached

**Why it’s a problem:**  
Every page refresh or route change triggers the same API requests, causing unnecessary network traffic, slower UI response times, and redundant database queries.

**Solution:**  
- Use a client-side data-fetching library such as **React Query** or **SWR** to cache responses  
- Configure stale times and background revalidation  
- Optionally add HTTP cache headers or server-side caching (e.g., Redis) for frequently accessed endpoints  

---

## Question 2: Real-time Updates

**Client request:**  
_"Can we add real-time updates so clients see new comments without refreshing?"_

### Recommended approach
WebSockets using **NestJS Gateway + Socket.IO**

### How it works
- Backend emits a WebSocket event when a new comment is created  
- Clients subscribed to a project receive the event instantly  
- The UI updates locally without a full page refresh  

### Why this approach
- Provides a true real-time experience  
- Efficient for frequent updates  
- Well-supported by NestJS and modern frontend frameworks  
- Scales well using rooms (e.g., one room per project)  

### Trade-offs
- Increased infrastructure complexity  
- Requires managing stateful connections  
- Needs authentication handling for WebSocket connections  
- Slightly higher server resource usage  
