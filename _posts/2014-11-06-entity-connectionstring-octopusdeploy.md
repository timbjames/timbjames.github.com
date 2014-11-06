---
layout: post
published: true
title: Entity Connection String within Octopus Deploy
location: Glasgow
author: Tim James
tags:
- octopus-deploy
category: blog
image_url: /img/octopus-logo.jpg
image_alt: Octopus Deploy
---

I have been using Octopus Deploy more and more recently and it is quickly becoming my deployment tool of choice. If you haven't heard about it, then I would highly recommend that you go and check it out now! [Octopus Deply]: https://octopusdeploy.com/

One of the projects I have been working on uses the EntityFramework for data access, so there is a `System.Data.EntityClient` connection string within the web.config. The EntityClient connection string differs from the standard SqlClient string in that it contains metadata along with the connection string. It also contains `&quot;` within this string.

<!--excerpt-->

##Problem

Here lies the problem. If you want to replace the connection string using variables within Octopus deploy, then the connection string (by default) will not be replaced correctly. What ends up happening is that `&quot;` is replaced with `&amp;quot;` which results in a broken EntityClient!

Now this is by design within Octopus deploy and there is an argument whether this is actually a [bug or a feature]: http://help.octopusdeploy.com/discussions/problems/3609-ampersand-and-escaping-of-environment-variables

##Solution

The solution to this is pretty simple actually. If you copy your EntityClient connection string, then paste into an Octopus deploy varaible, replace `&quot;` with `"`. When Octopus replaces the connection string in the web.config it automatically translates `"` back into `&quot;`!

Job done!