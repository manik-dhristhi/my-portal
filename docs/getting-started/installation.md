# Installation Guide

This guide will help you set up the My Backstage Portal on your local development environment.

## Prerequisites

- **Node.js 18.x** (LTS recommended)
- **yarn** package manager
- **Git** version control
- **GitHub account** for OAuth integration

## Step 1: Clone Repository

```bash
git clone https://github.com/manik-dhristhi/my-portal.git
cd my-portal
```

## Step 2: Node.js Version Management

We recommend using Node.js 18.x for compatibility:

```bash
# If using nvm
nvm install 18.20.8
nvm use 18.20.8

# Verify version
node --version
# Should output: v18.20.8
```

## Step 3: Install Dependencies

```bash
# Install all workspace dependencies
yarn install
```

This will install dependencies for both the frontend (`packages/app`) and backend (`packages/backend`).

## Step 4: GitHub Integration Setup

### Create GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `My Backstage Portal`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:7007/api/auth/github/handler/frame`
4. Save the Client ID and Client Secret

### Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Select scopes:
   - `public_repo` - Access public repositories
   - `read:user` - Read user profile data
   - `read:org` - Read organization membership (if needed)
4. Generate and copy the token

### Configure Local Environment

Create `app-config.local.yaml`:

```yaml
# app-config.local.yaml
auth:
  providers:
    github:
      development:
        clientId: 'YOUR_GITHUB_CLIENT_ID'
        clientSecret: 'YOUR_GITHUB_CLIENT_SECRET'

integrations:
  github:
    - host: github.com
      token: YOUR_GITHUB_TOKEN
```

## Step 5: Start the Application

```bash
yarn start
```

This will start both:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:7007

## Verification

1. Navigate to http://localhost:3000
2. Click "Sign In" and authenticate with GitHub
3. Explore the Software Catalog to see your repositories
4. Check TechDocs for this documentation

## Troubleshooting

### Port Conflicts
If ports 3000 or 7007 are in use:
```bash
# Kill existing processes
pkill -f "yarn start"
pkill -f "backstage-cli"
```

### Node.js Version Issues
Make sure you're using Node.js 18.x:
```bash
node --version
# If not 18.x, switch versions with nvm
nvm use 18.20.8
```

### GitHub Token Issues
Verify your token has correct permissions:
```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
```

## Next Steps

- [Configuration Guide](configuration.md)
- [Authentication Setup](authentication.md)
- [GitHub Integration](../features/github-integration.md)