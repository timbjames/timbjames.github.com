---
layout: post
published: true
title: Knockoutjs conditional attribute binding
location: Glasgow
author: Tim James
tags:
- knockoutjs
category: blog
---

You can create a custom binding attrIf which will check the value of a specific observable boolean before add or not the attributes. 
See this example: 

<!--excerpt-->

    ko.bindingHandlers.attrIf = { 
        update: function (element, valueAccessor, allBindingsAccessor) { 
            var h = ko.utils.unwrapObservable(valueAccessor()); 
            var show = ko.utils.unwrapObservable(h._if); 
            if (show) { 
                ko.bindingHandlers.attr.update(element, valueAccessor, allBindingsAccessor); 
            } 
            else { 
                for (var k in h) { 
                    if (h.hasOwnProperty(k) && k.indexOf("_") !== 0) { 
                        $(element).removeAttr(k); 
                    } 
                } 
            } 
        } 
    };