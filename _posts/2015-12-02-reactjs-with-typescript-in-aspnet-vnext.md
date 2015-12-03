---
layout: post
published: true
title: ReactJs with TypeScript in Asp.Net VNext
location: Glasgow
author: Tim James
keywords: asp.net 5, vnext, reactjs, typescript
tags:
- vnext
- reactjs
- asp.net 5
- typescript
category: blog
---

Now that the ASP.NET 5 Release Candidate 1 has been [announced](http://blogs.msdn.com/b/webdev/archive/2015/11/18/announcing-asp-net-5-release-candidate-1.aspx) and [released](https://get.asp.net/), now is a great time to start playing around with it. So why not start playing around with ReactJs using TypeScript at the same time!

## Background

For those that are not in the know:

### [React](https://facebook.github.io/react/)
> A library for building user interfaces. 

It was developed by the facebook guys as they started to run into problems, with other JS frameworks, when building their Apps section. So they invented their own!

### [TypeScript](http://www.typescriptlang.org/)
> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

It was developed by Microsoft, more specifically I think it was Mads Kristensen and his team? I might be wrong!

## Getting Started

To begin with, we want to create a new Project in Visual Studio 2015. I am using .Net Framework 4.6.1 and then selecting the ASP.Net Web Application. Then from the ASP.NET 5 Templates, I am going to select the Web Application. This will then create the new Asp.net 5 solution structure for you.

<!--excerpt-->

If you are not yet familiar with the folder structure, then I suggest you read [Year First ASP.NET 5 Web App Using Visual Studio](http://docs.asp.net/en/latest/tutorials/your-first-aspnet-application.html). This is a great post for creating the app and understanding the new structure.

What I noticed, and something which might catch you out, is that there is a new file called `bower.json` (controls your JavaScript dependencies), however this file was hidden by default, so I had to select "Show All Files".

Now that you have your Asp.Net 5 Web Application solution, the next step is to add a dependency to react js using the `bowser.json` file. This file works pretty much the same as the `project.json` file for adding dependencies, in that as you start typing, you get intellisense. So start typing `react`, select it from the list, and then tab out. This will then display the version, so select the version you want and tab out again. You will end up with;

![bower.json structure](/img/vnext/react/add-react-to-bower-config.JPG)

This will then download the react dependencies and add to your Bower dependencies list along with all the required files into the wwwroot > lib folder

![dependencies added](/img/vnext/react/react-dependencies-added.JPG)

So we don't forget later, lets add a reference to the core reactjs scripts to our _Layout page just now. So open up Views > Shared > _Layout.cshtml and add script references to both react.js and react-dom.js.

![script references](/img/vnext/react/dev-app-script-references.JPG)

## Adding TypeScript

Now that we have our react dependencies and scripts sorted, we want to move onto adding TypeScript to our project. Now I already had TypeScript installed into Visual Studio 2015 and I am not sure if TypeScript is automatically included in the VS2015 Update 1, so you might need to go and download and install.
Lets assume you already have TypeScript installed, and are ready to add to the project. I followed the instructions here [Using TypeScript with Asp.Net 5](https://github.com/Microsoft/typescript/wiki/Using-TypeScript-With-ASP.NET-5) So just follow the instructions on setting up and configuring to generate on save.

Once you have created your first little app.tsx file, you are then going to want to add the typed definitions for react. I am adding them to a folder within the Scripts folder named `Typings`. You can find them all at [github.com/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/react)

At this point, add typed definitions for jQuery also. My folder structure now looks like this:

![script references](/img/vnext/react/folder-structure.JPG)

## Creating our App

You are now ready to start writing some code! yey! By this point, if you have been following the instructions, you should have an app.ts file. You will now want to delete this file and create a new `app.tsx' file. TSX is the TypeScript version of JSX. If you are familiar with react, then you will have heard of JSX.

Once you have your `app.tsx` file, add the following code.

    // References to our typings file to get intellisense

    /// <reference path="typings/jquery/jquery.d.ts" />
    /// <reference path="typings/react/react-global.d.ts" />

    // A '.tsx' file enables JSX support in the TypeScript compiler, 
    // for more information see the following page on the TypeScript wiki:
    // https://github.com/Microsoft/TypeScript/wiki/JSX

    /** Properties to be used within our MyApp class */
    interface IAppProps {

    }

    /** State to be used within our MyApp class */
    interface IAppState {

    }

    /** MyApp class that is extending the React Component passing in the properties and state */
    class MyApp extends React.Component<IAppProps, IAppState> {
    
        /**
         * Default contructor.
         * @param props
         */
        constructor(props: any) {
            super(props);
        }

        /**
         * React Render function
         */
        render() {
            return (<h1>Hello World</h1>);
        }

    }

    // jQuery on ready
    $(() => {
        // get our mount node where we want our component to be rendered
        var $mountNode = $('#appMountNode');     

        // render the component to our mound node
        ReactDOM.render(<MyApp />, $mountNode[0]);
    });

As soon as you click save on the file, you should then see an app.js file be created within your wwwroot > js > mylibs filder (or what ever path you had in your "outDir" within the tsconfig.json file)

Build the app, and you should see some errors appear `Build: Cannont use JSX unless the '--jsx' flag is provided`. If you have used .tsx files in Visual Studio prior to Asp.Net 5, then you will know that there was a TypeScript Build section within the project properties. This is no longer there, but it is as easy as adding this to your tsconfig.json file. So update your tsconfig.json to include this new line;

    {
      "compilerOptions": {
        "noImplicitAny": false,
        "noEmitOnError": true,
        "removeComments": false,
        "sourceMap": true,
        "target": "es5",
        "outDir": "../wwwroot/js/mylibs",
        "jsx": "react"
      },
      "exclude": [
        "node_modules",
        "wwwroot"
      ]
    }

The new `"jsx": "react" line tells the app to use change the TSX files into JSX files so that they will work with react.

Build the app again, and everything should now be fine! So you are ready to run the app. Before you run the app, you will want to add a reference to your app.js file in the _Layout file below your references to the react scripts. Then add your mount html element to somewhere in your views. I added it to the layout page just for testing.

    <div class="container body-content">
        @RenderBody()

        <div id="appMountNode"></div>

        <hr />
        <footer>
            <p>&copy; 2015 - VNextStacks</p>
        </footer>
    </div>

Run the app and you should now see your "Hello World" header tag!

### Feedback

I always try to put together working demos! So if you find anything that isn't working, or suggestions, then please comment below. :)
