---
layout: post
published: true
title: Stopping and Starting your Application Pool with Octopus Deploy
location: Glasgow
author: Tim James
tags:
- octopus-deploy
category: blog
---

Depending on your Web Server set up, you might not be able to overwrite the Bin folder without some manually intervention. Usually it is because there is a process using files within the Bin folder and you will have to stop the application pool first.

Octopus will soon inform you if this is the case when deploying your package to the server, and will give you the error message:

<span color="red">`One or more files in the directory may be locked by another process. You could use a PreDeploy.ps1 script to stop any processes that may be locking the file. Error details follow.`</span>

<!--excerpt-->

There is a pretty easy solution for this. You can run some Custom PowerShell scripts during Pre/Post deployment.

To set up the Pre/Post deployment scripts within the deployment of a NuGet package step, select the step and click on Configure features. This will then give you the option to Enable Custom PowerShell scripts.

![Export Layers to files options](/img/custom-scripts.jpg)

This will then give you the option to enter pre-deployment, deployment and post-deployment scripts. You will want to enter the [Stop PowerShell script](http://library.octopusdeploy.com/#!/step-template/actiontemplate-iis-apppool-stop) in the pre box.

![Export Layers to files options](/img/pre-deploy.png)

And then the [Start PowerShell script](http://library.octopusdeploy.com/#!/step-template/actiontemplate-iis-apppool-start) in the post box.

![Export Layers to files options](/img/post-deploy.png)

In both scripts, you will notice <span style="color: red;">`appPoolName`</span>, this is a Variable which you will need to set up with the name of the application pool named `AppPoolName`.

In your next release you will see two additional steps in the Task Log. If you see these and everything is green then you know everything is ok!

![Export Layers to files options](/img/pre-deploy-success.png)
![Export Layers to files options](/img/post-deploy-success.png)

Job Done!

Many thanks to [@ahandersson](https://twitter.com/ahandersson) for helping me out over in the [Octopus Jabbr room](https://jabbr.net/#/rooms/octopus)



