# 0.3.1
## ADDED
- js\lib: ErrorModal, Ajax, ImageUploadModal (no library support), inputField, ProgressBar
- Upload.php example 
- BrowserFormattingButton (for ParagraphToolbar)
- modalClass option in MiniModal to apply to background/modal (for z-index purposes, mainly, but also for whole-modal styling)
- FocusShield for paragraph block (if you're not focused on a content editing plane, you can't use any of the content buttons)
- HatRack now assk for querySelector and options as constructor argument 
- Hat logo  
## MODIFIED
- Fixed bugs in MiniModal (no functionality changes, just getting it to work as expected)
- Refactored MiniModal class structure to allow for easier extending
- MiniModal buttons now auto center
- When switching from HTML to Edit view, innerHTML is modified so you can get inside empty elements
- Fixed bug when deleting first block (when multiple blocks exist)
- Fixed bug in DomEl where periods inside attributes would be grabbed as partial classes and the whole thing would eat it


# 0.3.0
## ADDED
- Readme
- Header tag button, keyboard shortcut
- EditView now displays basic block-level designations (p, headers) for ease of understanding
- Keyboard shortcut for moving blocks up and down
- Focus after block delete & move events
## MODIFIED
- Add non-mac shortcut for delete blcok
- Reworked how blocks handle keyboard shortcuts (removed all the registers; now we just use a single function that can be extended by blocks)
- Tidied up border styling on controls
- Uniform height of buttons across top

# 0.2.2
## ADDED
- OL and UL buttons

# 0.2.1
## ADDED
- Keyboard shortcut intercepts for formatting (so we can replace inaccessible bs and is with strongs and ems)
- BrowserFormattingButton (for easy format buttons)
- SelectionWrapper (for doing all of our formatting in HTML)
## MODIFIED
- ParagraphBlock now creates an initial paragraph you start typing in

# 0.1.0
## ADDED
- ParagraphToolbar (Bold, italic, Underline, HTML Code view)
- Styled toolbar, grab bar, started general settings bar
- Delete button on general settings bar
- MiniModal

# 0.0.1
## ADDED
- Started basic Block
- Blocks can be added, removed and moved
- DomEL componenet
- Sortable library
- Start of Paragraph Block (you can type at it)