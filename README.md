# github-workflow-dispatch-action

GitHub Action for sending GitHub workflow-dispatch event.

## Inputs

| Name                | Description                                   | Required | Default                                                 |
|---------------------|-----------------------------------------------|----------|---------------------------------------------------------|
| `repository`    | Job name where `terraform plan` has been run  | Yes      | N/A                                                     |
| `plan-step`         | Step name where `terraform plan` has been run | Yes      | N/A                                                     |
| `workspace`         | Terraform workspace name                      | No       | N/A                                                     |
| `github-token`      | GitHub token                                  | No       | `${{ env.GITHUB_TOKEN }}` or<br/> `${{ github.token }}` | 
| `channel`           | Slack channel name                            | No (*1)  | N/A                                                     | 
| `slack-bot-token`   | Slack bot token                               | No (*1)  | `${{ env.SLACK_BOT_TOKEN }}`                            | 
| `slack-webhook-url` | Slack webhook URL                             | No (*1)  | `${{ env.SLACK_WEBHOOK_URL }}`                          | 

