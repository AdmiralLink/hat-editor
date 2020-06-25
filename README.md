# Hat-Editor  
![Hat Editor](hat.png)  

A rich-text editor for the rest of us

## Features
1. Rich text editor (think WYSIWIG)  
2. Accessibility-focused  
3. Dependency-free*  
4. Lightweight  
5. Web-focused (produces HTML) 
6. Relatively easy to implement w/r/t blocks  
7. Convenient keyboard shortcuts  

## Why on earth would you write another text editor?
Hat is designed to be a simple, block-based rich-text editor with a focus on accessibility. There are any number of text editors out there, but all of them fell short of at least one item on the "Features" list up there, which happens to list exactly the things I want in a text editor. (The closest, TinyMCE and CKEditor, clock in at ~380 kb & ~640 kb, respectively.) And in most cases, extending or modifying an existing editor to cover a shortcoming would have quickly brought it afoul of No. 4. So in the end, it was simpler to write exactly what I wanted.

More broadly, I'm tired of having to run software that is written to cover every possible edge-case and feature request for the 20% I actually need. It wastes time, energy and mental overhead on my part and the user's. Plus, I have to keep track of upgrades and breaking changes to accomodate new features I do not want nor need. Succinctly: I want stability.

Hat is designed to be stable - the core will likely only be updated to fix problems with new browser/spec updates, not to add a new whiz-bangy feature.

*Hat does use Sortable.js, but that's the for the block-arranging part, not the text editor part 

## Who is this for?  
Me. My specific needs. If it's useful to anyone else, I'm thrilled to let you use the code and/or modify it if you want. However, be aware that the number of people who use it is not really a concern of mine.

Generally, if you want to create content **for the web**, it might be useful. If you want to use the same content for your apps, you're either going to have convert the HTML or use a WebView. 

## Feature Requests/Bug Reports  
I will gladly fix all accessibility-related bugs. 

I will happily fix all normal use-case bugs. I am not interested in tracking down theoretical or extreme-edge-case bugs, because I don't care about them. If it can be reproduced and is a thing I think should be fixed, I'll fix it. If not, you're more than welcome to fork it and go on your merry way.

I will implement feature requests I think are useful. I will be more likely to implement feature requests that come with pull requests, but I'm not going to implement something just because it has a PR. See above re:forking.

## Usage

The basics for handling image uploads can be found in upload.php

## Keyboard shortcuts
### Global
- `⌘\ctrl` + `delete/backspace`: Delete block (NO CONFIRMATION)
- `⌘\ctrl` + `shift` + `⬆️`: Move block up
- `⌘\ctrl` + `shift` + `⬇️`: Move block down   
### Paragraph block editing
- `⌘\ctrl` + `b`: Bold  
- `⌘\ctrl` + `i`: Italicize  
- `⌘\ctrl` + `u`: Underline  
- `⌘\ctrl` + `k`: Create/edit link
- `⌘\ctrl` + `shift` + `i`: Insert image  
- `⌘\ctrl` + `shift` + `k`: Unlink  
- `⌘\ctrl` + `shift` + `o`: Ordered List
- `⌘\ctrl` + `shift` + `u`: Unordered List
- `⌘\ctrl` + `shift` + `1`: H1
- `⌘\ctrl` + `shift` + `2`: H2
- `⌘\ctrl` + `shift` + `3`: H3
- `⌘\ctrl` + `shift` + `4`: H4 