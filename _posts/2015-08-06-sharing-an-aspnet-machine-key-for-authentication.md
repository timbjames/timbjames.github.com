---
layout: post
published: true
title: Sharing an Asp.Net Machine Key for Authentication
location: Glasgow
author: Tim James
keywords: machine key encryption, machine key authentication
tags:
- c#
- vb.net
- aspnet
- encryption
category: blog
---

In a recent project that I have been working on, one of the requirements was that we use our client's Machine Key so that we can authenticate user's passwords if their users had to login directly into our system. This was mainly to handle a situation where the main website would go down then users could open up our system directly and login.

So the client would send us the user details, username/password/passwordsalt and then they supplied us with the Machine Key that they are using in their various environments. The encryption which was being used was the standard out of the box asp.net Membership encryption, so in order to encrypt the typed in password against what is in the database, i used the following code:

    public string EncryptPassword(string password, string passwordSalt)
    {

        byte[] bytePass = Encoding.Unicode.GetBytes(password);
        byte[] byteSalt = Convert.FromBase64String(passwordSalt);
        byte[] byteResult = new byte[byteSalt.Length + bytePass.Length];

        Buffer.BlockCopy(byteSalt, 0, byteResult, 0, byteSalt.Length);
        Buffer.BlockCopy(bytePass, 0, byteResult, byteSalt.Length, bytePass.Length);

        HashAlgorithm ha = HashAlgorithm.Create("SHA1");
        return Convert.ToBase64String(ha.ComputeHash(byteResult));

    }

While testing in a c# app this worked great, however when I then ported the code over to vb.net (yes our system is partially in vb.net), the generated encrypted password no longer matched.

<!--excerpt-->

I had ported over the c# code into this snippet of vb.net

    Public Shared Function MachineKeyEncodePassword(format As Integer, password As String, passwordSalt As String)

        Dim bytePass As Byte() = Encoding.Unicode.GetBytes(password)
        Dim byteSalt As Byte() = Convert.FromBase64String(passwordSalt)
        Dim byteResult As Byte() = New Byte(byteSalt.Length + bytePass.Length) {}

        System.Buffer.BlockCopy(byteSalt, 0, byteResult, 0, byteSalt.Length)
        System.Buffer.BlockCopy(bytePass, 0, byteResult, byteSalt.Length, bytePass.Length)

        Dim ha As HashAlgorithm = HashAlgorithm.Create("SHA1")
        Return Convert.ToBase64String(ha.ComputeHash(byteResult))

    End Function

To me this looked correct and was working, however the Base64String that was being generated was not the same as when running the c# app? What was I doing wrong?

Well it turns out that when you are creating a byte array in vb.net, e.g. `New Byte(10) {}` you indicate that it's upper bound will be 10 this it contains 11 elements. In c# if you create a new byte array e.g. `new byte[10];` it will create an array of 10 elements from 0-9. So my byte array length was 1 off in the vb.net code.

###Solution

The very very simple solution to this was to take away this extra element in the array, so I changed one line:

    Dim byteResult As Byte() = New Byte((byteSalt.Length + bytePass.Length) - 1) {}

This will create the same length byte array as the c# code and result in the same encrypted password which validates correctly against that in the database!

###Side note

While working on this little project update, the machine key that had been sent over was in the format

    <machineKey 
        decryptionKey="{hex-key value},IsolateApps" 
        validationKey="{hex-key value},IsolateApps" />;

Now this was working well on the encryption part, but had now broken my code when trying to set the FormsAuthentication cookie `FormsAuthentication.SetAuthCookie(username, False)` and was giving me the error:

    System.Configuration.ConfigurationErrorsException: Decryption key specified has invalid hex characters.

The problem here is that when you include `IsolateApps` within the Machine Key config, this cuases ASP.Net to generate a unique key for each application on your server. After reading this blog post [Cryptographic Improvements in ASP.NET 4.5, pt. 2](http://blogs.msdn.com/b/webdev/archive/2012/10/23/cryptographic-improvements-in-asp-net-4-5-pt-2.aspx) I read that if you add `compatibilityMode="Framework20SP1"` to the Machine Key config, then this would work. It did, I was not able to set the authencation cookie, however this then opened up a can of worms with Microsoft.AspNet.SignalR! So I discovered that just removing `IsolateApps` from the config seemed to work.

Not sure if this will raise an ugly head later on, so if you have any advice, then please comment below and let me know :)