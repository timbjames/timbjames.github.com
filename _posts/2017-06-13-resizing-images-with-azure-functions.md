---
layout: post
published: true
title: Resizing Images with Azure Functions
location: Glasgow
author: Tim James
keywords: azure functions, azure
tags:
- azure-functions
- azure
category: blog
---

A new Azure Functions project template is available, in Visual Studio Preview (currently on June 13 2017), for working with Azure Functions. 
In order to be able to select the project and file types, you will eed to also install VS2017 Tools for Aszure Functions extension.
This blog has the steps required to install [https://blogs.msdn.microsoft.com/webdev/2017/05/10/azure-function-tools-for-visual-studio-2017/](https://blogs.msdn.microsoft.com/webdev/2017/05/10/azure-function-tools-for-visual-studio-2017/)

After installing, follow the instructions on creating a new Azure Functions project, and then add a "BlobTrigger" function. This will then create a basic blob trigger with the following code:

```csharp
[FunctionName("BlobTriggerCSharp")]
public static void Run([BlobTrigger("samples-workitems/{name}", Connection = "")]Stream myBlob, string name, TraceWriter log)
{
    log.Info($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
}
```

The BlobTrigger takes in the name of your blob container, and the Connection is the name of your storage account. If you then follow the instructions on publishing this to your Azure instance, you can then watch this run.
For managing files within my blob container, I downloaded [http://storageexplorer.com/](http://storageexplorer.com/) which then allows me to upload a file and then watch, via the Azure portal, the function trigger.

<!--excerpt-->

***Now for setting up a trigger that will resize an image and then write it to another blob folder***

I initially had looked on github at a resize example template [https://github.com/Azure/azure-webjobs-sdk-templates/blob/dev/Functions.Templates/Templates/ImageResizer-CSharp/run.csx](https://github.com/Azure/azure-webjobs-sdk-templates/blob/dev/Functions.Templates/Templates/ImageResizer-CSharp/run.csx).
This works well, however, the output file has the contentType as `application/octet-stream` and ideally I was wanting this to be `image/jpeg`.

For resizing of the image, I am going to install ImageResizer via nuget `install-package ImageResizer`. I am then going to make use of the input blob and an output of type CloudBlockBlob. 
Now with the output type, you also need to provide both the blob container and the name of the storage account. It is also important to provide file access for the CloudBlockBlob. Without the file access, you will see an error about write access.

So make sure to give it `FileAccess.ReadWrite`. With this, you are effectively changing the "direction" to "inout".

```csharp
using ImageResizer;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;

namespace MyProject
{
    public static class Function1
    {

        [FunctionName("resize-func")]
        public static void Run(
        [BlobTrigger("images/{name}", Connection = "fakeconnection_STORAGE")] Stream myBlob, string name,
        [Blob("resized-images/{name}", FileAccess.ReadWrite, Connection = "fakeconnection_STORAGE")] CloudBlockBlob outputBlob, TraceWriter log)
        {
            log.Info($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");

            var instructions = new Instructions
            {
                Width = 570,
                Mode = FitMode.Crop,
                Scale = ScaleMode.Both
            };

            Stream stream = new MemoryStream();
            ImageBuilder.Current.Build(new ImageJob(myBlob, stream, instructions));
            stream.Seek(0, SeekOrigin.Begin);

            outputBlob.Properties.ContentType = "image/jpeg";
            outputBlob.UploadFromStream(stream);
        }
    }
}
```

When publised to Azure, and then clicking on the function from within your Function Apps, you will see that it creates a `function.json` file with the following code:

```csharp
{
  "bindings": [
    {
      "type": "blobTrigger",
      "connection": "fakeconnection_STORAGE",
      "path": "images/{name}",
      "direction": "in",
      "name": "myBlob"
    },
    {
      "type": "blob",
      "path": "resized-images/{name}",
      "connection": "fakeconncetion_STORAGE",
      "direction": "inout",
      "name": "outputBlob"
    }
  ],
  "disabled": false,
  "scriptFile": "..\\bin\\MyProject.dll",
  "entryPoint": "MyProject.Function1.Run"
}
```

This code will take in the image, resize it and then save to the output blob container. With using the CloudBlockBlob, you then have access to it's properties and can set the content type before then saving. This is something that was missing from the official github code.

***Something to note*** is that a lot of the examples that I read online seems to be setting the output blob container the same as the input trigger. When I did this, the blob trigger would react to the new saved file, so basically just sit in a loop of input and output.
I initially looked into ignoring file names, e.g. anything starting with `r-`, however my attempts failed, so I found it easier to save the output to another folder. The next step I have is that I will delete the original file so that I am not taking up storage that will not be used.

***Another note*** I found that when creating my function within Visual Studio and then publishing to Azure, it would only work when the class was named `Function1`? I tried changing it, but was then seeing an error in the Azure portal.