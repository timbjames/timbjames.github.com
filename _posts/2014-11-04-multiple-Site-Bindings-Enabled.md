---
layout: post
published: true
title: Multiple Site Bindings Enabled
location: Glasgow
author: Tim James
tags:
- asp.net
- wcf
category: blog
---

I was updating a client's site recently which had various Web apps located in the same website folder all sharing the same web.config file. After the update, everything looked as though it was working as expected, however there was something wrong.

**This collection already contains an address with scheme http.**

Luckily my logging code was emailing me the error which was being thrown silently from some Ajax posts.

<!--excerpt-->

The problem was that by default my asp.net 4.5 web application was not allowing multiple IIS bindings.
The solution was pretty easy in the end. It just required an update to the web.config to include `multipleSiteBindingsEnabled="true"`

    <system.serviceModel>    
        <serviceHostingEnvironment multipleSiteBindingsEnabled="true" aspNetCompatibilityEnabled="true" />
    </system.serviceModel>

I cannot remember having to do this with .net 2.0/3.5/4.0 sites, so not sure if this is something that has been introduced to 4.5? If you know more, then please let me know in the comments below.

*Thanks to Stackoverflow users Jeremy and Mike Chaliy for their question/answer at the following url http://stackoverflow.com/questions/561823/wcf-error-this-collection-already-contains-an-address-with-scheme-http*