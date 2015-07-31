---
layout: post
published: true
title: Github Pages with Jekyll and Markdown
location: Glasgow
author: Tim James
tags:
- github
- github-pages
- jekyll
- markdown
category: blog
---

###Github Pages

If you have never heard about Github pages before and are looking for somewhere to host your own personal blog, then I would suggest checking it out now.
[pages.github.com](https://pages.github.com/) host static html websites using your own repository to manage the files. You get one site per GitHub account and unlimited project sites. Simply create a new repository named [username].github.io and you are away!

<!--excerpt-->

Once you have your repository, you can then start to create static html pages, e.g. `index.html` that will then display when navigating to [username].github.io

##Blogging with Jekyll

Not only does GitHub Pages support static html pages, but it also has support for [Jekyll](https://github.com/jekyll/jekyll)

> Jekyll is a blog-aware, static site generator in Ruby [http://jekyllrb.com](http://jekyllrb.com)

Using Jekyll to generate your static html pages makes managing your website layout/headers/footers/menus much easier than manually editing multiple html files. Along with generating html pages from templates, it also makes blogging a lot easier.
Jekyll will take your blog post content pages, the layout pages, and various other pages, process them when you push your files up to your repository and then output all the static pages.

##Markdown

    Markdown is a lightweight markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name.[5][6] Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

[Source](https://en.wikipedia.org/wiki/Markdown)

