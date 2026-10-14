# Cloud setup and operations

## Verified setup versus scheduling

Repository preparation supports external research and reviewed data PRs. GitHub Pages is configured with build type `workflow`, source `main`, at https://venkata-dora.github.io/contract-job-signal-dashboard/. The owner account was verified to have push/admin access during setup. This does not prove a future cloud task has the same credentials.

The initial setup did not activate a schedule. The follow-up uses the signed-in ChatGPT web Scheduled interface; inspect its run history for current status. The available desktop scheduling tool supports local execution, which requires the Mac and app to be running. It cannot satisfy unattended cloud execution. Official guidance: https://learn.chatgpt.com/docs/automations?surface=app . Cloud scheduling availability and repository execution permissions must be checked in your account; web tasks with connected tools are not automatically repository coding environments.

## Remaining interface setup

1. Merge the setup PR after its build check passes.
2. In ChatGPT web, connect GitHub for `venkata-dora/contract-job-signal-dashboard`. In the repository-capable Codex cloud environment, select this repository/default branch, enable the research network/tools needed for source pages and dependency installation, and verify branch/push/PR access. Do not copy local credentials into the repository.
3. If your account offers cloud scheduled tasks, create a task from Chat/Work and manage it in **Scheduled**. Verify the execution environment can check out the repository, run npm/git, research source pages, and open PRs. If it cannot, this workflow is not supported there; leave the schedule disabled rather than substituting local scheduling or a paid API.
4. Set every day, including weekends, at **8:00 AM America/New_York**. Confirm the saved named timezone and next run time; this must remain 8 AM across daylight saving changes (12:00 UTC in EDT, 13:00 UTC in EST), not a fixed UTC schedule.
5. Paste the prompt below. Enable visible run results and failure/action notifications. Run once manually and verify an actual data PR and Actions validation. Confirm a scheduled cloud run completes while the Mac is off before considering unattended execution verified.

Exact task prompt:

> In venkata-dora/contract-job-signal-dashboard, fetch and start from the latest default branch. Read AGENTS.md and prompts/daily-run.md and execute that daily research workflow for the preceding 24 hours using America/New_York. Research all four categories with web search and opened source pages. Read prompts/c2c-company-research.md and data/c2c-company-watchlist.json; research every watchlisted company and maintain scoped eligibility evidence. Change only lib/seedData.ts and data/c2c-company-watchlist.json, preserve existing IDs/data, and explicitly label inferred demand. Validate with npm ci, npm run typecheck, and GITHUB_REPOSITORY=venkata-dora/contract-job-signal-dashboard npm run build:pages. If qualifying verified news exists, safely create/update daily-news/YYYY-MM-DD and a PR titled “Daily news update YYYY-MM-DD” into the default branch. Automatically squash-merge only data-only PRs limited to those two files whose exact current head passes GitHub Actions validation; do not bypass pending/failed checks or conflicts. Verify Pages deployment. Report sources, coverage, limitations, validation, and PR/check links. Report incomplete research separately from no qualifying news. Keep run results visible; notify for new PRs, failures, incomplete runs, or required action, and stay quiet for unchanged results.

## Review, publish, pause, retry

Review the source evidence, inferences, diff, and successful build check on each PR. Merge the setup PR first, then the data PR. Merging into `main` runs **Deploy GitHub Pages**; inspect its build and deploy jobs in Actions and open the environment URL. Reload the site to load its newly deployed bundle. Returning visitors receive seed IDs absent from their localStorage at the top; existing/manual records remain. Clearing/resetting browser storage intentionally discards manual records.

Pause in **Scheduled** by selecting the task and pausing it (or disable/delete it). Re-enable only after resolving failures. Retry using the same task prompt in the same repository cloud environment; retain that day's branch/PR and inspect it instead of force-pushing or duplicating. For validation failures, fix the intended data and rerun validation/checks before merging. For research failures, restore source access and rerun; do not interpret failure as an empty news day. GitHub Actions “Re-run failed jobs” retries validation/deployment only; it does not redo research.

No branch protection was changed. To enforce review/checks, optionally configure a main ruleset requiring PR review and the workflow's `build` check after it has appeared. A failed check alone does not prevent an administrator from manually merging without such a rule.

## Automatic publishing authorization

The user subsequently requested unattended cloud updates. Routine data-only PRs limited to those two files may now be squash-merged after successful validation of their exact current head SHA. The cloud task may use GitHub connected tools to edit the data and rely on the PR Actions build for npm validation when no shell is available. App/workflow/policy changes remain outside routine run scope. A failed or incomplete run must be reported honestly and must not fabricate news.
