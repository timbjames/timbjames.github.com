---
layout: post
published: true
title: Project.deps.json could not be found
location: Glasgow
author: Tim James
keywords: dotnet-framework
tags:
- dotnet-framework
image_url: /img/vnext/asp-net-vnext1.jpg
image_alt: Project.deps.json could not be found
image_caption: Project.deps.json could not be found
image_text: Project.deps.json could not be found
category: blog
---

So you are creating a new ASP.NET Core Web Application (.Net Framework) through visual studio, so select "New Project > Select Template > Name > Ok", then select the Template you want to use. Then run your shiny new website.

BOOM! Build Error

![Build Error](/img/vnext/build-error.jpg) 

There are no errors in the Error List, no warnings and no messages? So you check the build ouput to find

> C:\Program Files (x86)\MSBuild\Microsoft\VisualStudio\v14.0\DotNet\Microsoft.DotNet.Common.Targets(262,5): error : C:\Projects\My Project\error CS2001: Source file 'C:\Projects\My Project\Project.deps.json' could not be found.

<!--excerpt-->

So what is this? Well in my instance, I created the project with the name "My Project" and it turns out that currently you can't have spaces in the folder name! So you will need to recreate your project without spaces in the name.
