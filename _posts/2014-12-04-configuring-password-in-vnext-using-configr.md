---
layout: post
published: false
title: Configuring password strength in Asp.Net 5 using ConfigR
location: Glasgow
author: Tim James
keywords: asp.net5 vnext, configr, password strength
tags:
- vnext
- asp.net 5
- configr
category: blog
---

<!-- http://marriedgeek.com/dependency-injection-out-of-the-box-with-asp-net-vnext/ -->

Following on from my post [Changing the Password length in Asp.Net vNext Identity](http://timjames.me/blog/2014/12/04/password-length-in-aspnet-vnext/) I want to show you how you can now tidy this all up and use configuration settings rather than hard coding rules in the project.

For this example, I am going to use [ConfigR](https://github.com/config-r/config-r) from [@adamralph](http://twitter.com/adamralph). There is a great post written by [@filip_woj](http://twitter.com/filip_woj) on [Using ConfiR as a Configuration Source in Asp.Net vNext](http://www.strathweb.com/2014/10/using-configr-configuration-source-asp-net-vnext/) for more information.

<!--

Singleton for longlived
Transient for shortlived

-->

<!--excerpt-->