const { execSync } = require('child_process');

try {
  const gitEmail = execSync('git config user.email').toString().trim();
  console.log(`Git gitEmail: ${gitEmail}`);

  module.exports = {
    github: {
      release: true,
    },
    git: {
      requireBranch: 'main',
      commitMessage: 'chore: release v${version}',
      commitArgs: ['--no-verify'],
      tagName: `v\${version}-${gitEmail}`,
    },
    hooks: {
      'before:init': ['git pull origin main'],
      'after:bump': 'npx auto-changelog -p',
    },
  };
} catch (error) {
  console.error('Error:', error.message);
}
