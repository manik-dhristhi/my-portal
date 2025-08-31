# GitHub Integration

The My Backstage Portal provides comprehensive GitHub integration, allowing you to manage repositories, track issues, monitor CI/CD pipelines, and more.

## Features Overview

### 🏠 Repository Information
- Repository metadata and statistics
- README content display
- Branch and tag information
- Contributor insights

### 🐛 Issues Management
- View open and closed issues
- Filter by labels, assignees, and milestones
- Create new issues directly from Backstage
- Issue status tracking and updates

### 🔄 Pull Requests
- Active pull request monitoring
- PR status and review information
- Merge conflict detection
- Automated PR checks status

### 🚀 CI/CD Integration  
- GitHub Actions workflow status
- Build and deployment tracking
- Pipeline success/failure notifications
- Deployment environment status

## Configuration

### Repository Discovery

The catalog automatically discovers repositories using GitHub integration:

```yaml
# app-config.yaml
catalog:
  locations:
    - type: github-discovery
      target: https://github.com/manik-dhristhi
      rules:
        - allow: [Component, System, API, Resource, Location]
```

### Entity Annotations

Components are linked to GitHub repositories using annotations in `catalog-info.yaml`:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-backstage-portal
  annotations:
    # Links to GitHub repository
    github.com/project-slug: manik-dhristhi/my-portal
    
    # GitHub Actions workflows to track
    github.com/workflows: ci.yml,deploy.yml
    
    # Source location for additional context
    backstage.io/source-location: url:https://github.com/manik-dhristhi/my-portal
```

## GitHub Tabs in Component View

When you open a component in Backstage, you'll see several GitHub-related tabs:

### 📊 Overview Tab
- Repository statistics (stars, forks, watchers)
- Recent activity and commit history
- Primary language and technology stack
- Repository health metrics

### 🐛 Issues Tab
- List of open issues with labels and assignees
- Quick filters for issue status and types
- Direct links to create new issues
- Issue priority and milestone tracking

### 🔄 Pull Requests Tab
- Active pull requests with status indicators
- Review approval status
- CI/CD check results
- Merge readiness indicators

### 🚀 CI/CD Tab
- GitHub Actions workflow runs
- Build status for different branches
- Deployment pipeline status
- Historical run data and trends

## Issue Management

### Viewing Issues

Navigate to any component and click the "Issues" tab to see:
- **Open Issues**: Current bugs, features, and tasks
- **Closed Issues**: Recently resolved items
- **Labels**: Categorization and prioritization
- **Assignees**: Team member assignments

### Creating Issues

From the Issues tab, you can:
1. Click "Create Issue" button
2. Fill in title and description
3. Assign labels and team members
4. Set milestones and projects
5. Submit directly to GitHub

### Issue Filtering

Use built-in filters to find specific issues:
- **Status**: Open, Closed, All
- **Labels**: bug, enhancement, documentation
- **Assignee**: Team member assignments
- **Milestone**: Release targets

## CI/CD Pipeline Integration

### Workflow Configuration

Link GitHub Actions workflows in your entity definition:

```yaml
metadata:
  annotations:
    github.com/workflows: ci.yml,deploy.yml,release.yml
```

### Status Monitoring

The CI/CD tab displays:
- **Workflow Runs**: Recent executions with status
- **Branch Protection**: Status checks and requirements
- **Deployment Status**: Production and staging environments
- **Build Artifacts**: Generated packages and releases

### Example Workflow File

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      - run: yarn install
      - run: yarn test
      - run: yarn build
```

## Advanced Features

### Repository Health Insights
- **Code Coverage**: Test coverage metrics
- **Security Alerts**: Vulnerability scanning results
- **Dependency Updates**: Outdated package notifications
- **Performance Metrics**: Build time trends

### Team Collaboration
- **Code Reviews**: PR review status and feedback
- **Team Assignments**: Issue and PR ownership
- **Notification Integration**: Stay updated on changes
- **Project Boards**: Kanban-style project management

## Best Practices

### Repository Structure
```
my-portal/
├── catalog-info.yaml          # Backstage entity definition
├── mkdocs.yml                 # TechDocs configuration
├── .github/
│   └── workflows/             # CI/CD pipeline definitions
├── docs/                      # Documentation source
└── README.md                  # Project overview
```

### Entity Definition
- Use consistent naming conventions
- Include comprehensive tags and labels
- Link related systems and dependencies
- Document APIs and interfaces

### Documentation
- Keep README files up to date
- Use TechDocs for comprehensive guides
- Include architecture diagrams
- Document deployment procedures

## Troubleshooting

### Common Issues

**Repository not showing up in catalog:**
- Check GitHub token permissions
- Verify `catalog-info.yaml` syntax
- Ensure repository is accessible

**Issues tab not loading:**
- Confirm `github.com/project-slug` annotation
- Check GitHub API rate limits
- Verify token has `repo` or `public_repo` scope

**CI/CD status not updating:**
- Validate workflow file names in annotations
- Check workflow permissions and triggers
- Ensure workflows are enabled in repository settings

### Debug Commands

```bash
# Test GitHub API access
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/manik-dhristhi/my-portal

# Validate catalog entity
backstage-cli repo lint

# Check TechDocs build
backstage-cli repo build --all
```

## Next Steps

- [API Reference](../api/overview.md)
- [TechDocs Setup](techdocs.md)
- [Catalog Management](catalog.md)