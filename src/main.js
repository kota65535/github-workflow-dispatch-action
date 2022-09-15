const core = require('@actions/core');
const { context, getOctokit } = require('@actions/github');

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

  // if repository not given, use this repository
  let owner, repo;
  if (repository === '') {
    owner = context.repo.owner;
    repo = context.repo.repo;
  } else {
    [owner, repo] = repository.split('/');
  }

  // github token can be also given via env
  githubToken = githubToken || process.env.GITHUB_TOKEN;
  if (githubToken === '') {
    throw new Error('Need to provide one of token or GITHUB_TOKEN environment variable');
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
