#--------------------
HYPERSCRIPTS
#--------------------
  _="
  
  "
#---------------------

    init    -     on 

    on [every] <event-name>[(<param-list>)][\[<filter>\]] [<count>] [from <expr>] [<debounce> | <throttle>]
   { or [every] <event-name>[(<param-list>)][\[<filter>\]] [<count>] [from <expr>] [<debounce> | <throttle>] }
    [queue (all | first | last | none)]
    {<command>}
    [end]

    on mouseenter
    on mouseleave
    on click from #inc
    on keyup debounced at 500ms
    on mousemove throttled at 500ms

    on click add .clacked to #another-div

    en un input
    on change add { '--accent-color': my.value } to document.body
    on click add @disabled='true' to <button/> when it is not me

    add
    remove
    call

    log

    click 
    load 

    set 
    put 

    show
    hide 

    wait 

    call 

    añadir string a un string
    set fullName to "John"
    append " Connor" to fullName
    -- fullName == "John Connnor"

    en un array
    set resultArray to []
    append 1 to resultArray
    append 2 to resultArray
    append 3 to resultArray
    -- resultArray == [1,2,3]
    
    append "<i>More HTML here</i>" to #myDIV

   if <conditional> [then] <command-list> [(else | otherwise) <command-list>] end`


   <input type="text" placeholder="Search Quotes..."
     _="on keyup
         if the event's key is 'Escape'
           set my value to ''
           trigger keyup
         else
          show <blockquote/> in #quotes when its textContent contains my value">
