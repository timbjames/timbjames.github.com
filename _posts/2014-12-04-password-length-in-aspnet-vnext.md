---
layout: post
published: true
title: Changing the Password length in Asp.Net vNext Identity
location: Glasgow
author: Tim James
keywords: asp.net 5, vnext identity, password length,
tags:
- vnext
- asp.net 5
category: blog
---

A while ago I wrote a blog post regarding [MVC 3 Password Length DataAnnotation](http://timjames.me/mvc-3-password-length-dataannotation/) in order to easily change the length of the password required to register for an account within your website. 
This blog post is about how you can easily manage your password password strength in an Asp.Net vNext project (Asp.Net 5)

If you create a new Asp.Net 5 Web Application in Visual Studio 15 Preview you will see that it is set up to use Microsoft.AspNet.Identity for handling user Authentication.

By default it will come with a `RegisterViewModel` that has the Password property and various DataAttributes

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

Similar to my [MVC 3 Password Length DataAnnotation](http://timjames.me/mvc-3-password-length-dataannotation/) post, the length of the password is controlled from within the Model, so if you want to change this length then you will have to edit code.

<!--excerpt-->

So lets get started with how you go about changing the length (and strength) of the password required to register within your website. Before we even get to using some sort of configuration settings, we first need to look at how you can implement your own `UserManager` class and use this to control the rules of the password.
The default UserManager within the project is set up so that the password should be at least 6 characters long, requires 1 digit, requires 1 none letter or digit and requires both uppercase and lowercase characters.

##Creating a custom UserManager
###Step 1

Creating a new class that inherits `UserManager<ApplicationUser>` (`ApplicationUser` is already a class within your project that inherits from `IdentityUser`)

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store, Microsoft.Framework.OptionsModel.IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<ApplicationUser> passwordHasher, IUserValidator<ApplicationUser> userValidator,
            IPasswordValidator<ApplicationUser> passwordValidator, IUserNameNormalizer userNameNormalizer, 
            System.Collections.Generic.IEnumerable<IUserTokenProvider<ApplicationUser>> tokenProviders)
            :base(store, optionsAccessor, passwordHasher, userValidator, passwordValidator, userNameNormalizer, tokenProviders)
        {
                
        }
        
    }

In here you can now set up your custom rules for the password strength using the `PasswordOptions` property within then `IdentityOptions` property. 
So update your code to change the `RequireDigit`, `RequiredLength`, `RequireLowercase`, `RequireNonLetterOrDigit`, `RequireUppercase`.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store, Microsoft.Framework.OptionsModel.IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<ApplicationUser> passwordHasher, IUserValidator<ApplicationUser> userValidator,
            IPasswordValidator<ApplicationUser> passwordValidator, IUserNameNormalizer userNameNormalizer, 
            System.Collections.Generic.IEnumerable<IUserTokenProvider<ApplicationUser>> tokenProviders)
            :base(store, optionsAccessor, passwordHasher, userValidator, passwordValidator, userNameNormalizer, tokenProviders)
        {

            this.Options.Password.RequireDigit = false;
            this.Options.Password.RequiredLength = 6; // for now required length must be 6 to match the length in the `RegisterViewModel`
            this.Options.Password.RequireLowercase = false;
            this.Options.Password.RequireNonLetterOrDigit = false;
            this.Options.Password.RequireUppercase = false;     
                
        }
        
    }

###Step 2

Now that you have your custom UserManager class, you will now have to tell your `AccountController` to use this instead of `UserManager<ApplicationUser>`. So update the constructor on this class to be;

    public AccountController(ApplicationUserManager userManager, SignInManager<ApplicationUser> signInManager)
    {
        UserManager = userManager;
        SignInManager = signInManager;
    }

If you now try to run the project you will get an unhandled exception error because your project is unable to resolve your new class.

![Unhandled Exception](/img/vnext/password-strength/unhandled-exception.jpg)

###Step 3

Update your `Startup.cs` file to inject your new ApplicationUserManager class as the default UserManager class. So update your `AddDefaultIdentity` code to;

    // Add Identity services to the services container.
    services.AddDefaultIdentity<ApplicationDbContext, ApplicationUser, IdentityRole>(Configuration)
        .AddUserManager<ApplicationUserManager>(); 

This will now resolve your class within the project.

If you now run your project, you will now be able to enter in a password that follows the rules which you have specified. 
However you still have the problem that if you change the password length within your `ApplicationUserManager` to something less than what is specified in the `RegisterViewModel` then you will still require a password which matches the longer length.

So the next step is [Configuring your password rules in one place](/blog/2014/12/04/configuring-password-strength-vnext/)

###If you found this post useful in anyway, or want to leave some feedback, then please leave a comment below.



