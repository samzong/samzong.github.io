---
layout: post
title: HowTo Add Piwik Tracking to Ghost
tags: 
    - Piwik
categories: 
    - OpenSource
abbrlink: 11278
date: 2016-04-27 16:51:58
---

This is what about piwik on wiki. [goto](https://en.wikipedia.org/wiki/Piwik)

## Step 1 - Getting your Piwik Tracking code
The first step to having Piwik tracking your Ghost blog will be to add a new website in Piwik, if you are unfamiliar with this process you can checkout the Piwik documention on Managing Websites. With your Ghost blog added into Piwik you will end up with tracking code that will look similar to the following:
```
<!-- Piwik -->
<script type="text/javascript">
    var _paq = _paq || [];
    (function(){ var u=(("https:" == document.location.protocol) ? "https://{$PIWIK_URL}/" : "http://{$PIWIK_URL}/");
    _paq.push(['setSiteId', {$IDSITE}]);
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.defer=true; g.async=true; g.src=u+'piwik.js';
    s.parentNode.insertBefore(g,s); })();
</script>
<!-- End Piwik Code -->
```
> Where <code>$PIWIK_URL</code> will be the domain name you have setup for Piwik.

## Step 2 - Adding Piwik Tracking Code To Ghost Theme File

Piwik recommends that you add the tracking code right above the <code>&#60;/body&#62;</code> tag, which you can find in your Ghost's <code>default.hbs</code> theme file. You will find the <code>default.hbs</code> file in <code>/path/to/ghost/content/themes/your-theme/default.hbs</code>
How you add the tracking code to your <code>default.hbs</code> will depend on if you are editing the file on your local computer or directly on the server. If you are editing your theme locally you can edit this file in any text editor and when you are finished upload this file to your server. Otherwise if you are editing this file directly on the server you can use the command line editor, <code>vim</code>, to add the tracking code.

## Step 3 - Restart Ghost
For the changes in your theme to take effect you will need to restart Ghost. Restarting Ghost will load up a fresh copy of your theme files, with your Piwik tracking code. How you restart Ghost depends on how you started Ghost. If you followed our <a href="https://www.howtoinstallghost.com/how-to-start-ghost-with-forever/">Keep Ghost Running with forever</a>, then you can restart Ghost with <code>forever restart ghost</code>.
Within a few moments you will start to see data coming in for your Ghost blog!
If you have any questions about setting this up or run into any issues please leave us a comment below and we will do what we can to help.
