---
layout: post
published: true
title: Exporting all Photoshop layers as Jpeg
location: Glasgow
author: Tim James
tags:
- photoshop
- tips
category: blog
image_url: /img/photoshop-cs.jpg
image_alt: Photoshop CC 2014
---

Sometimes I like to just blog some handy hints that you might find useful, but really they are just so i have a central reference for handy hints!

##Handy Hint Photoshop CC Layer exporting

In Photoshop, it is possible to export all layers as individual files rather than manually going through each and saving for web. This saves a heck of a lot of time!

<!--excerpt-->

So in Photoshop CC 2014, with your PSD file open that contains the many layers you are wanting to save. Select File from the menu, then Scripts and then Export Layers to Files...

![Export Layers to files](/img/photoshopcc/menu-scripts-export.gif)

This will load the Export Layers to Files options which allows you to set the parameters as you like. This is pretty self explanitory, just select the destination folder in which you want to save the files, the file name prefix, if you ONLY want visible layers saved, the file type to save the layers as, whether to include ICC profile and then the JPEG options.

![Export Layers to files options](/img/photoshopcc/export-options.gif)

Once you click run, the layers will all be saved to the destination folder with the naming convention of *[filenameprefix]-_[layerstackorder]_[layername].jpg* Layer Stack Order being the top most layer first, working it's way down to the background layer.