---
layout: post
published: true
title: CSS image captions
location: Glasgow
author: Tim James
tags:
- css
category: blog
---

I have only recently discovered this, but it is something I thought was worth noting down on my blog for my future reference if anything!

Easy CSS image captions using `:after` and the `attr` attribute.

<!--excerpt-->

##HTML

    <div class="caption" title="Hello World!">    
        <img src="http://fillmurray.com/400/400" />    
    </div>

##CSS

    .caption:after{
        content: attr(title);
        position: absolute;
        top: 20px;
        left: 20px;
        color: #fff;
        font-weight: bold;
        background: rgba(111, 111, 111, .3);
        padding: 20px;
        display: none;
    }
    
    .caption:hover:after{
        display: block;
    }

##Results

<div class="caption" title="Hello World!">    
    <img src="http://fillmurray.com/400/400" />    
</div>

<style>
    .caption:after{
        content: attr(title);
        position: absolute;
        top: 20px;
        left: 20px;
        color: #fff;
        font-weight: bold;
        background: rgba(111, 111, 111, .3);
        padding: 20px;
        display: none;
    }
    
    .caption:hover:after{
        display: block;
    }
</style>