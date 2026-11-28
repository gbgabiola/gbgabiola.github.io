---
title: "Fix: GitHub Deployments Showing \"github-pages inactive\""
date: "2026-10-17"
summary: "Switch GitHub Pages to the Actions deployment source and trigger a fresh deployment."
tags: ["github", "deployment"]
---

If your repository shows `github-pages inactive` after switching publishing methods, use the Pages settings and the latest deploy run to check what actually published. This guide assumes you want a custom GitHub Actions workflow to deploy the site.

## Step 1: Switch Your Source to Actions

1. Open the repository and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Check that your intended workflow builds the site, uploads the Pages artifact, and deploys it to the `github-pages` environment. Review its event and branch filters and any environment protection rules.

Selecting the source enables that publishing method. The custom workflow still needs a trigger it can deploy from. [GitHub Pages publishing source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Step 2: Trigger a Fresh Change Push

Choose a trigger that matches your workflow:

- If it allows `workflow_dispatch` and its deploy job accepts manual runs, open **Actions**, select the workflow, and click **Run workflow** on the intended branch.
- If an earlier run used the intended commit and deployment configuration, re-run it from **Actions**. A re-run uses the original commit and ref.
- If the workflow deploys only on a push, merge a real site or workflow change through the repository’s normal PR process into the branch listed in the push trigger.

[Run a workflow manually](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) · [Re-run a workflow](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs)

## Step 3: Monitor the Active Execution

Open the specific run in **Actions** and check the deploy job. If it was skipped, check its condition and the triggering event. If it failed or is waiting, inspect the logs or environment approval state. A successful build alone does not publish the site.

After the deploy job succeeds, open **Settings → Pages** and visit the published URL.
