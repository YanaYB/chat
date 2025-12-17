# Chat Backend — CURL examples

Base URL:
http://localhost:3000

All requests require header:
user-id: <USER_ID>

1. **Create chat**
```
curl -X POST http://localhost:3000/chats 
-H "Content-Type: application/json" \
-H "user-id: user-1" \
-d '{
"systemPrompt": "You are a friendly AI assistant"
}'
```

2. **Get all chats for user**
```
curl -X GET http://localhost:3000/chats 
-H "user-id: user-1"
```

3. **Send message to chat (User → AI)**
```
curl -X POST http://localhost:3000/messages 
-H "Content-Type: application/json" \
-H "user-id: user-1" \
-d '{
  "chatId": "...",
  "content": "Hello! How are you?"
}'
```

4. **Get chat messages (history)**
```
curl -X GET "http://localhost:3000/messages?chatId=..." \
-H "user-id: user-1"
```
