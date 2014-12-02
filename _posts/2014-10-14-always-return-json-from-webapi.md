---
layout: post
published: false
title: Testing Github Pages with Jekyll
location: Glasgow
author: Tim James
tags:
- github
- jekyll
category: blog
video_url: http://www.youtube.com/embed/8gQGHCvMzs8?rel=0&showinfo=0&autohide=1hd=1&wmode=transparent
image_url: /img/blond-boxing-woman-in-black-punching-bag-930x620.jpg
image_alt: this is the image alt
image_caption: This is the caption
image_text: This is the caption text
---

http://stackoverflow.com/questions/9847564/how-do-i-get-asp-net-web-api-to-return-json-instead-of-xml-using-chrome

If you use Asp.Net Web API and are getting sick of Google Chrome returning XML when hitting one of your API Urls, then here is what you need to do to return Json.

In your App_Start folder, edit the WebApiCondig

config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

<!--excerpt-->