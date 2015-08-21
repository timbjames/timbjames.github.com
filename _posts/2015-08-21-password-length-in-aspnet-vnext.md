---
layout: post
published: true
title: Changing the Password length in Asp.Net 5 Identity
location: Glasgow
author: Tim James
keywords: asp.net 5, vnext identity, password length
tags:
- vnext
- asp.net 5
category: blog
---

A while ago I wrote a blog post regarding [MVC 3 Password Length DataAnnotation](http://timjames.me/mvc-3-password-length-dataannotation/) in order to easily change the length of the password required to register for an account within your website. 

This blog post is about how you can easily manage your password password strength in an Asp.Net vNext project (Asp.Net 5) when using the Microsoft.AspNet.Identity framework.

If you create a new Asp.Net 5 Web Application in Visual Studio 15 you will see that it is set up to use Microsoft.AspNet.Identity for handling user Authentication.

By default it will come with a `RegisterViewModel` that has the Password property and various DataAttributes

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

Similar to my [MVC 3 Password Length DataAnnotation](http://timjames.me/mvc-3-password-length-dataannotation/) post, the length of the password is controlled from within the Model, so if you want to change this length then you will have to edit code.

<!--excerpt-->

So lets get started with how you go about changing the length (and strength) of the password required to register within your website. 

## Configuring Identity

In order to change the settings for your password, you can configure the Identity service from within the startup.cs file. This is pretty simlple, and is just a matter of adding in a new section of code within the `ConfigureServices(IServiceCollection services)` section.

    services.ConfigureIdentity(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 10;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonLetterOrDigit = true;
        options.Password.RequireUppercase = true;
    });

Now if you try to register, you will be forced to use these tight password rules.

This works, but if you want to put these settings into a configuration file, then you can use the `config.json` file.

## Using Asp.Net 5 config.json

In Asp.Net 5, projects now use a `config.json` file which replaces the web.config file that we are so used to using. The config.json file separates out all the configuration from the project.json file which controls dependencies and various other important project setup configuration.

By defaut, your config.json should look like:

    {
      "AppSettings": {
        "SiteTitle": "MyProject"
      },
      "Data": {
        "DefaultConnection": {
          "ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=aspnet5-MyProject-c2f24376-91a1-48b9-a3ae-5b045044ccfc;Trusted_Connection=True;MultipleActiveResultSets=true"
        }
      }
    }

It is here that we will want to add a new section which you can then use to control the password options within the Identity service. So add the following to your config.json file:

    "Identity": {
        "Password": {
          "RequireDigit": "false",
          "RequireLowercase": "false",
          "RequiredLength": "10",
          "RequireUppercase": "true",
          "RequireNonLetterOrDigit": "false"
        }
    }

Now back to your `Startup.cs` file, and update your configuration options to 1 of two ways. 1st way is to bind each property individually:

    services.ConfigureIdentity(options =>
    {
        options.Password.RequireDigit = bool.Parse(Configuration["Identity:Password:RequireDigit"].ToString());
        options.Password.RequiredLength = int.Parse(Configuration["Identity:Password:RequiredLength"].ToString()); 
        options.Password.RequireLowercase = bool.Parse(Configuration["Identity:Password:RequireLowercase"].ToString()); 
        options.Password.RequireNonLetterOrDigit = bool.Parse(Configuration["Identity:Password:RequireNonLetterOrDigit"].ToString()); 
        options.Password.RequireUppercase = bool.Parse(Configuration["Identity:Password:RequireUppercase"].ToString()); 
    });

However there is a much simpler way to actually set your password properties from the `config.json` file without having to specify each property in code. Simply change your code to:

    services.ConfigureIdentity(Configuration.GetConfigurationSection("Identity"));
  
This will automagically load in the config section and bind it to your Password options.    

## Still to do

If you now run your project, as long as the password is more than 6 characters long (set in the `RegisterViewModel`) you will then be validated against the Identity Password settings, however if you enter a password less than 6 chars, you will get the error message set in your model.
So the next step is to do what we did back in MVC3 and create a custom data attribute for the password which will read in the configuration section.

*Coming soon - the next step!*

