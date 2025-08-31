# My Backstage Portal

Welcome to the documentation for My Backstage Portal - a learning platform for exploring Backstage features from basic to advanced concepts.

## Overview

This project demonstrates:
- ✅ **GitHub Authentication** - Custom OAuth resolver with GitHub integration
- ✅ **Software Catalog** - Automatic repository discovery and entity management  
- ✅ **TechDocs** - Documentation site generation from Markdown
- ✅ **GitHub Integration** - Issues, PRs, and workflow visibility
- ✅ **API Management** - RESTful API documentation and discovery

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/manik-dhristhi/my-portal.git
   cd my-portal
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure GitHub integration**
   - Create GitHub OAuth App
   - Generate Personal Access Token
   - Update app-config.local.yaml

4. **Start the application**
   ```bash
   yarn start
   ```

## Architecture

```
┌─────────────────────────────────────────┐
│             Frontend (React)            │
├─────────────────────────────────────────┤
│           Backstage Core API            │
├─────────────────────────────────────────┤
│    GitHub │ TechDocs │ Catalog │ Auth   │
├─────────────────────────────────────────┤
│            SQLite Database              │
└─────────────────────────────────────────┘
```

## Features

### 🔐 Authentication
- GitHub OAuth integration
- Custom identity resolver
- JWT token-based sessions

### 📚 Software Catalog  
- Component discovery from GitHub repositories
- System and API entity definitions
- Dependency mapping and visualization

### 📖 Documentation
- Automated documentation generation with TechDocs
- Markdown-based content authoring
- Search and navigation

### 🔧 GitHub Integration
- Repository information display
- Issues and Pull Request tracking
- CI/CD workflow status

## Getting Help

- [Installation Guide](getting-started/installation.md)
- [Configuration Reference](getting-started/configuration.md) 
- [API Documentation](api/overview.md)
- [Contributing Guidelines](contributing.md)

## Next Steps

Explore the navigation menu to learn more about specific features and how to configure them for your use case.