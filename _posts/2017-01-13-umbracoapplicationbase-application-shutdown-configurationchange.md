---
layout: post
published: true
title: UmbracoApplicationBase Application shutdown. Details: ConfigurationChange
permalink: /blog/:year/:month/:day/umbracoapplicationbase-application-shutdown-configurationchange
location: Glasgow
author: Tim James
keywords: umbraco, applicationpool
tags:
- umbraco
- applicationpool
category: blog
image_url: /img/umbraco/umbraco-azure.jpg
image_alt: UmbracoApplicationBase Application shutdown. Details: ConfigurationChange
image_caption: UmbracoApplicationBase Application shutdown. Details: ConfigurationChange
image_text: UmbracoApplicationBase Application shutdown. Details: ConfigurationChange
sitemap:
  lastmod: 2017-01-13
  priority: 0.7
  changefreq: 'monthly'
  exclude: 'no'
---

Wow! Has it been so long since my last blog post?! Seems to be! Well why not stick one up on Friday 13th! I have been exceptionally busy for the past year, with a really large project in work which has eaten up all development my time, then family life has taken up the rest.

One of the projects I have been working on recently in work involved using the latest version of Umbraco hosted on an Azure VM (Windows Server 2012 R2). The Umbraco installation is just a standard one, and there is nothing fancy within it. Just some datatypes, templates, views and some macros.
The dynamic data of the site is loaded via a separate API on the same Azure VM.

My client was complaining that the site was slow to load, which I had just put down to it being a test site and the application pool recycling due to inactivity. However I then started to notice that it was exceptionally slow after creating/editing pages in the CMS. I had mentioned this to another developer in the office, and he had said he had a similar issue with another client's installation, but when the site went live, it all sorted itself out.

Today though, I was speaking to another developer who manages another client using Umbraco on another Azure VM, and he was having a similar problem to me on a live site. So we decided to look deeper into this issue and found this nice little error in the Umbraco log file.

    2017-01-13 09:52:11,148 [P5216/D2/T4] INFO  Umbraco.Core.UmbracoApplicationBase - Application shutdown. Details: ConfigurationChange

    _shutDownMessage=IIS configuration change
    HostingEnvironment initiated shutdown
    HostingEnvironment caused shutdown

    _shutDownStack=   at System.Environment.GetStackTrace(Exception e, Boolean needFileInfo)
       at System.Environment.get_StackTrace()
       at System.Web.Hosting.HostingEnvironment.InitiateShutdownInternal()
       at System.Web.Hosting.HostingEnvironment.InitiateShutdownWithoutDemand()
       at System.Web.Hosting.PipelineRuntime.StopProcessing()

<!--excerpt-->

Now that we had noticed the error and talking about it in the office, one of our contractors mentioned that it might be a known issue in that Umbraco updates files in the App_Data folder, which then causes IIS to freak out and restart the Application Pool. The issue is being tracked on umbraco.org [High IO operations on Windows 2012 R2/Windows 8, application shuts down with the ConfigurationChange reason](http://issues.umbraco.org/issue/U4-6338)

Right at the top of this issue, there is a link to a Microsoft hotfix [support.microsoft.com/en-us/kb/3052480](https://support.microsoft.com/en-us/kb/3052480). I installed this to my Azure VM, restarted, and straight away you could see the difference in the site.

Why am I writing this blog post about something that is already readily available on the umbraco website? Well, mainly to get out of under the rock and start blogging again, also to make a point. Developers, make sure you are talking amoungst yourselves in your office/community. If you are having issues, talk about them with everyone, as the chances are someone else has experienced the problem and has a solution, or others are seeing the same thing.