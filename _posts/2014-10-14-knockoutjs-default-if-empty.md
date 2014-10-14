---
layout: post
published: true
title: Archived blog posts
location: Glasgow
author: Tim James
tags:
- archive
category: blog
---

I have been working on a big project recently involving knockoutjs and have learnt so much about this data binding MVVM library. It is a well supported JavaScript framework with a large community of users, so there is always a solution to a problem.
However I came across a little problem, not with knockoutjs, but with how IE handles empty `<span>` tags.

<!--excerpt-->

##The Problem

Basically, when IE8 (and presumably IE6+7) was rendering empty `<span>` tags, it was ignoring the min and max height styling. So if I had a property within my View Model that was an empty string, it would break the layout of my UI slightly.
As a result, I needed a way of passing in a default "if empty" value which would be used instead of the property value.

There is one way to provide some default value to a peroperty by using [knockoutjs extenders](http://knockoutjs.com/documentation/extenders.html) (see [http://stackoverflow.com/a/10577446/177988](http://stackoverflow.com/a/10577446/177988)) however in my situation the data which is being bound is a dynamically loaded json array.

##The Solution

I made use of [knockout's custom bindings](http://knockoutjs.com/documentation/custom-bindings.html) to create a binding handler which would check the value, and then update the text.

    ko.bindingHandlers.defaultIfEmpty = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {                
            var rawValue = ko.utils.unwrapObservable(valueAccessor());
                
            if (rawValue == "") {                    
                if (allBindingsAccessor().defaultText != undefined) {
                    allBindingsAccessor().text = allBindingsAccessor().defaultText;
                } else {
                    console.log('ko.bindingHandlers.defaultIfEmpty defaultText not provided.');
                }
            }
               
        }
    }