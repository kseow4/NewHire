
var $resizeTimer;

var $selected;
secondClick = (selector) => {
    selector.off("click");
    $selected = selector.val(); 
    selector.on("click", function() { firstClick(selector); });
}

firstClick = (selector) => {
    selector.off("click");
    if ($selected == selector.val())
        selector.change(); 
    selector.on("click", function() { secondClick(selector); });
}



$(document).ready(function() {
    // client.get(1); 
    client.getLogs();    
    // $($weekSelector).click(firstClick($($weekSelector)));
    $($weekDropdown).prop('selected', 'week');
    $($weekSelector).click((e) => { e.preventDefault(); });
    $($weekDropdownMenu).click((e) => { e.preventDefault(); });
 
    $($weekDropdown).change((e) => {
        $.each($($logDiv).children(), (i, child) => {
            if ($(child).hasClass("bordered-hidden")) 
                $(`#form-heading${$(child).attr('index')}-btn`).click();
        }); 
        $($logDiv).hide(300, function() {
            $($logDiv).children().hide(); 
            $(`${$logContainer($($weekDropdown).prop('selected'))}`).show();    
        }).show(300); 
    });

    $($allLogsButton).click((e) => {
        e.preventDefault();  
        $($weekDropdown).prop('selected', 'all');
        changeDropdownNoTrigger();
        $($logDiv).hide(300, function() { 
            $.each($($logDiv).children(), (i, child) => {
                if ($(child).hasClass("bordered-hidden"))
                    $(`#form-heading${$(child).attr('index')}-btn`).click();
            }); 
            $($logDiv).children().show();
        }).show(300);

    });
    $($clearLogsButton).click((e) => {
        e.preventDefault();
        $($logDiv).children().hide(300).delay(150).promise().done(function() {
            $($logDiv).empty();  
        });  
        $($weekDropdown).prop('selected', 'week');
        changeDropdownNoTrigger();
    });
    $($hideLogsButton).click((e) => {
        e.preventDefault(); 
        $($logDiv).hide(300); 
        $($weekDropdown).prop('selected', 'week');
        changeDropdownNoTrigger(); 
    });
    $($deleteLogsButton).click((e) => {
        e.preventDefault();
    });
    $($refreshLogsButton).click((e) => {
        e.preventDefault(); 
        // $($logDiv).hide(300);  
    });
    $($addLogsButton).click((e) => {
        e.preventDefault(); 
        $($addLogsButton).toggleClass('button-is-clicked').blur();
        if ($($addLogsButton).hasClass('button-is-clicked')) {
            client.genAddLog();
            $($addLogDiv).show(400); 
            $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        } else 
        $($addLogDiv).hide(450).promise().done(function() {
            $($addLogDiv).empty();  
        });       
        $(window).trigger('resize');
    });
 

    $('#modal-testtest').on('show.bs.modal', function() {
        console.log("test")
    })


    $(window).resize(function() {
        // if (this.resizeTO) clearTimeout(this.resizeTO);
        clearTimeout($resizeTimer);
        // this.resizeTO = setTimeout(() => {
        $resizeTimer = setTimeout(() => {
            $(this).trigger('resizeEnd');
        }, 500);
    });

    $(window).trigger('resize');
});
