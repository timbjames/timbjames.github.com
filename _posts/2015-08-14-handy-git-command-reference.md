---
layout: post
published: true
title: Handy Git command reference
location: Glasgow
author: Tim James
keywords: git, git commands, git ignore, git remove, git branch, git delete branch, git checkout, git merge, git merge branch
tags:
- git
category: blog
---

Sooooo like a lot of developers out there, you probably have moments where you completely forget what git command you need to use for the correct job. There are hundreds even thousands of websites out there all with the same information, so I thought I would write another!

This is primarily just for my own reference though, so I have everything in one place that I can easily find without hunting through my many document locations.

<!--excerpt-->

## Git command reference

### Status

`git status` - BOOM current status of your repository branch.

### Add

`git add --all` - Adds tracked and untracked files that have been updated since last commit.

### Commit

`git commit -m 'commit message'` - Commits what you have just added

`git commit -am 'add and commit in one go'` - Adds tracked files and commits in one quick line.

### Push

`git push origin master` - Pushes changes on branch "master" to your remote "origin".

### Pull

`git pull origin master` - Pulls latest version on branch "master" to your local repository from your remote "origin".

### Branching

`git branch newbranch` - Creates a new branch named "newbranch".

`git checkout newbranch` - Switches to the "newbranch" branch. All changes and commits will now be to this branch.

`git checkout master` - Switches to the "master" branch. All changes and commits will now be to this branch.

`git branch -d newbranch` - Deletes the branch "newbranch" from your local repository.

`git push origin :newbranch` - Deletes the branch "newbranch" from your remote "origin".

### Merging

`git merge newbranch` - Merges the changes in "newbranch" into the current branch you have checked out.

### Deleting

`git rm file.txt` - Deletes the file from your local repository **AND** deletes the file from your file system.

`git rm --cached file.txt` - Deletes the file from your local repository but not the file system.

### Undoing file changes

`git checkout file.txt` - Reverts back to the file from the latest commit on the current branch.

For a full and indepth reference see [gitref.org](http://gitref.org/)