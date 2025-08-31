# API Overview

The My Backstage Portal provides a comprehensive RESTful API that powers the frontend interface and enables programmatic access to catalog data, documentation, and GitHub integrations.

## Base URLs

- **Development**: `http://localhost:7007/api`
- **Production**: `https://your-domain.com/api`

## Authentication

All API requests require authentication via JWT tokens obtained through the GitHub OAuth flow.

### Headers

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Core API Endpoints

### Catalog API

Manage software catalog entities including components, systems, APIs, and resources.

#### Get All Entities
```http
GET /catalog/entities
```

**Query Parameters:**
- `filter` - Filter by entity properties (e.g., `kind=component`)
- `fields` - Specify fields to return
- `limit` - Maximum number of results (default: 20)
- `offset` - Pagination offset

**Example Response:**
```json
{
  "items": [
    {
      "apiVersion": "backstage.io/v1alpha1",
      "kind": "Component", 
      "metadata": {
        "name": "my-backstage-portal",
        "namespace": "default",
        "tags": ["backstage", "learning", "portal"]
      },
      "spec": {
        "type": "website",
        "lifecycle": "experimental",
        "owner": "manik-dhristhi"
      }
    }
  ],
  "totalItems": 1,
  "pageInfo": {
    "hasNextPage": false
  }
}
```

#### Get Entity by Name
```http
GET /catalog/entities/by-name/{kind}/{namespace}/{name}
```

#### Create/Update Entity
```http
POST /catalog/locations
Content-Type: application/json

{
  "type": "url",
  "target": "https://github.com/manik-dhristhi/my-portal/blob/main/catalog-info.yaml"
}
```

### TechDocs API

Access generated documentation for components.

#### Get Documentation
```http
GET /techdocs/static/docs/{namespace}/{kind}/{name}
```

#### Get Documentation Metadata
```http
GET /techdocs/{namespace}/{kind}/{name}
```

### GitHub Integration API

Access GitHub repository data, issues, and CI/CD information.

#### Get Repository Information
```http
GET /github/repositories/{owner}/{repo}
```

#### Get Repository Issues
```http
GET /github/repositories/{owner}/{repo}/issues
```

**Query Parameters:**
- `state` - Issue state: `open`, `closed`, `all`
- `labels` - Comma-separated list of labels
- `assignee` - Filter by assignee username
- `sort` - Sort order: `created`, `updated`, `comments`

#### Get Workflow Runs
```http
GET /github/repositories/{owner}/{repo}/actions/runs
```

### Search API

Search across all catalog entities and documentation.

#### Search Entities
```http
GET /search/query?term={search_term}
```

**Query Parameters:**
- `term` - Search term
- `types` - Entity types to include
- `filters` - Additional filters

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": {
    "name": "ValidationError",
    "message": "Invalid entity definition",
    "details": {
      "field": "metadata.name",
      "issue": "Name must be lowercase"
    }
  }
}
```

## Rate Limiting

- **Authenticated requests**: 1000 requests per hour
- **GitHub API**: Subject to GitHub's rate limits
- **Search API**: 100 requests per minute

Rate limit headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

## Webhooks

Configure webhooks to receive notifications about catalog changes.

### Catalog Change Events
```http
POST /webhooks/catalog
Content-Type: application/json

{
  "type": "entity.updated",
  "entity": {
    "kind": "Component",
    "metadata": {
      "name": "my-backstage-portal"
    }
  },
  "timestamp": "2025-08-31T16:00:00Z"
}
```

## SDKs and Client Libraries

### JavaScript/TypeScript

```bash
npm install @backstage/catalog-client
```

```typescript
import { CatalogApi } from '@backstage/catalog-client';

const catalogApi = new CatalogApi({
  baseUrl: 'http://localhost:7007/api',
  token: 'your-jwt-token'
});

const entities = await catalogApi.getEntities();
```

### Python

```bash
pip install backstage-client
```

```python
from backstage_client import BackstageClient

client = BackstageClient(
    base_url='http://localhost:7007/api',
    token='your-jwt-token'
)

entities = client.catalog.get_entities()
```

## OpenAPI Specification

Full API specification is available at:
- **Interactive docs**: `http://localhost:7007/api/docs`
- **OpenAPI JSON**: `http://localhost:7007/api/docs/openapi.json`

## Examples

### Create a New Component

```bash
curl -X POST http://localhost:7007/api/catalog/locations \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "url",
    "target": "https://github.com/username/repo/blob/main/catalog-info.yaml"
  }'
```

### Search for Components

```bash
curl "http://localhost:7007/api/search/query?term=backstage&types=Component" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Get GitHub Issues

```bash
curl "http://localhost:7007/api/github/repositories/manik-dhristhi/my-portal/issues?state=open" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

## Next Steps

- [Detailed Endpoints](endpoints.md)
- [Authentication Guide](../getting-started/authentication.md)
- [GitHub Integration](../features/github-integration.md)