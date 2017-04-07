---
layout: post
published: true
title: dotnet aspnet codegenerator
location: Glasgow
author: Tim James
keywords: dotnet, aspnet, codegenerator, vs17, visual studio 2017
tags:
- dotnet
category: blog
---

I am starting to get a bit annoyed with web development using Visual Studio these days. A lot of the work I have been doing is on the frontend using TypeScript and React, and trying to debug and compile currently involves the use of 3 tools.

On top of this, I have been looking at moving our existing .net core project from Visual Studio 2015 to 2017. So while playing around with a Web Application in VS17, I just want to add a simple MVC Controller. Simples eh? Well not with VS17 it would seem!

![codegenerator](/img/vs17/dotnet-aspnet-codegenerator.JPG)

`There was an error running the selected code generator: No executable found matching command "dotnet-aspnet-codegenetor"`

I have read that you need to "hack" the csproj file to get it to work;

```C#
<ItemGroup>
    <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" Version="1.0.0-msbuild3-final" />
</ItemGroup>
```

Does this work? Heck no. I am going home.

**Update**

Ok so this only seems to be a problem when you right click on the Controllers folder and select Add > Controller. If you just select Add > New Item, then select MVC Controller Class, it lets you add one. Annoying.

<!--excerpt-->



