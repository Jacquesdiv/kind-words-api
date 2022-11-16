# @appstrax/database-api

This library contains a dynamic database service with crud operations, which lets you easily store, sync, and query data for your mobile and web apps using your own database

## Getting Started

Create your Appstrax API here: https://codecapsules.io/.

## End points

```javascript
// Get all documents
GET `${BASE_URL}/api/collection/${collectionName}`
// Get all documents and filter
GET `${BASE_URL}/api/collection/${collectionName}?property=constraint&...`
// Get document by id
GET `${BASE_URL}/api/collection/${collectionName}/${id}`
// Create document (creates collection if collection does not exist)
POST `${BASE_URL}/api/collection/${collectionName}/${id}`
// Edit document
PATCH `${BASE_URL}/api/collection/${collectionName}/${id}`
// Delete document
DELETE `${BASE_URL}/api/collection/${collectionName}/${id}`
```
