---
layout: post
published: false
title: Animating CSS display property
location: Glasgow
author: Tim James
tags:
- css
- animation
category: blog
---

You may or maynot know, but you can't use CSS3 transitions to animate the css property `display`. So going from `display: none;` to `display: block;` with a transtion property of `transition: display 5s ease;` will not result in your html element fading in :(

One quick solution to this is to animate the opacity of the element, which will result in the effect you are looking for, e.g.

###css

    .slide{
        width: 400px;
        height: 400px;
        background-color: gold;
        opacity: 0;
        transition: all 2s ease;
    }

    .slide.active{
        opacity: 1;
    }

##demo
[Click to view demo on JSBin](http://jsbin.com/cigimeqewe/1/edit?html,css,output)

<!--excerpt-->

The downside to this though is that the element is still on the page, so if you wanted to create a quick and dirty slideshow, which layers absolutely positioned `<div>` tags on top of each other, then the upper most element is always there and would prevent you from clicking on the bottom element.

http://www.impressivewebs.com/animate-display-block-none/