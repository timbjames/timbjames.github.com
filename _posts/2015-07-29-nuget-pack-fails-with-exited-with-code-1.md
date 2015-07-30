---
layout: post
published: true
title: NuGet pack fails with exited with code 1
keywords: nuget pack, exited with code 1
location: Glasgow
author: Tim James
tags:
- nuget
- windows7
category: blog
---

We had a very annoying issue in the office recently regarding building a NuGet package with a Post-build event command line. One of our developers had created a Utilities project which would be installed via our local NuGet store, and had added the Post-build event to create the NuGet package.

The Post-build command was pretty simple and worked. It is the command which is referenced on the [nuget.org Creating and Publishing](https://docs.nuget.org/create/creating-and-publishing-a-package) a Package website

`$(SolutionDir).nuget\nuget.exe pack $(ProjectDir)$(ProjectFileName) -Prop Configuration=$(ConfigurationName) -Prop`

Everything was working great on the original developer's machine, also on another guys machine, but not on mine or the 4th developer's. Both I and the other developer are on Windows 7, the other two guys are on Windows 8. The Windows 7 machines were getting the error:

`The command "C:\Projects\SolutionFolder\.nuget\nuget.exe pack C:\Projects\SolucationFolder\ProjectFolder\project.csproj -Prop Configuration=Debug" exited with code 1.`

<!--excerpt-->

This error didn't really give much information, so after a bit of searching the web I [read](http://stackoverflow.com/questions/22151402/how-can-i-resolve-the-error-the-command-exited-with-code-1) that it would be useful to turn on Diagnostic build output verbosity. So I switched this on, built the project and looked through the Build output to see a line:


    Task "Exec" (TaskId:83)
      Task Parameter:WorkingDirectory=bin\Debug\ (TaskId:83)
      Task Parameter:Command=C:\Projects\SolutionFolder\.nuget\nuget.exe pack C:\Projects\SolucationFolder\ProjectFolder\project.csproj -Prop Configuration=Debug (TaskId:83)
      C:\Projects\SolutionFolder\.nuget\nuget.exe pack C:\Projects\SolucationFolder\ProjectFolder\project.csproj -Prop Configuration=Debug (TaskId:83)
      Attempting to build package from 'project.csproj'. (TaskId:83)
      Packing files from ''. (TaskId:83)
      Using 'project.nuspec' for metadata. (TaskId:83)
      The path is not of a legal form. (TaskId:83)
    C:\Program Files (x86)\MSBuild\14.0\bin\Microsoft.Common.CurrentVersion.targets(4713,5): error MSB3073: The command "C:\Projects\SolutionFolder\.nuget\nuget.exe pack C:\Projects\SolucationFolder\ProjectFolder\project.csproj -Prop Configuration=Debug" exited with code 1.
    Done executing task "Exec" -- FAILED. (TaskId:49)

This again didnt't really give much information either. So we decided to see what would happen if we ran the command straight through a Command Prompt window. This then gave us another error:

`Unable to find 'project.dll'. Make sure the project has been built`

WTF! The project was being built, and the dll's were in the bin/debug folder!

###Solution

After spending a couple of hours on this, what we really needed was a beauty sleep. The next morning within 5 mins the original developer [discovered](http://stackoverflow.com/questions/21583070/nuget-pack-fails-with-unable-to-find-outputpathitem-fullpath) the solution.

All it took was adding an extra `-Prop` at the end of the command line:

$(SolutionDir).nuget\nuget.exe pack $(ProjectDir)$(ProjectFileName) -Prop Configuration=$(ConfigurationName) -Prop Platform=AnyCPU

We are still not sure what the issue was and why this fixes it. It must be something to do with Win7 vs Win8 mixed with NuGet.exe and the command line (I am not 100% sure what though, so if you know why, **comment below and let me know**).