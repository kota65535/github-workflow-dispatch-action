# github-workflow-dispatch-action

GitHub Action for triggering
GitHub [workflow_dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)
event.

## Inputs

| Name         | Description                                           | Required | Default                                                 |
|--------------|-------------------------------------------------------|----------|---------------------------------------------------------|
| `repository` | Owner and repository name                             | No       | `${{ github.repository }}`                              |
| `workflow`   | Workflow ID or file name                              | Yes      | N/A                                                     |
| `ref`        | Git reference for the workflow                        | No       | See (*1)                                                |
| `inputs`     | Input keys and values configured in the workflow file | No       | N/A                                                     |
| `token`      | GitHub token                                          | No       | `${{ env.GITHUB_TOKEN }}` or<br/> `${{ github.token }}` |

1. `ref` default value are determined by the `repository` input and the event type as follows:

| `repository` value             | Event type         | `ref` default value                         |
|--------------------------------|--------------------|---------------------------------------------|
| `${{ github.repository }}`     | `pull_request`     | `${{ github.event.pull_request.head.ref }}` |
| `${{ github.repository }}`     | Not `pull_request` | `${{ github.ref }}`                         |
| Not `${{ github.repository }}` | *                  | Default branch of the repository            |

## Usage

```yaml

  my-job:
    runs-on: ubuntu-latest
    needs:
      - plan
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Trigger the workflow
        uses: kota65535/github-workflow-dispatch-action@v1
        with:
          workflow: do-something.yml
          inputs: '{"foo":"1","bar":"2"}'
```
