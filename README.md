# github-workflow-dispatch-action

GitHub Action for sending GitHub [workflow_dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) event.

## Inputs

| Name         | Description                                           | Required | Default                                                                            |
|--------------|-------------------------------------------------------|----------|------------------------------------------------------------------------------------|
| `repository` | Owner and repository name                             | No       | `${{ github.repository }}`                                                         |
| `workflow`   | Workflow ID or file name                              | Yes      | N/A                                                                                |
| `ref`        | Git reference for the workflow                        | No       | On PR: `${{ github.event.pull_request.head.ref }}`<br/>Others: `${{ github.ref }}` |
| `inputs`     | Input keys and values configured in the workflow file | No       | N/A                                                                                |
| `token`      | GitHub token                                          | No       | `${{ env.GITHUB_TOKEN }}` or<br/> `${{ github.token }}`                            | 

## Usage

```yaml

  dispatch:
    runs-on: ubuntu-latest
    needs:
      - plan
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Dispatch workflow
        uses: kota65535/github-workflow-dispatch-action@v1
        with:
          workflow: do-something.yml
          inputs: '{"foo":"1","bar":"2"}'
```
