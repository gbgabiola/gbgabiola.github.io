## Introduction

Git Bash on Windows can use the Windows OpenSSH Authentication Agent. The service runs independently of Git Bash, so you can use the same loaded key across terminal windows.

## Step 1: Install Git Bash

Install [Git for Windows](https://git-scm.com/downloads/win) and check that the Windows OpenSSH Client is installed. The examples use the usual Windows OpenSSH location. Adjust the path if Windows is installed elsewhere. [Windows OpenSSH setup](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)

## Step 2: Configure SSH Keys

Reuse an existing key if appropriate. To create a key, run the following in PowerShell as your normal user. Choose a passphrase and use a different filename if the suggested path already holds a key.

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Add the `.pub` file’s contents as an authentication key in your GitHub account. Keep the private key on your machine. [Add a public key to GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

## Step 3: Automate SSH-Agent Launch

In an administrator PowerShell window, configure and start the Windows service.

```powershell
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service -Name ssh-agent
```

Switch back to a non-elevated PowerShell window to add the private key. Replace the filename if you used a different key.

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" "$env:USERPROFILE\.ssh\id_ed25519"
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" -l
```

The list should show the loaded key’s fingerprint. Windows manages the agent service, so new Git Bash windows can use it without starting another agent. [GitHub’s Windows ssh-agent instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows)

## Step 4: Configure Git to Use SSH

From the repository in Git Bash, configure Git to use the same Windows OpenSSH client. `--local` limits the setting to this repository and lets the client read your normal SSH configuration.

```bash
git config --local core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
git config --get core.sshCommand
git remote -v
```

Check that the GitHub remote uses an SSH URL such as `git@github.com:owner/repo.git`. An HTTPS remote continues to use HTTPS authentication.

## Step 5: Test Your Configuration

Open a new Git Bash window and test with the Windows client.

```bash
/c/Windows/System32/OpenSSH/ssh.exe -T git@github.com
```

If prompted to trust the host, compare the fingerprint with GitHub’s published fingerprints first. A successful response names your GitHub account and explains that GitHub provides no shell access. The command exits with status `1` even when authentication succeeds. [GitHub SSH connection test](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection) · [GitHub SSH fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)

## Conclusion

The Windows agent can serve multiple Git Bash windows. Set the SSH client per repository when you want that repository to use the Windows agent.
