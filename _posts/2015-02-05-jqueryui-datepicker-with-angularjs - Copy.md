---
layout: post
published: false
title: jQuery UI Datepicker with AngularJS
location: Glasgow
author: Tim James
tags:
- github
- jekyll
category: blog
video_url: http://www.youtube.com/embed/8gQGHCvMzs8?rel=0&showinfo=0&autohide=1hd=1&wmode=transparent
image_url: /img/angular-jquery/a-jui.jpg
image_alt: jQuery UI with AngularJS
image_caption: jQuery UI with AngularJS
---

I was recently adding some new functionality to a MVC project of mine, which is a partial SPA that uses AngularJS for its fancy schmancy client UI, that had the requirment of a Date picker for running reports. The site already had a dependency on jQuery UI for some visual elements, so I thought it would be as simple as adding the jQuery UI datepicker to the inputs.

<!--excerpt-->

This was not the case though with AngularJS as the scope was not being updated when the date was picked from the datepicker. 
A quick google search and I found this (excellent solution)[http://www.abequar.net/posts/jquery-ui-datepicker-with-angularjs] by


**JavaScript**

    app.directive('datepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function () {
                    element.datepicker({
                        dateFormat: 'dd/mm/yy',
                        onSelect: function (date) {
                            scope.$apply(function () {
                                ngModelCtrl.$setViewValue(date);
                            });
                        }
                    });
                });
            }
        }
    });

**Html**

    <input type="text" name="selectedDate" datepicker />

View this in action - [Demo on JSBin](http://jsbin.com/sapefi/1/edit?html,js,output)

**Some useful guides**

[Angular Directive Documenation](https://docs.angularjs.org/guide/directive)

Original Blog Post http://www.abequar.net/posts/jquery-ui-datepicker-with-angularjs
