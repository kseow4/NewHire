 
const getOrdinal = (n) => (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');

const getOrdinalNumber = (n, superscript = false) => n + (superscript ? getOrdinal(n).sup() : getOrdinal(n));

// const getFormatDate = (_options = false, _defaults = false, _list = false) => {
const getFormatDate = (_settings = {options: false, defaults: false, list: false}) => {
    var settings = { };
    if (!_settings.options)
        settings = {
            options: _settings,
            defaults: _settings.defaults ?? false,
            list: _settings.list ?? false
        };
    else 
        settings = { 
            options: _settings.options ?? false,
            defaults: _settings.defaults ?? false,
            list: _settings.list ?? false
        };

    var format = { }; 

    var options  = (typeof settings.options === 'object' ? settings.options 
                 : (typeof settings.defaults === 'object' ? settings.defaults : { }));

    var defaults = (typeof settings.options === 'boolean' ? settings.options 
                 : (typeof settings.options === 'number' ? (settings.options === 1 ? true : false) 
                 : (typeof settings.defaults === 'object' ? false : settings.defaults)));

    if (defaults) 
        format = {
            date: options.date ?? "",
            offset: !isNaN(options.offset) ? options.offset : 0,
            weekday: options.weekday ?? "long",
            month: options.month ?? "long",
            day: options.day ?? "ordinal",
            year: options.year ??"numeric",
            superscript: options.superscript ?? false
        };
    else 
        format = { 
            date: options.date,
            offset: !isNaN(options.offset) ? options.offset : 0,
            weekday: options.weekday,
            month: options.month,
            day: options.day,
            year: options.year,
            superscript: options.superscript ?? false
        } 
    // $.each(format, (key, value) => {
        
    //     console.log(key , value);
    // });

    // let aa = $.map(format, (v, e) => e + v);
    // console.log(aa);

    // let bb = $.map(format, (k, v) => k == null ? k : v);
    // console.log(bb);
    
    // $.each(format, (k, v) => console.log(`${k} *** ${v}`));

    // $.each(format, function(e, t) {
    //     if (format[e] != null) 
    //         console.log("--> ", e, t);
            
    //     if (format[e] == null)
    //         console.log("this thing didn't exists")
    //     // console.log("::", e, format[e]);
    // });

    var date_string = '', 
        date = null, 
        weekday = '',
        month = '',
        day = '',
        year = '';
    var Exceptions = [];

    try {

        try { date = new Date(format.date); }
        catch (date_error) { Exceptions.push(new DateFormatException(date_error)); } 
       // finally { date = (format.date = new Date()); }
        
        try { date.setDate(date.getDate() + format.offset); } 
        catch (offset_error) { Exceptions.push(new DateFormatException(offset_error)); }

        try { 
            weekday = `${(date.toLocaleString('en-us', { weekday: format.weekday ?? 'long' }))}`;
            if (format.weekday)
                date_string += `${weekday} `;    
        } catch(weekday_error) { Exceptions.push(new DateFormatException(weekday_error)); }
        try {
            month = `${date.toLocaleString('en-us', { month: format.month ?? 'long' })}`;
            if (format.month)
                date_string += `${month} `;
        } catch(month_error) { Exceptions.push(new DateFormatException(month_error)); }
        try {
            day = format.day == 'ordinal' ? getOrdinalNumber(date.getDate()) : date.toLocaleString('en-us', { day: format.day ?? '2-digit' });
            if (format.day)
                date_string += day; 
        } catch(day_error) { Exceptions.push(new DateFormatException(day_error)); }
        try {
            year = `${date.toLocaleString('en-us', { year: format.year ?? 'numeric' })}`.trim();
            if (format.year)
                date_string += `${(month || day ? ', ' : '')}${year}`.trim();
        } catch(year_error) { Exceptions.push(new DateFormatException(year_error)); }
        
        if (Exceptions.length > 0) 
            throw "\tList Of Thrown Exceptions:\n";

    } catch (err) { 
        console.log(err + $.map(Exceptions, e => e.message).join('\n'));
    }
    return settings.list ? { "string": date_string, "date": date, "weekday": weekday, "month": month, "day": day, "year": year } : date_string.trim();
}

const getDate = (element) => {
    let date;
    try {
        date = $.datepicker.parseDate("mm/dd/yy", element.value);
    } catch (err) {
        date = null;
    }
    return date;
}

const weekdayCalendar = (date) => (date.getDay() > 0 && date.getDay() < 6) ? [true, ''] : [false, '']; 

const withinWeek = (from, to) => to.getDate() - from.getDate() < 5 &&
                                 to.getMonth() - from.getMonth() <= 1 && 
                                 to.getFullYear() === from.getFullYear();

                                
const getdb = async (path = $dbPath) => {   
    try {
        const response = await axios.get(path); 
        return JSON.parse(response.request.response);
    } catch (err) { console.log(err); } 
}
 
const $mmddyyyy = (val) => /^(0?[1-9]|1[0-2])\/(((?<=(0[13578]\/)|([13578])\/|(1[02]\/))([12][0-9]|0?[1-9]|30|31))|((?<=(02\/)|(2\/))([12][0-9]|0?[1-9]))|((?<=(0[469]\/)|([469]\/)|(11\/))([12][0-9]|0?[1-9]|30)))\/([12][0-9]{3})$/.test(val);
const validateDate = (val) => {
    if (!$mmddyyyy(val)) return false;
    let parts = val.split('/'),
        day = parseInt(parts[1], 10),
        month = parseInt(parts[0], 10),
        year = parseInt(parts[2], 10),
                    //  Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
        monthLengths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        // Adjusting for leap years...
        if (!(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            && month == 2 && day > 28) return false; 

    return true;
}
const weekValidation = (from, to) => validateDate($(from).val()) && validateDate($(to).val());

const dayRatio = (24*3600*1000);

const logLength = (from, to) => {
    let days = 1 + Math.round( (to.getTime() - from.getTime()) / dayRatio );
    let sat = Math.floor( (days + from.getDay()) / 7 );
    return days - (2 * sat) + (from.getDay() == 7 /* Sunday */) - (to.getDay() == 6 /* Saturday */); 
}

const logDate = () => {

}

const getListOfDays = (worklogs = $worklog) => {
    let ListOfDays = [];
    $.each(worklogs, (i, log) => {
        let dates = [from, to] = log.Week.replaceAll(' ', '').split('-'), date = new Date(from); 
        for (let i = 0; i < log.Logs.length - 2; i++) {
            date.setDate(date.getDate() + 1);
            dates.push(date.toLocaleDateString());
        }
        ListOfDays.push(dates.sort((a, b) => new Date(a) - new Date(b)));
    });
    return ListOfDays; 
}

const mergeAll = (list_of_lists) => {
    let concat = [];
    $.each(list_of_lists, (i, list) => {
        concat = $.merge(concat, list); 
    });
    return concat;
}

const dateFilter = (date) => { 
    let days = mergeAll(getListOfDays()), 
        date1 = $.datepicker.formatDate('m/d/yy', date),
        date2 = $.datepicker.formatDate('mm/dd/yy', date);
    return [ 
        $.datepicker.noWeekends(date)[0] && 
        days.indexOf(date1) == -1 && 
        days.indexOf(date2) == -1 
    ];
} 

const generateIdMap = (quantity = 100) => generateUniqueIds(quantity).map((id) => ({ "id": id, "used": false }));

// use quantity = 10000 (10,000) for 4 digits [0000 - 9999].
const generateUniqueIds = (quantity = 100) => {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
        let n = generateId(quantity); 
        while (ids.includes(n)) 
            n = generateId(quantity);
        ids.push(n); 
    }
    return ids.sort();
} 

const generateId = (quantity = 100) => Math.floor((Math.random() * quantity) + quantity).toString().substring(1);

const getPadding = (container) => {
    let top = 0, bottom = 0, left = 0, right = 0, x = 0, y = 0;
    if (typeof container === 'object') {  
        top = parseFloat($(container).css('padding-top')),
        bottom = parseFloat($(container).css('padding-bottom')),
        left = parseFloat($(container).css('padding-left')),
        right = parseFloat($(container).css('padding-right')),
        x = left + right,
        y = top + bottom;
    }
    return { top, bottom, left, right, x, y };
}

const getMargin = (container) => {
    let top = 0, bottom = 0, left = 0, right = 0, x = 0, y = 0;
    if (typeof container === 'object') {  
        top = parseFloat($(container).css('margin-top')),
        bottom = parseFloat($(container).css('margin-bottom')),
        left = parseFloat($(container).css('margin-left')),
        right = parseFloat($(container).css('margin-right')),
        x = left + right,
        y = top + bottom;
    }
    return { top, bottom, left, right, x, y };
}

const getTextSize = (text, stylize) => {
    let _text = typeof text === 'object' ? $(text).text() : text,
        _stylize = stylize ? stylize : typeof text === 'object' 
            ? { size: $(text).css('font-size'), family: $(text).css('font-family') } 
            : { size: '20px', family: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' },
        style = `white-space: nowrap; width: auto; height: auto; position: absolute; font-size: ${_stylize.size}; font-family: ${_stylize.family};`,
        tspan = `<span id ="insides" style="${style}">${_text}</span>`;
    $('body').append(tspan);
    let width = $(`#insides`).width(),
        height = $(`#insides`).height();
    $('#insides').remove();
    return { width, height };
}

const getMeasurements = (container, stylize) => {
        padding = getPadding(typeof container === 'object' ? container : stylize),
        margin = getMargin(typeof container === 'object' ? container : stylize),
        width = stylize ? $(stylize).innerWidth() - padding.x - margin.x : 0,
        height = stylize ? $(stylize).innerHeight() - padding.y - margin.y : 0,
        size = { width, height },
        text = getTextSize(container, stylize 
            ? { size: stylize.size ?? $(stylize).css('font-size'), family: stylize.family ?? $(stylize).css('font-family') } 
            : typeof container === 'object' ? { size: $(container).css('font-size'), family: $(container).css('font-family') } : container),
        fitX = text.width <= width,
        fitY = text.height <= height;
    return { padding, margin, size, fitX, fitY, text }
}

const changeDropdown = (selected = $(`#week-selector-option-${$($weekDropdown).prop('selected')}`)) => {
    $($weekDropdownText).text(getMeasurements($(selected), $($weekDropdown)).fitX 
    ? $(selected).text() 
    : getMeasurements($(selected).text().split('-')[0], $($weekDropdown)).fitX 
        ? $(selected).text().split('-')[0]
        : $(selected).text().split('-')[0].split('/')[0] + '/' + $(selected).text().split('-')[0].split('/')[1]);
    $($weekDropdown).prop('selected', $(selected).attr('value'));
    $($weekDropdown).trigger('change');
} 

const changeDropdownNoTrigger = (selected = $(`#week-selector-option-${$($weekDropdown).prop('selected')}`)) => {
    $($weekDropdownText).text(getMeasurements($(selected), $($weekDropdown)).fitX 
    ? $(selected).text() 
    : getMeasurements($(selected).text().split('-')[0], $($weekDropdown)).fitX 
        ? $(selected).text().split('-')[0]
        : $(selected).text().split('-')[0].split('/')[0] + '/' + $(selected).text().split('-')[0].split('/')[1]);
    $($weekDropdown).prop('selected', $(selected).attr('value')); 
} 

const scaleToFit = (container, fontsize = null) => {

    let containerWidth = $(container).width(),
        cfontsize = fontsize ?? $(container).css('font-size'),
        cfontfamily = $(container).css('font-family'),
        style = `white-space: nowrap; width: auto; height: auto; position: absolute; font-size: ${cfontsize}; font-family: ${cfontfamily};`,
        id = `${$(container).text().split(' ')[0].replaceAll('/', '')}`,
        textspan = `<span id ="insides-${id}" style="${style}">${$(container).text()}</span>`;

    $('body').append(textspan); 
    let width = $(`#insides-${id}`).width(); 
    $(`#insides-${id}`).remove(); 
    return width;
    //     canvas = document.createElement("canvas"),
    //     context = canvas.getContext("2d");
    //     context.font = `${cfontsize} ${cfontfamily}`;
    // let cwidth = context.measureText($(container).text()).width,
    //     fwidth = Math.ceil(cwidth) + "px";
    
         // insides = $(container).wrapInner(`<span id ="insides" style="white-space: nowrap"></span>`).children()[0],
        // n = 50;
    // console.log($(container).text())
    // console.log('containerWidth', containerWidth, $(container).outerWidth())
    // console.log(' width',  width)
    // // console.log('fwidth', fwidth)
    // console.log('***********************');
    // console.log('insides.width', $('#insides').width())

    // $(container).css('font-size', n);
    // while ($(`#insides-${id}`).width() > containerWidth)
    //     $(`#insides-${id}`).css('font-size', --n);
    
    // $(container).text($(insides).text());

}