---
layout: post
published: false
title: Creating Your First SignalR Project
location: Glasgow
author: Tim James
tags:
- signalr
category: blog
---

If you haven't already checked out what is going on with SignalR, then I suggest you go take a look over at Scott Hanselman's blog and read up about it http://www.hanselman.com/blog/archives.aspx#SignalR and then go to the SignalR website and read the documentation there http://signalr.net/ as it may be the solution to some of your Real-Time problems that you might come across.

<!--excerpt-->

> ASP.NET SignalR is a new library for ASP.NET developers that makes it incredibly simple to add real-time web functionality to your applications. What is "real-time web" functionality? It's the ability to have your server-side code push content to the connected clients as it happens, in real-time.

##Starters

I have written a very basic tutorial which will help you get going when you are working with an MVC application and want to integrate SignalR.

##Step 1

Open up Visual Studio and create a new MVC 4 project. Name it what ever you like, apart from _SignalR_ If you name it this, then you run into problems with namespaces.

##Step 2

Install the Microsoft AspNet SignalR project via NuGet Package Manager Console.

`Install-Package Microsoft.Aspnet.SignalR`

This will add all the necessary files to your project (SignalR assemblies, Newtonsoft assembly, and various javascript files required). If you don't have NuGet installed in your visual studio, then visit this site for more information on how to install http://nuget.codeplex.com/wikipage?title=Getting%20Started

##Step 3

You will now want to create a Hub to which will be your message "router". So create a new class, I have named mine "SNLR.cs", and add the following code:

    namespace MySignalR
    {
        public class SNRL : Hub
        {
            public void SendMessage(string msg)
            {
                Clients.sendMessage(msg);
            }
        }
    }

##Step 4

If you have chosen the Empty project, then you will need to create a "Shared" folder within your "Views" folder. Within this, then create a new View called "_Layout.cshtml". This will be the layout for your page and will reference all the Javascript files needed.

Once you have created your _Layout page, add a link to the following javascript files, so your page looks like this:

    @{
        Layout = null;
    }
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <title>_Layout</title>
    </head>
    <body>
        <div>        
            @RenderBody()
        </div>
        <script src="~/Scripts/jquery-1.6.4.min.js"></script>
        <script src="~/Scripts/jquery.signalR-0.5.3.min.js"></script>
        <script src="~/signalr/hubs"></script>
        @RenderSection("JavaScript", false)
    </body>
    </html>