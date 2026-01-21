---
name: git-push
description: Build, verify, and push changes with auto-generated message
allowed-tools: Bash(git:*), Bash(npm run build), Bash(pnpm build:*), Bash(rm -rf:*)
---

# Git Push Workflow

## 1. Build Verification

Run both builds to verify the code compiles:

1. Run `npm run build` in the root directory (Vite website)
2. Run `cd admin && pnpm build` (Payload CMS admin panel)

If either build fails, STOP and report the error. Do not proceed to commit.

## 2. Clean Build Outputs

If both builds succeed, delete the build outputs:
- `rm -rf dist` (website build output)
- `rm -rf admin/.next admin/.open-next` (admin panel build outputs)

## 3. Git Workflow

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
