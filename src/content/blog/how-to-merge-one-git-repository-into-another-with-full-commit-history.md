---
title: "How to Merge One Git Repository Into Another (With Full Commit History)"
date: "2026-10-24"
summary: "Compare git-filter-repo and Git subtree for combining repositories while preserving their commits."
tags: ["git"]
---

Importing a repository into a subfolder can keep its commit history available from the parent repository. Git filter-repo rewrites the imported paths throughout history. Git subtree keeps the original child commits and places the imported files under a prefix in the parent.

Before using either method, start with a clean working tree in the parent repository and create a branch for the import. Choose an unused destination such as `imported-project/`. The examples assume the child branch is `main`. Substitute its actual name if it differs.

## Method 1: The Gold Standard (git-filter-repo)

Use this method when you want the imported commits to show files under the new subfolder throughout their history. Rewriting paths changes commit IDs in the disposable clone.

### Step 1: Install `git-filter-repo`

Follow the [git-filter-repo installation instructions](https://github.com/newren/git-filter-repo/blob/main/INSTALL.md) for your platform.

### Step 2: Create a Temporary Clone of the Child Repo

Work in a fresh clone so the rewrite cannot affect your original checkout.

```bash
git clone git@github.com:username/child-repo.git child-repo-temp
cd child-repo-temp
```

### Step 3: Shift the Layout Natively

```bash
git filter-repo --to-subdirectory-filter imported-project
```

Review the resulting tree. If you need to map old commit IDs to rewritten ones, keep the clone’s `.git/filter-repo/commit-map`.

### Step 4: Merge Into Your Parent Repository

Switch to the parent repository and its import branch. Fetch the rewritten branch and stop before creating the merge commit so you can inspect the result.

```bash
cd /path/to/main-parent-repo
git remote add local-child /path/to/child-repo-temp
git fetch local-child
git merge --no-commit --allow-unrelated-histories local-child/main
```

`--allow-unrelated-histories` lets Git combine repositories that started independently. Overlapping files or directory paths can still cause conflicts. Inspect `git status` and the staged diff. If the overlap is unexpected, run `git merge --abort` and retry with a different prefix. For an intentional overlap, resolve and stage the specific files, then commit the merge.

```bash
git commit -m "Merge child repo into imported-project/"
git log --graph --oneline
git remote remove local-child
```

### Why this is the best way:

Rewritten commits use `imported-project/` in their trees. For example, `git log --full-history -- imported-project/some-file.txt` can trace changes at that path. Use `git log --follow -- imported-project/some-file.txt` to investigate renames in a single file’s history.

---

## Method 2: The Native Git Alternative (`git subtree`)

Use `git subtree` if your Git installation includes it and you want to keep the child commits’ original IDs.

### Step-by-Step Native Guide

From the parent’s import branch, add the child directly under an unused prefix. Omit `--squash` to retain the child history.

```bash
git remote add temp-source git@github.com:username/child-repo.git
git subtree add --prefix=imported-project temp-source main
```

Git subtree fetches the branch and creates an import commit. Check the files and history before removing the temporary remote. If the prefix exists, choose an unused one before retrying `subtree add`.

### The Catch with `git subtree`

The child’s older commits still store paths at the original repository root. A log filtered to `imported-project/file.txt` may therefore omit those commits. Immediately after the import, inspect the child-side parent using the file’s original path.

```bash
git log HEAD^2 -- file.txt
git remote remove temp-source
```

---

## Comparison: Which should you choose?

| Decision | `git-filter-repo` | `git subtree` |
| :--- | :--- | :--- |
| Paths in imported history | Rewritten under the destination prefix | Original paths in child commits |
| Child commit IDs | Change during the rewrite | Retained without `--squash` |
| Destination checks | Review the rewritten tree and resolve or abort overlap | Use an unused prefix for `subtree add` |

## Summary

Choose git-filter-repo when historical paths should reflect the new layout. Choose subtree when retaining original child commit IDs matters. Inspect the imported files and both histories on the import branch before opening a PR.
