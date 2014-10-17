---
layout: post
published: false
title: Pointing your existing domain to github pages
location: Glasgow
author: Tim James
tags:
- github-pages
- domain
category: blog
image_url: /img/blond-boxing-woman-in-black-punching-bag-930x620.jpg
image_alt: this is the image alt
image_caption: This is the caption
image_text: This is the caption text
---

###Pointing your existing domain to gihub pages

Set up your DNS settings within your current hosting provider

Don't set up a CNAME file for your APEX domain (wwwless domain name). Set up an A record to point to the github pages IP range speficifed. Then set up your www. domain with a CNAME to point to [username].github.io
Set up a CNAME file in your github repo with your APEX domain.

Now when browsing to www.[domain].com it will go to the github pages domain, fine your CNAME file which will then send the user to your APEX domain which will then load up your github pages site.

https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/

Set up the CNAME file within your github pages repository

check the dns settings using a dig command or windows alternative

what is a dig command?
installing dig on windows

https://www.google.co.uk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=dig+command+windows

http://www.danesparza.net/2011/05/using-the-dig-dns-tool-on-windows-7/

Once installed, open a command prompt window in the directory and run the command
    dig [domain].com +nostats +nocomments +nocmd

http://www.cyberciti.biz/faq/linux-unix-dig-command-examples-usage-syntax/dig-command-output/

+nostats = 
+nocomments =
+nocmd =

<!--excerpt-->