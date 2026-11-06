// Stable identities only; article content and presentation metadata remain in wiki/.
// When moving a file, update its path here while retaining its ID.
export const articleIdentities: Record<string,string> = {
  '01-ai-development/ai-development-without-coding-background': 'ai-development-intro',
  '01-ai-development/first-website-learning-path': 'first-website-path',
  '02-project-planning/plan-your-first-website': 'website-planning',
  '06-project-management/github-first-repository': 'github-first-repository',
  '08-security-deployment/github-account-security-checklist': 'github-account-security',
  '08-security-deployment/publish-first-site-with-github-pages': 'github-pages-intro',
  '06-project-management/project-files-terminal-and-preview': 'project-files-terminal-and-preview',
  '05-ai-collaboration/describe-and-split-ai-tasks': 'describe-and-split-ai-tasks',
  '07-debugging-testing/test-and-accept-website-features': 'test-and-accept-website-features',
  '07-debugging-testing/debug-with-ai-step-by-step': 'debug-with-ai-step-by-step',
  '03-ai-tools/choose-an-ai-development-workflow': 'choose-an-ai-development-workflow',
  '04-technical-basics/how-a-small-website-works': 'how-a-small-website-works',
  '04-technical-basics/api-keys-and-environment-variables': 'api-keys-and-environment-variables',
};
export function articleId(slug:string) { return articleIdentities[slug] ?? `wiki:${slug}`; }
