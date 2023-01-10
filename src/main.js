const core = require('@actions/core');
const { getOctokit } = require('@actions/github');

let octokit

const initOctokit = (token) => {
  octokit = getOctokit(token);
}

const getDefaultBranch = async (owner, repo) => {
  const res = await octokit.rest.repos.get({
    owner,
    repo
  });
  return res.data.default_branch;
};

const main = async () => {
  const repository = core.getInput('repository').trim();
  const workflow = core.getInput('workflow').trim();
  const inputsJson = core.getInput('inputs').trim();
  let ref = core.getInput('ref').trim();
  let githubToken = core.getInput('token').trim();
  const defaultGithubToken = core.getInput("default-token");

  // if repository not given, use this repository
  let [owner, repo] = repository.split('/');

  githubToken = githubToken || process.env.GITHUB_TOKEN || defaultGithubToken;
  if (!githubToken) {
    throw new Error("No GitHub token provided");
  }

  initOctokit(githubToken)

  // if ref not given, use the default branch
  if (ref === '') {
    ref = await getDefaultBranch(owner, repo);
  }

  const inputs = JSON.parse(inputsJson)

  const res = await octokit.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: workflow,
    ref,
    inputs
  });
  core.info(`${res.status}: ${res.data}`)

};

module.exports = main;
