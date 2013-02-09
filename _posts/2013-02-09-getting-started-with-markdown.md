---
layout: post
title: Getting to know Markdown
location: Glasgow
author: Tim James
tags:
- markdown
category: blog
---

##Paragraphs

Single line without any additional markup

##Headers

    #h1
    ##h2
    ###h3

##Emphasis

    *italics*
    _italics_
    **bold**
    __bold__

<!--excerpt-->

##Block quotes

    > block quote
    > another bit
    > another bit

    > firstline
    continuation to second line.
    >> second level

##Lists

    * item 1
    * item 2
    * item 3

    + item 1
    + item 2
    + item 3

    - item 1
    - item 2
    - item 3

    1. item 1
    2. item 2
    3. item 3

##Code

Four spaces [tab] before text, or.

    `var a = 1;`

##Links

    [My link text]
    [My second link][second-link]

    [my link text]: http://www.google.com
    [second-link]: http://www.google.com

Shorthand for links

    <http://google.com>

There are some pseudo-protocols you can use in place of the link url;

- abbr:description - The label will be wrapped with an <abbr> tag.
- class:name - The label will be wrapped with a <span class="name"> tag
- id:name - The label will be wrapped with a <a id="name"> tag
- raw:text - The text will be written verbatim to output and not processed

`[IBM](abbr:International Business Machines)`

##Images

Basic

    ![My Image link text](http://images.com/image.png)

With dimensions

    ![My image link text](http://images.com/image.png =150x50)

##Tables

    aaa | bbbb
    :----|:----:
    hello|sailor
    next | line

##Horizontal Rules

    * * *
    ----------
    ___

##Centering

    ->Centered<-

##Thanks to

[http://tedwise.com/markdown/]
[http://tedwise.com/markdown/]:http://tedwise.com/markdown/