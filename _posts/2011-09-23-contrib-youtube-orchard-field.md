---
layout: post
title: Contrib Youtube Orchard Field
location: Glasgow
author: Tim James
alias: /contrib-youtube-orchard-field
category: blog
tags:
- orchardcms
---

I recently installed a new Orchard Field written by Andre Rodrigues.

Youtube Field - v0.91

Works like a charm, however breaks the layout of the page (Tested in Google Chrome and not bothered with others as this was broken).

The Field originally renders as

`<div class="youtube-field">
    <iframe 
        width="@Model.ContentField.Width" 
        height="@Model.ContentField.Height" 
        src="http://.../@Model.ContentField.Identifier?hd=1" 
        frameborder="0" 
        allowfullscreen />
</div>`

Which breaks the layout. So I updated it to:

`<div class="youtube-field">
    <iframe 
        width="@Model.ContentField.Width" 
        height="@Model.ContentField.Height" 
        src="http://.../@Model.ContentField.Identifier?hd=1" 
        frameborder="0"
        allowfullscreen="true"></iframe>
</div>`

Fixed!

I am always interested in hearing back from those who read my blog. Please leave a comment if you found this useful, want to suggest any changes to my code, or anything else! Thanks!