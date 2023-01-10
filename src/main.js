const core = require("@actions/core");
const { context } = require("@actions/github");
const { getOctokit } = require("@actions/github");

let octokit;

const initOctokit = (token) => {
  octokit = getOctokit(token);
};

const getDefaultBranch = async (owner, repo) => {
  const res = await octokit.rest.repos.get({
    owner,
    repo,
  });
  return res.data.default_branch;
};

const main = async () => {
  const repository = core.getInput("repository");
  const workflow = core.getInput("workflow", { required: true });
  const inputsJson = core.getInput("inputs");
  let ref = core.getInput("ref");
  let githubToken = core.getInput("token");
  const defaultGithubToken = core.getInput("default-token");

  const [owner, repo] = repository.split("/");

  githubToken = githubToken || process.env.GITHUB_TOKEN || defaultGithubToken;
  if (!githubToken) {
    throw new Error("No GitHub token provided");
  }

  initOctokit(githubToken);

  if (!ref) {
    if (owner === context.repo.owner && repo === context.repo.repo) {
      // On the same repository
      if (context.eventName === "pull_request") {
        ref = context.payload.pull_request.head.ref;
      } else {
        ref = context.ref;
      }
    } else {
      // On another repository
      ref = await getDefaultBranch(owner, repo);
    }
  }
  core.debug(`ref: ${ref}`);

  const inputs = JSON.parse(inputsJson);

  await octokit.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: workflow,
    ref,
    inputs,
  });
};

module.exports = main;
