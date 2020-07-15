# 0.5.0
## ADDED
- RemoveAllBlocks in Editor
- Toolbar disables all buttons on startup in case we have different blocks focused at first
## MODIFIED
- Ajax now handles POST/GET, can send objects (not just strings), has choice to return object or eventEl
- Editor's RemoveBlocks refactored to allow for RemoveAllBlocks
- Toolbar's unlink button disabled after use; CheckForTag now checks more to make sure we're in the RIGHT edit container; FormattingCheck set after editEl focused into by click
- Hat's createEditor now returns the editor you create
- Hat.start() returns new editor when data is passed to it
- MiniModal now allows for more things to be added after construct; adds NotificationTarget and NotificationText for non-text content to be accessibly explained via screen reader; adds proper aria roles for basic modals (and the controls to customize them as needed)


# 0.4.5
## ADDED
- Check for closeOnBackgroundClick before setting click action
- Compilation instructions to readme
- e.preventDefault to every button we can find
## MODIFIED
- Ajax now checks to see if data was included before trying to send it

# 0.4.4
## MODIFIED
- Add block button, block chooser buttons now e.preventDefault()

# 0.4.3
## MODIFIED
- Switched index.html image URL back to localhost

# 0.4.2
## MODIFIED
- Readme updates

# 0.4.1
## ADDED
- Image block
## MODIFIED
- Refactored imageModal so it now uses ImageUploader
- AddBlock button ChoiceDiv now relies on more sensible layout (in same div instead of JS-positioned), will scroll into view if necessary

# 0.4.0
## ADDED
- Block Chooser
- Code Block
## MODIFIED
- Block Registry now includes name, description and icon. Everything that flows from that has been modified to match

# 0.3.11
## ADDED
- Importing existing content
- Block's LoadContent method
- Mechanic's registerSettings method
## MODIFIED
- InputField now randomizes element IDs so we don't get duplicates
- Editor, Hat now accept data parameter for above
- Mechanics now don't register or set fields until init, so that we can load settings

# 0.3.10
## ADDED
- prefers-reduced-motion media query for transitions
- button settings now use cursor: pointer
## MODIFIED
- Settings panels now come out the bottom (so text doesn't move)
- Settings panels now have exact heights set in Javascript for transitions (fixes overlapping problem as margins are now exact)

# 0.3.9
## MODIFIED
- SelectionWrapper now much smarter about what is selected after modifying contents

# 0.3.8
## MODIFIED
- HatRack is now Hat, what was Hat is now Editor, for comprehension's sake
- Editor now pulls default block from Hat

# 0.3.7
## ADDED
- getContents() methods to block and hat in order to prep for content saving
## MODIFIED
- MechanicController getSettings() now returns the setings instead of just setting them

# 0.3.6
## ADDED
- Value collectors for mechanics
- getValues() for mechanicController
## MODIFIED
- Mechanic.init() now returns object
## REMOVED
- Extraneous logging

# 0.3.5
## ADDED
- Mechanic abstract and MechanicController classes for adding configuration panels to blocks
- StyleMechanic and SettingsMechanic
## MODIFIED
- HatRack.start() now requires just a single Pptions parameter
- Keyboard shortcut fixes (noting which only work in visual mode)
- Swapped out arrow functions for regularly anonymous functions because Safari *still* doesn't support arrow functions
- Checkbox class now includes altText for for checked and nonchecked states
- Rewrote debounce function to work in Safari
- Fixed defaults in modal not scoping properly
- Moved HTML view toggle to first position to make DOM ordering make sense (since all other buttons are disabled when the block is not selected, that's the first button you'll navigtate to, so might as well make it first in the DOM order)
- Refactored form CSS into a mixin so we can use it in modals AND panels

# 0.3.4
## MODIFIED
- Updated readme to include indent/outdent shortcuts

# 0.3.3
## ADDED
- Paragraph Button
- Added keyboard shortcuts for indent/outdent
## MODIFIED
- ULs/Ols now bust out of headers properly
- ULs/OLs now only format their parent block when they're a direct descendant of the element (we assume you're otherwise futzing with complicated HTML, in which case you should futz with the HTML)
- Block-level tag names only show at first level of depth (otherwise, again, we assume you know what you're doing)

# 0.3.2
## ADDED
- Checkbox (lib)
- LinkModal
- Added Unlink button/functionality
- Images/ to gitignore
- Debounce (lib)
## MODIFIED
- SelectionWrapper now accepts some parameters for tags
- MiniModal now only has a "close" method, will throw "canceled" event if necessary
- Esc now properly closes modal
- Made ImageModal label/input styling standard for MiniModal
- Fixed typos in upload.php

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