---
layout: post
published: true
title: DNX SDK version 'dnx-clr-win-x86.1.0.0-beta5' failed to install.
location: Glasgow
author: Tim James
tags:
- aspnet5
- vs2015
category: blog
---

I have been playing around with Visual Studio 2015 preview for a while now (nothing hard core), so naturally I want to install the final version when it was released. Straight away I came across a couple little issues which made the install/startup not so simple.

<!--excerpt-->

Firstly, when trying to install the final version, it will not install side-by-side with the preview version, so you will need to uninstall this. This seemed to take quite a while to do, so ended up just leaving this running overnight.

Secondly, and much more of an issue, was when I decided to create a new asp.net 5 Web Application. I recieved this error:

![DNX SDK Version](/img/vnext/dnx-sdk.jpg)
`DNX SDK version 'dnx-clr-win-x86.1.0.0-beta5' failed to install`

Now this is a known issue already, but I thought I would just put a little post up on my website for future reference.

***Solution***

The problem is down to not having Powershell 3.0 installed on your machine, so just head on over to [Windows Management Framework 3.0](https://www.microsoft.com/en-gb/download/details.aspx?id=34595) and download the version for you. I downloaded version `Windows6.1-KB2506143-x64.msu`. Notice at this point, and I am not sure if it just me, but the download option doesn't work as the link is blocked due to some files on the page being loaded via http rather than https. I just opened up my Network console and opened the download link directly in the browser.
When installing, you will go through the standard installation process, so just follow the instructions on screen. Once installed you might have to reboot your machine, I do...

Once rebooted, open VS2015 and create a new asp.net 5 project. Hopefully everything will now be ok!