

textareaConstraint = () => {
    let control = $(`#add-log-controls-container`),
        textcol = $(`#add-log-textarea-container`),
        toolbar = $(`#add-log-textarea-toolbar`),
        planned = $(`#add-log-textarea-planned-tag`),
        logtext = $(`#add-log-textarea`);

    if (textcol.outerHeight() != control.outerHeight()) textcol.outerHeight(control.outerHeight())  
    logtext.outerHeight(textcol.height() - (toolbar.outerHeight() + planned.outerHeight())); 
} 

$(window).bind('resizeEnd', function() {  
    let measurements = []; 
    let measuretexts = [];
    $.each($(`${$weekSelector} li>div`), (i, item) => { 
         measurements.push(getMeasurements($(item))); 
         measuretexts.push(getMeasurements($(item), $($weekDropdown)));
    });
    let menu = $($weekDropdownMenu).width(),
        widths = $.map(measurements, (m) => m.text.width), 
        paddings = $.map(measurements, (m) => m.padding.x), 
        max = Math.max(...widths) + Math.max(...paddings);  
    $($weekSelector).width(menu > max ? menu : max); 
 
    $($weekDropdownText).text(''); // reset width...
    changeDropdownNoTrigger(); 
 });
     













