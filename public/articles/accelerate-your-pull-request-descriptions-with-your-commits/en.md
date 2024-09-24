---
slug: pull-request-description-with-commits
title: Accelerate your pull request descriptions with your commits
description: A small trick to use your commits as a base of a pull request
locale: en
date: 2024-8-23
---

# Accelerate your pull request descriptions with your commits

When you are working on a feature or a bug fix, you usually create a branch, make some changes, and then create a pull request. The pull request description is a crucial part of the process. It should explain what the changes are, why they are needed, and how they were implemented.

Writing a good pull request description can be time-consuming, especially if you have made many changes. But there is a small trick that can help you accelerate this process: use your commits as a base for the pull request description.

When you have an already well implemented workflow, your commits probably looks like this:

```
feat(MyComponent): add a new feature to register users
fix(MyOtherComponent): fix a bug that was causing the app to crash when the user tried to login
```

Each commit message is a small description of what was done. You can use these messages as a base for your pull request description. You can copy them directly or use them as a starting point to write a more detailed description.

You can use the following script to generate a pull request description based on your commits:

```bash
git log main..HEAD --pretty=format:%s --reverse | pbcopy
```

Change `main` to the branch you want to compare your current branch to. This script will copy the commit messages to your clipboard. You can then paste them into the pull request description.
