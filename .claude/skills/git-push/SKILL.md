---
name: git-push
description: Stage, commit, and push changes with auto-generated message
allowed-tools: Bash(git:*)
---

# Git Push Workflow

1. Run `git status` to see all untracked and modified files
2. Run `git diff` to see the actual changes
3. Analyze the changes and generate a concise commit message:
   - Focus on the "why" not the "what"
   - Keep it to 1-2 sentences
   - Use conventional style (e.g., "Add feature", "Fix bug", "Update config")
4. Run `git add .` to stage all changes
5. Run `git commit -m "<generated message>"` with the generated message
6. Run `git push` to push to remote
7. Show `git log --oneline -3` to confirm success

Do not ask for confirmation - just execute the workflow.
