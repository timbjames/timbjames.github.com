---
layout: post
published: true
title: AspNet VNext TSX Debugging
location: Glasgow
author: Tim James
keywords: tsx, asp.net 5, vnext, reactjs, typescript
tags:
- vnext
- reactjs
- asp.net 5
- typescript
category: blog
---

Following on from my recent post [ReactJs with TypeScript in AspNet VNext](/2015/12/02/reactjs-with-typescript-in-aspnet-vnext/), I have been playing about with .TSX + ReactJS more, and one of the first things I noticed was that I was unable to debug the JavaScript files in the browser.

This is down to the way in which Visual Studio + the `tsconfig.json` are generating the `.js` files which are linked to `.js.map` files.

From my previous post, we created a simple `App.tsx` file that simple output `<h1>Hello World</h1>`. Now if you investigate the generated `.js` file, you will see the following in the last two lines;

    ReactDOM.render(React.createElement(MyApp, null), document.getElementById('appMountNode'));
    //# sourceMappingURL=app.js.map

<!--excerpt-->

The `sourceMappingURL` is a way to map a combined/minified file back to a "debuggable" file. In this case, the `.js` file is being mapped back to `app.js.map` which then holds information about the original file. Looking into the `app.js.map` file, you will then see the following;

    {"version":3,"file":"app.js","sourceRoot":"","sources":["../../../scripts/React/app.tsx"],"names":["MyApp","MyApp.constructor","MyApp.render"],"mappings":"....."}

This is informing the browser that the file `app.js` should be mapped back to the source `app.tsx` with the relative path information. This is great! However, in our folder structure, our `.tsx` files are all out with the running website.
So if you are to try and debug the JavaScript, you will not be able to as the source file will not be found.

### One Solution

I had a quick search of the internet, and discovered a solution which involved writing a MVC controller which would match the path, check the existence of the file, and then serve this file. However, I didn't think this was the best solution. So in the end I decided to make use of Gulp.

Gulp is already included in the asp.net 5 MVC project templates, and is generating minified js and css for me, so why not use it to allow me to debug my `.tsx` files. So I have added this new Task to the `gulpfile.js`

    gulp.task("copy", function () {    
        return gulp.src('./scripts/**/*.tsx').pipe(gulp.dest('./wwwroot/scripts/'));
    });

This is now copying out my `.tsx` files into the wwwroot folder which can then be seen by the browser. Well, they should be seen! However this is a MVC site which has set routes by default. So if you were to run the project now, your `.tsx` files would still not be seen. 
So the next step is to add a static file provider to your default static files. Some good information on this can be found here [Working with Static Files](http://docs.asp.net/en/latest/fundamentals/static-files.html).

Open up your Startup.cs file, then go down to the line `app.UseStaticFiles();` and replace this with;

    // add .tsx files as static files       
    var provider = new FileExtensionContentTypeProvider();
    provider.Mappings.Add(".tsx", "application/javascript");
    app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = provider });

Save this, and then run the project now. Your `.tsx` file will now be served by your app and allow you to debug!






