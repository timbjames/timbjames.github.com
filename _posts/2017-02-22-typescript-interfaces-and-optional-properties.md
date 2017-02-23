---
layout: post
published: true
title: Typescript Interfaces and Optional Properties
location: Glasgow
author: Tim James
keywords: typescript, interfaces
tags:
- typescript
category: blog
---

I love TypeScript after working with it (on an enterprise system) for well over a year now. Using it with ReactJS makes things easier and very type safe. No more issues with case sensitivity Javascript errors, or accidentally assigning a string to a number. Or so I thought!

Recently though, we came across an issue with the type safety on some of our interfaces. These were interfaces that included only optional properties within them.

e.g.

    interface IInvoiceFilter {
        invoiceDate?: Date;
        invoiceNo?: number;
    }

We would then use this interface for what ever we were doing, and using intellisense to see what the properties were on it. Then use it something like this;

    const invoiceFilter: IInvoiceFilter = { invoiceNo: 1 };
    let otherFilter: IInvoiceFilter = {};
    otherFilter.invoiceNo = 1;

There would then be a method that would take the filter;

    const filterInvoices = (invoiceFilter: IInvoiceFilter) => {
        // do something here with it
    };

You would then call this with;

    filterInvoices(invoiceFilter);

<!--excerpt-->

During some coding, one of the developers wasn't thinking and did this;

    filterInvoices('some string value');

Neither Visual Studio intelisense, Gulp Build or Resharper complained about this! We then discovered you could also do this;

    let invoiceFilter: IInvoiceFilter = {};
    invoiceFilter = 'Random string';

Again there was no issue with this? Why is there no issue?

This was quick to spot, so we were able to fix it, but I then noticed the same thing again in an interface that we do not have control over. We are using React Router to control our routes in a SPA. Within React Router, there is a component called `Link`.

    <Link to={ internalUrls.Invoice.List }>View Invoices</Link>

The component would render an anchor tag with the correct href which works fine. However, I had to change `internalUrls.Invoice.List` from a string property, to a function that returned a string. Once I updated the property, I build the project and ran it. Everything looked fine until I noticed an error in the console. `Warning: Failed propType: Invalid prop 'to' supplied to 'Link'. Check the render method of...`.
After a quick inspection, I noticed that the `to` property is:

![Correct](/img/reactjs/link-interface.jpg)

So it can either be a string value OR it is an interface with all optional properties.

Is this a bug in TypeScript? Or is it a valid feature? I can see that there will be many issues from this when developers make changes like I have. If you know, then please comment below.
