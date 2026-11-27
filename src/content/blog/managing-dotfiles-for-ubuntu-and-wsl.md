Setting up a development environment involves small choices that accumulate over time, including shell behavior, Git aliases, editor settings, and terminal profiles. I keep those settings in a dotfiles repository so I can review changes and reuse the shared configuration on another machine.

My setup targets Ubuntu on WSL 2. Native Ubuntu uses the same Linux installation path. The repository also contains reference settings for Windows Terminal and VS Code. This guide follows the installer and scripts in my repository. [Dotfiles source](https://github.com/gbgabiola/dotfiles)

## Understand what the repository manages

Dotfiles are configuration files such as `.zshrc`, `.gitconfig`, and `.vimrc`. Their leading dot makes them hidden in a typical Linux directory listing. Use `ls -a` to see them.

My repository keeps the shared home-directory configuration under `home/`.

```text
dotfiles/
├── home/
│   ├── .gitconfig
│   ├── .gitignore
│   ├── .localrc.example
│   ├── .vimrc
│   └── .zshrc
├── bin/
├── scripts/
├── windows-terminal/
├── vscode/
├── install.sh
├── sync.py
└── restore.py
```

The installer creates symbolic links from the home directory to entries under `home/`. For example, `~/.zshrc` points to the checkout's `home/.zshrc`. Editing the linked file changes the shared configuration in the repository.

The installer skips `.localrc`, `.gitlocal`, and filenames ending in `.example`. These exclusions let me keep machine-specific settings outside the shared files. [Installer implementation](https://github.com/gbgabiola/dotfiles/blob/main/sync.py)

## Prepare Ubuntu and clone the repository

Run the setup inside Ubuntu as your regular user. On WSL, keep the checkout in the Linux home directory so it shares a filesystem with the files being managed.

For a fresh setup, install the prerequisites and clone the repository.

```sh
sudo apt update
sudo apt install git python3 zsh
git clone https://github.com/gbgabiola/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
```

Review the shared files before linking them, especially the Git configuration and shell startup file. Adapt settings to your workflow if you are following this guide with your own fork.

The shell installer delegates to `sync.py`, which uses Python 3. Package installation uses `sudo`; run the dotfiles installer itself as your regular user.

## Preview and install the links

Start with the dry run.

```sh
bash install.sh --dry-run
```

The preview prints the destinations it would link and the existing entries it would back up and replace. It makes no filesystem changes.

When the preview matches what you want, run the installer.

```sh
bash install.sh
```

If a destination already exists, the installer asks whether to back it up and replace it. The default answer is to skip that entry. Approved replacements are saved under a newly created `backup/sync-*` snapshot directory, whose path is printed during installation.

A noninteractive run skips conflicts. Existing links to this checkout are kept, so rerunning the installer reconciles missing links without replacing links that already match.

The backup move requires the snapshot and destination to share a filesystem. Keeping the checkout under `~/.dotfiles` is useful on WSL because moving a checkout onto a Windows-mounted drive can break that assumption.

## Keep personal settings local

The shared `.zshrc` reads `~/.localrc` at the end of shell initialization. Use that file for machine-specific environment variables and editor preferences.

On a fresh setup with no existing `~/.localrc`, copy the template.

```sh
cp -i home/.localrc.example ~/.localrc
```

If you already have a local file, edit it directly. A setting such as the following selects VS Code as the editor when the `code` command is available.

```sh
export EDITOR="code --wait"
```

Keep Git identity in `~/.gitlocal`, which the shared `.gitconfig` includes.

```sh
git config --file ~/.gitlocal user.name "Your Name"
git config --file ~/.gitlocal user.email "you@example.com"
```

Existing `GIT_AUTHOR_NAME` and `GIT_AUTHOR_EMAIL` environment variables take precedence over those Git settings. Remove old exports if you want Git to use the local configuration.

For an older installation that links `~/.localrc` to a tracked file, follow the repository's migration instructions before updating the checkout. Make that override a regular local file first. [Local configuration and migration](https://github.com/gbgabiola/dotfiles#personalize-this-machine)

## Start using Zsh

The repository's `.zshrc` adds available command directories to `PATH`, configures `less`, selects an available editor, and loads the local override file last.

Try an interactive Zsh session first.

```sh
zsh
```

Once you have checked the shell configuration, you can make Zsh your login shell.

```sh
chsh -s "$(command -v zsh)"
```

Start a new login session to use the change. Linking dotfiles and changing the login shell are separate steps.

## Install language tooling when needed

The Node.js helper installs a pinned nvm release and asks nvm to install the current Node.js LTS.

```sh
cd ~/.dotfiles
zsh scripts/nodejs.zsh
```

The helper leaves shell-profile integration to you. Add these lines to `~/.localrc` to make nvm available in new Zsh sessions.

```sh
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ ! -s "$NVM_DIR/nvm.sh" ] || . "$NVM_DIR/nvm.sh"
```

Then use a project's `.nvmrc` to select its required version with `nvm use`.

The Python helper installs a version through pyenv. Install pyenv's build dependencies first, then choose the Python series your project needs.

```sh
zsh scripts/python.zsh 3.14
```

The helper resolves the latest patch in that series known to your pyenv installation and prints a `pyenv local` command. Configure pyenv initialization in `~/.localrc` as described in the repository, open a new shell, and run that printed command from the project directory. The helper leaves the global Python selection in place. [Optional development tools](https://github.com/gbgabiola/dotfiles#optional-development-tools)

## Apply Windows settings separately

The automatic installer manages the Linux home files. Apply the Windows reference settings individually.

| Configuration | Where I use it |
| --- | --- |
| `windows-terminal/settings.json` | Windows Terminal settings, adapting profile GUIDs and shell paths. |
| `vscode/User/settings.json` | VS Code User Settings or WSL Remote Settings, depending on the setting. |
| `.wslconfig` | Selected settings in Windows' `%UserProfile%/.wslconfig`. |
| `etc/wsl.conf` | Selected settings in Ubuntu's `/etc/wsl.conf`. |
| `Startup/hotkeys.ahk` | AutoHotkey v1-style hotkeys with machine-specific paths. |

Merge the settings you need into the existing configuration after reviewing them. The supplied `wsl.conf` changes the Windows drive mount root to `/`, so the C drive appears at `/c`. Check that choice against the paths your tools expect.

The VS Code reference uses Dracula and Material Icon Theme, and its font settings expect installed Nerd Fonts. It also disables automatic application and extension update checks, which makes manual update review part of maintaining that setup. [Configuration reference](https://github.com/gbgabiola/dotfiles#configuration-files)

## Update the shared configuration

Review local changes before updating.

```sh
cd ~/.dotfiles
git status --short
git diff
```

Commit shared changes you want to keep, or stash unfinished work. The updater requires a clean checkout with an upstream branch.

```sh
zsh scripts/update.zsh
```

The script pulls with `--ff-only` and reruns the installer. Ubuntu packages, nvm, pyenv, and language versions have their own update processes.

Removing or renaming a file under `home/` also requires checking its old home-directory link. Sync does not prune retired links. Keep the checkout in place while its symbolic links are in use. [Update script](https://github.com/gbgabiola/dotfiles/blob/main/scripts/update.zsh)

## Restore a replaced file

Use the snapshot path printed during the installation you want to undo. Replace the example snapshot name with that actual path.

```sh
cd ~/.dotfiles
python3 restore.py backup/sync-REPLACE-WITH-YOUR-SNAPSHOT
```

Restore moves saved entries back, consuming them from the snapshot. It restores a destination when it is missing or still points to the managed file in this checkout. Unrelated entries are skipped.

A newly created link that replaced nothing has no original entry in the backup. Remove those links individually if you decide to stop using them.

Restore requires Linux support for atomic no-replace renames, with the snapshot and destination on the same filesystem. If it reports a conflict or interruption, inspect the printed recovery path and snapshot before retrying. Those locations may hold the files needed for recovery. [Restore implementation](https://github.com/gbgabiola/dotfiles/blob/main/restore.py)

## Verify your setup

Check that the shared files resolve to the checkout and that Git reads the expected identity.

```sh
ls -l ~/.zshrc ~/.gitconfig ~/.vimrc
git config --show-origin --get user.name
git config --show-origin --get user.email
```

Open a new terminal and confirm that local overrides load. If you installed language tooling, check `node --version`, `npm --version`, or `pyenv version` from the relevant project directory.

When changing the installer or shared configuration, run the repository's test suite as a regular user with Python 3, Git, Vim, Bash, and Zsh installed.

```sh
cd ~/.dotfiles
python3 -B -m unittest discover -s tests -v
```

The suite exercises the installer, update and restore behavior, and selected configuration helpers using temporary directories. Keeping those checks alongside the dotfiles makes changes easier to review before applying them to another machine.
