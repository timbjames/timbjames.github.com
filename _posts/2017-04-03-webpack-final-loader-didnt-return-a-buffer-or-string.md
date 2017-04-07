---
layout: post
published: true
title: Webpack final loader didn't return a buffer or string
location: Glasgow
author: Tim James
keywords: webpack
tags:
- webpack
category: blog
---

Is the world of web development in a state of being permanently broken? Have you ever been able to follow one tutorial these days without then having to find why you are getting a errors?

I have been looking at the best/fastest module builder/bundler for our ReactJS project which is written in TypeScript. Currently we are using Gulp, however we feel the bundler is not really where we want it to be.
So I am looking at using either Webpack or Brunch.io.

I found this tutorial online as a starter for 10 (https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)[https://www.typescriptlang.org/docs/handbook/react-&-webpack.html]. Fairly simple tutorial and written well.

Follow all the instructions to the letter, copy the configs into my configs, and then run webpack to get this error;

`Module build failed: Error: Final loader didn't return a Buffer or String`

![webpack](/img/webpack/failedtoloadfinal.JPG)

<!--excerpt-->

O FFS! Come on man! Does nothing work these days?! I know it is not the tutorial is wrong, so there must be a dependency within a dependency within a depenency that is faulty. The `bundle.js` is being created, however it only includes bundle code and not your files bundled in.
So after a quick search online, I believe the issue lies with the `awesome-typescript-loader` and specific versions of this, and there is a quick fix.

Update your `tsconfig.json` file to include the following code;

```typescript
"awesomeTypescriptLoaderOptions": {
    "useWebpackText": true,
    "useTranspileModule": true,
    "doTypeCheck": true,
    "forkChecker": true
}
```

Thankfully now you can run webpack and see the bundle being created.