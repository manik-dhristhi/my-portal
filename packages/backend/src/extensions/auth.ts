// @ts-ignore
import { createBackendModule } from '@backstage/backend-plugin-api';
import { githubAuthenticator } from '@backstage/plugin-auth-backend-module-github-provider';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

const customAuth = createBackendModule({
  // This ID must be exactly "auth" because that's the plugin it targets
  pluginId: 'auth',
  // This ID must be unique, but can be anything
  moduleId: 'custom-github-auth',
  // @ts-ignore
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      // @ts-ignore
      async init({ providers }) {
        providers.registerProvider({
          // This ID must match the actual provider config, e.g. addressing
          // auth.providers.github means that this must be "github".
          providerId: 'github',
          factory: createOAuthProviderFactory({
            authenticator: githubAuthenticator,
            async signInResolver({ profile, result }, ctx) {
              // Debug: Log everything to see what GitHub is returning
              console.log('=== GitHub SignIn Resolver Called ===');
              console.log('Profile:', JSON.stringify(profile, null, 2));
              console.log('Result:', JSON.stringify(result, null, 2));
              console.log('Context:', JSON.stringify({...ctx, issueToken: '[Function]'}, null, 2));
              
              // Try to get username from GitHub profile first
              const githubUsername = (profile as any).login || (profile as any).username || (result as any)?.fullProfile?.username;
              const email = profile.email || (result as any)?.fullProfile?.emails?.[0]?.value;
              const profileId = (profile as any).id || (result as any)?.fullProfile?.id;
              
              console.log('Extracted data:', { githubUsername, email, profileId });
              
              // We need at least some identifier to create a user identity
              if (!githubUsername && !email && !profileId) {
                console.error('No valid identifier found in profile');
                throw new Error('Login failed, no valid user identifier found');
              }
              
              // Use GitHub username if available, otherwise derive from email or use ID
              const username = githubUsername || 
                              (email ? email.split('@')[0] : null) ||
                              (profileId ? `github-user-${profileId}` : 'unknown-user');
              
              // Optional: Add domain validation for additional security
              // const [localPart, domain] = profile.email.split('@');
              // if (!['yourdomain.com', 'gmail.com'].includes(domain)) {
              //   throw new Error(`Login not allowed for domain: ${domain}`);
              // }
              
              // Create a user entity reference without requiring catalog lookup
              const userEntity = stringifyEntityRef({
                kind: 'User',
                name: username,
                namespace: DEFAULT_NAMESPACE,
              });

              // Issue token with user identity - this bypasses catalog user lookup
              return ctx.issueToken({
                claims: {
                  sub: userEntity, // Subject (user identity)
                  ent: [userEntity], // Ownership references (what the user owns/can access)
                },
              });
            },
          }),
        });
      },
    });
  },
});

export default customAuth;