
const $dbPath = `http://localhost:3000/api/v1/WorkLog`;

const minus = (id) => `minus-${id}`;
const plus = (id) => `plus-${id}`;
const $$minus = (id, options = {class: null, text: null}) => `<i class="fas fa-minus-square ${options.class ? options.class : ""}" id="${id ? minus(id) : ""}" active="true">${options.text ? ` ${options.text}` : ""}</i>`;
const $$plus = (id, options = {class: null, text: null}) => `<i class="fas fa-plus-square ${options.class ? options.class : ""}" id="${id ? plus(id) : ""}" active="false">${options.text ? ` ${options.text}` : ""}</i>`;

const $$hr = `<i class="bi bi-hr"></i>`;

const add_ = (id) => `add-${id}`;
const edit_ = (id) => `edit-${id}`;
const delete_ = (id) => `delete-${id}`;
const check_ = (id) => `check-${id}`;
const ex_ = (id) => `ex-${id}`;
const sqex_ = (id) => `sqex-${id}`;
const calendarIcon_ = (id) => `calendar-${id}`;
const question_ = (id) => `question-${id}`;

const $$add = (id, options = {class: null, text: null}) => `<i class="bi bi-plus-lg ${options.class ? options.class : ""}" id="${id ? `i-${add_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$edit = (id, options = {class: null, text: null}) => `<i class="bi bi-pencil-fill ${options.class ? options.class : ""}" id="${id ? `i-${edit_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$delete = (id, options = {class: null, text: null}) => `<i class="bi bi-trash-fill ${options.class ? options.class : ""}" id="${id ? `i-${delete_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$check = (id, options = {class: null, text: null}) => `<i class="bi bi-check-lg ${options.class ? options.class : ""}" id="${id ? `i-${check_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$ex = (id, options = {class: null, text: null}) => `<i class="bi bi-x-lg ${options.class ? options.class : ""}" id="${id ? `i-${ex_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$sqex = (id, options = {class: null, text: null}) => `<i class="bi bi-x-square ${options.class ? options.class : ""}" id="${id ? `i-${sqex_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$calendarIcon = (id, options = {class: null, text: null}) => `<i class="bi bi-calendar2-range ${options.class ? options.class : ""}" id="${id ? `i-${calendarIcon_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;
const $$question = (id, options = {class: null, text: null}) => `<i class="bi bi-question-circle ${options.class ? options.class : ""}" id="${id ? `i-${question_(id)}` : ""}">${options.text ? ` ${options.text}` : ""}</i>`;


const $AEDbuttons = (id) => `<button class="btn btn-sm btn-outline-secondary" id="${delete_(id)}">${$$delete(id)}</button><button class="btn btn-sm btn-outline-secondary" id="${edit_(id)}">${$$edit(id)}</button><button class="btn btn-sm btn-outline-secondary" id="${add_(id)}">${$$add(id)}</button>`;
const $CEDbuttons = (id) => `<button class="btn btn-sm btn-outline-secondary" id="${delete_(id)}">${$$delete(id)}</button><button class="btn btn-sm btn-outline-secondary" id="${edit_(id)}">${$$edit(id)}</button><button class="btn btn-sm btn-outline-secondary" id="${check_(id)}">${$$check(id)}</button>`;


const $quillToolbarOptions = [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],        // custom dropdown
    ['bold', 'italic', 'underline', 'strike'],              // toggled buttons
    // ['blockquote', 'code-block'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],               // outdent/indent
    [{ 'align': [] }],

    [{ 'header': 1 }, { 'header': 2 }],    // custom button values
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // [{ 'direction': 'rtl' }],                            // text direction
    
    [{ 'script': 'sub' }, { 'script': 'super' }],           // superscript/subscript

    [{ 'color': [] }, { 'background': [] }],                // dropdown with defaults from theme

    ['link', 'image'],
    // ['clean']                                            // remove formatting button
];

const $addLogsButton = `#add-logs-button`;
const $allLogsButton = `#show-all-logs-button`;
const $clearLogsButton = `#clear-all-logs-button`;
const $deleteLogsButton = `#delete-logs-button`;
const $refreshLogsButton = `#refresh-logs-button`;
const $hideLogsButton = `#hide-all-logs-button`;

const $weekSelector = `#week-selector`;
const $logContainer = (id) => `#log-container-${id}`;
const $logDiv = `#log-div`;
const $addLogDiv = `#add-log-div`;
const $addLogTextarea = `#add-log-textarea`;
const $addLogDateStart = `#add-log-datepicker-start`;
const $addLogDateFinish = `#add-log-datepicker-finish`;
const $addLogTextEditor = `${$addLogTextarea} .ql-editor`;

const $weekDropdown = `${$weekSelector}-dropdown`;
const $weekDropdownMenu = `${$weekDropdown}-menu`;
const $weekDropdownText = `${$weekDropdown}-text`;

var $startDate;
var $endDate;

var $worklog = [];
var $workweeks = [];
var $logs = [];

var $quills = [];
var $logText = [];

class HttpClient {
    constructor() {

        /**
         * Generates the Add Log Div and connects the utilities
         * @param {*} settings 
         */
        this.genAddLog = (settings = {id: null, }) => {
            // #region add-log-html
            $($addLogDiv).append(`
                <form id="add-log-form" class="form-field-container bordered add-log-form">
                    <div class="d-flex justify-content-between">
                        <span class="form-heading-div"><h5>New Work Log:</h5></span> 
                        <h5 style="padding: 0;">
                            <span class="form-heading-delete" id="">
                                <i class="bi bi-x-square" id="add-log-close"></i> 
                            </span>
                        </h5>
                    </div>
                    <hr>
                    `+ /* Date Inputs */ `
                    <div class="row mx-0 my-1 mt-2" id="add-log-container-dates">
                        <div class="col"> 
                            <div class="input-group">
                                `+ /* Left-side | */ ` 
                                <div class="input-group-prepend">
                                    <div class="input-group-text" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                        ${"|"}
                                    </div>
                                </div>
                                `+ /* Start Date Input */ `
                                <input type="text" class="form-control text-center" id="add-log-datepicker-start" placeholder="Start">
                                `+ /* Center 'to' */ `
                                <div class="input-group-append">
                                    <div class="input-group-text" style="border-radius: 0">
                                        ${"to"}
                                    </div>
                                </div>
                                `+ /* Finish Date Input */ `
                                <input type="text" class="form-control text-center" id="add-log-datepicker-finish" placeholder="Finish">
                                `+ /* Right-side | */ `
                                <div class="input-group-append">
                                    <div class="input-group-text" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                        ${"|"}
                                    </div>
                                </div>
                                `+`
                            </div>
                        </div> 
                    </div>
                    `+ /* New Work Log Controls */ `
                    <div class="row mx-0 my-1" id="add-log-container-controls">
                        <div id="add-log-controls-col" class="col-3 form-group mb-1 pr-1"> 
                            `+ /* Control Panel */ `
                            <div id="add-log-controls-container" class="col-auto form-group add-log-control-group d-flex flex-column" style="">
                                
                                `+ /* Control 1 */`
                                <div class="input-group input-group-sm mb-1 d-flex">
                                    <span class="input-group-prepend input-group-text"> 
                                        ${$$calendarIcon('add-log-control-length')}  
                                    </span>
                                    <input id="add-log-control-length" class="form-control text-truncate text-center" readonly="" style="background-color: transparent;" type="text">
                                </div> 

                                `+ /* Control 2 */`
                                <div class="input-group input-group-sm my-1 d-flex">
                                    <span class="input-group-prepend input-group-text"> 
                                        ${$$question('add-log-control-')}  
                                    </span>
                                    <input id="add-log-control-" class="form-control text-truncate text-center" readonly="" style="background-color: transparent;" type="text">
                                </div> 

                                `+ /* Control 3: Cancel */`
                                <div class="input-group my-1 d-flex">
                                    <span class="input-group-prepend">
                                        <div class="input-group-text input-group-button-append input-group-button-append-danger" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                            ${'<i class="bi bi-x-circle"></i>'} 
                                        </div>
                                    </span>
                                    <button id="add-log-control-cancel" class="form-control text-truncate btn btn-danger input-group-button">Cancel</button>
                                    <span class="input-group-append">
                                        <div class="input-group-text input-group-button-append input-group-button-append-danger" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            ${'<i class="bi bi-x-circle"></i>'} 
                                        </div>
                                    </span>
                                </div> 


                                `+ /* Control 4: Clear */`
                                <div class="input-group my-1 d-flex">
                                    <span class="input-group-prepend">
                                        <div class="input-group-text input-group-button-append input-group-button-append-warning" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                            ${'<i class="bi bi-dash-circle"></i>'} 
                                        </div>
                                    </span>
                                    <button id="add-log-control-clear" class="form-control text-truncate btn btn-warning input-group-button">Clear</button>
                                    <span class="input-group-append">
                                        <div class="input-group-text input-group-button-append input-group-button-append-warning" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            ${'<i class="bi bi-dash-circle"></i>'} 
                                        </div>
                                    </span>
                                </div> 

                                `+ /* Control 5: Accept */`
                                <div class="input-group mt-1 d-flex">
                                    <span class="input-group-prepend">
                                        <div class="input-group-text input-group-button-append input-group-button-append-success" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                            ${'<i class="bi bi-check-circle"></i>'} 
                                        </div>
                                    </span> 
                                    <button id="add-log-control-accept" class="form-control text-truncate btn btn-success input-group-button" type="button">Accept</button>
                                    <span class="input-group-append">
                                        <div class="input-group-text input-group-button-append input-group-button-append-success" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            ${'<i class="bi bi-check-circle"></i>'} 
                                        </div>
                                    </span>                                        
                                </div> 


                            </div>
                          
                        </div> 

                        `+ /* Quilljs Textarea */`
                        <div id="add-log-textarea-col" class="col-9 mb-1 pl-1">
                            <div id="add-log-textarea-container" class="form-control d-flex flex-column quill-static" style="padding: 0; height: 100%;">
                                <div id="add-log-textarea" class="add-log-textarea">
                                </div>
                            </div>
                        </div>


                    </div>
                    `+`
                </form>
            `);
            // #endregion        

            // #region add-log-quill
            let logQuill = $quills[settings.id] = new Quill($addLogTextarea, { modules: { toolbar: $quillToolbarOptions  }, theme: 'snow' });
                    
            $(`${$addLogTextarea}-container .ql-toolbar`).addClass('add-log-textarea-toolbar').attr('id', `add-log-textarea-toolbar`).append(addDividerButton(`add-log`));
            linkDividerButton(logQuill, `add-log`);
            $($addLogTextarea).before('<small id="add-log-textarea-planned-tag" class="text-muted mx-1" style="padding:0.25rem">&nbsp;Planned:<hr class="hr-fade"></small>').addClass("d-flex").css("overflow", "auto");
            $($addLogTextEditor).addClass("px-4").css("flex-grow", "1").css("padding-top", "0");
            // #endregion

            // #region add-log-datepickers
            /**
             * @param {element} $dps datapicker container for starting date
             * @param {element} $dpf datapicker container for ending date
             */
            var validateWeek = ($dps, $dpf) => {
                let validWeek = weekValidation($dps, $dpf); 
                $(`#add-log-control-accept`).prop("disabled", !validWeek); 
                $(`#add-log-control-length`).val( validWeek ? logLength($dps.datepicker('getDate'), $dpf.datepicker('getDate')) : null);
                return validWeek;
            }

            // #region add-log-datepicker-start
            $($addLogDateStart).datepicker({
                autoclose: true,
                beforeShowDay: dateFilter,
                // beforeShowDay: $.datepicker.noWeekends,
                onSelect: function(dateText, inst) {
                    let date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay), 
                        $dpf = $($addLogDateFinish),
                        $dps = $($addLogDateStart),
                        offset = 0;  
                    while (date.getDay() + offset < 5) offset++;   
                    $dpf.datepicker("option", "minDate", getDate(this)).trigger('change').trigger('input'); 
                    if (!$dpf.val())// if (!$dpf.val() || !withinWeek(date, $dpf.datepicker("getDate"))) 
                        $dpf.datepicker("setDate", new Date(date.setDate(date.getDate() + offset))).trigger('change').trigger('input');  
                    validateWeek($dps, $dpf); 
                }, 
            }).on({ 
                change: function() { 
                    // let $dpf = $($addLogDateFinish),
                    //     $dps = $($addLogDateStart);
                    // $dpf.datepicker("option", "minDate", getDate(this)); 
                    // validateWeek($dps, $dpf);  
                    $($addLogDateStart).trigger('input');
                },
                input: function() {
                    let $dpf = $($addLogDateFinish),
                        $dps = $($addLogDateStart);
                    $dpf.datepicker("option", "minDate", getDate(this));  
                    validateWeek($dps, $dpf);  

                },
                mouseover: function() { $(this).css("background-color", "#f8f9fa") },                
                mouseout: function() { $(this).css("background-color", "white") }, 
            });
            // #endregion 
            // #region add-log-datepicker-finish
            $($addLogDateFinish).datepicker({
                autoclose: true,
                beforeShowDay: dateFilter,
                // beforeShowDay: $.datepicker.noWeekends,
                onSelect: function(dateText, inst) { 
                    let date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay),
                        $dpf = $($addLogDateFinish),
                        $dps = $($addLogDateStart),
                        offset = 0;
                    while (date.getDay() - offset > 1) offset++;
                    $dps.datepicker("option", "maxDate", getDate(this)).trigger('change');
                    if(!$dps.val())
                        $dps.datepicker("setDate", new Date(date.setDate(date.getDate() - offset))).trigger('change');  
                    validateWeek($dps, $dpf);
                }
            }).on({
                change: function() { 
                    let $dpf = $($addLogDateFinish),
                        $dps = $($addLogDateStart);
                    $dps.datepicker("option", "maxDate", getDate(this)); 
                    validateWeek($dps, $dpf);
                },
                input: function() {
                    let $dpf = $($addLogDateFinish),
                        $dps = $($addLogDateStart);
                    $dps.datepicker("option", "maxDate", getDate(this)); 
                    validateWeek($dps, $dpf);
                },
                mouseover: function() { $(this).css("background-color", "#f8f9fa") }, 
                mouseout: function() { $(this).css("background-color", "white") }
            });  
            // #endregion
            // #endregion
            
            $(window).bind('resizeEnd', function() { textareaConstraint(); });
 
            // #region add-controls
            $(`#add-log-control-cancel, #add-log-close`).click((e) => {
                e.preventDefault();
                $($addLogsButton).click(); 
            });
            $(`#add-log-control-clear`).click((e) => {
                e.preventDefault();
                $($addLogTextEditor).empty();
                $($addLogDateStart).val(null);
                $($addLogDateFinish).val(null);
                $(`#add-log-control-length`).val(null);
            }); 
            $(`#add-log-control-accept`).click((e) => {
                e.preventDefault(); 
                postWorkLogWithResult();
            }).prop('disabled', true);
            // #endregion
        }

        // #region generate
        /**
         * Appends to the $logDiv element a worklog
         * @param { worklogObject } logs The worklog entry 
         * @returns 
         */
        this.genLogList = (logs) => $($logDiv).find(`${$logContainer(logs.id)}`).length > 0 ? false :
            $($logDiv).append(`
            <div class="form-field-container bordered-hidden" id="log-container-${logs.id}" index=${logs.id}> 
                <b class="form-heading d-flex justify-content-between input-group">
                    <span class="d-flex flex-row"> 
                        <span class="form-heading-span" id="form-heading${logs.id}-btn">
                            ${$$minus(logs.id)}${$$plus(logs.id)}
                        </span>
                        <div class="form-heading-div form-list-group-item-action" id="form-heading${logs.id}">
                            ${logs.Week}
                        </div> 
                    </span>
                    <span class="form-heading-div">
                        <span class="form-heading-delete" id="form-heading${logs.id}-delete">
                            ${$$sqex(logs.id)} 
                        </span>
                    </span>
                </b>
                <ul class="form-list-group" id="log-list${logs.id}"></ul>
            </div>
        `);

        /**
         * Appends to the log-list the daily logs
         * @param { worklogObject } logs The worklog entry 
         */
        this.genPlans = (logs) => { 
            $(`#log-list${logs.id}`).append(` 
                <li class="form-list-group-item form-list-group-item-action" id="info-${logs.id}">
                    <div class="d-flex w-100 justify-content-between log-header" id="log-info-${logs.Week.replaceAll(' ', '')}">
                        <small class="text-muted">Info:</small><small class="text-muted"><hours id="hours-info-${logs.id}">${getFormatDate({date: logs.Week.split(' - ')[0], month: 'long', day:'ordinal', weekday: 'long'})} - ${getFormatDate({date: logs.Week.split(' - ')[1], month: 'long', day:'ordinal', weekday: 'long'})}</hours></small>
                    </div>
                    <pre id="pre-${logs.id}" class="log-pre"><hr><hr><span class="d-flex w-100 justify-content-between log-header" id="log-Planned-${logs.Week.replaceAll(' ', '')}"><small class="text-muted">Planned:</small><small class="text-muted"><hours id="hours-Planned-${logs.id}">| P : ${logs.Planned.length} |</hours></small></span><hr id="hr-Planned-${logs.id}" style="color: transparent;"><div id="textarea-Planned-${logs.id}">${logs.Planned}</div><hr style="color: transparent;"><hr style="color: transparent;"><span class="d-flex w-100 flex-sm-row-reverse"><small class="btn-group btn-group-sm" role="group">${$CEDbuttons("Planned-" + logs.id)}</small></span><hr><hr><span class="d-flex w-100 justify-content-between log-header" id="log-Accomplished-${logs.Week.replaceAll(' ', '')}"><small class="text-muted">Accomplished:</small><small class="text-muted"><hours id="hours-Accomplished-${logs.id}">| A : ${logs.Accomplished.length} |</hours></small></span><hr id="hr-Accomplished-${logs.id}" style="color: transparent;"><div id="textarea-Accomplished-${logs.id}">${logs.Accomplished}</div><hr style="color: transparent;"><hr style="color: transparent;"><span class="d-flex w-100 flex-sm-row-reverse"><small class="btn-group btn-group-sm" role="group">${$CEDbuttons("Accomplished-" + logs.id)}</small></span><hr><hr><span class="d-flex w-100 justify-content-between log-header" id="log-Questions-${logs.Week.replaceAll(' ', '')}"><small class="text-muted">Questions:</small><small class="text-muted"><hours id="hours-Questions-${logs.id}">| Q : ${logs.Questions.length} |</hours></small></span><hr id="hr-Questions-${logs.id}" style="color: transparent;"><div id="textarea-Questions-${logs.id}">${logs.Questions}</div><hr style="color: transparent;"><hr style="color: transparent;"><span class="d-flex w-100 flex-sm-row-reverse"><small class="btn-group btn-group-sm" role="group">${$CEDbuttons("Questions-" + logs.id)}</small></span><hr><hr></pre>          
                </li>
            `);
        }

        /**
         * 
         * @param {object { Week: string, Logs: [], Accomplished: [], Planned: [], Questions: [], id: string } } logs The worklog entry 
         * @returns 
         */
        this.genLogListItems = (logs) => $.each(logs.Logs, (i, log) => {
            $(`#log-list${logs.id}`).append(`
                <li class="form-list-group-item form-list-group-item-action" id="${log.date.replace(' ', '')}">
                    <div class="d-flex w-100 justify-content-between log-header" id="log-${log.date.replace(' ', '')}">
                        <small class="text-muted">${log.date}</small><small class="text-muted"><hours id="hours-${log.date.replace(' ', '')}">${log.hours}</hours></small>
                    </div>
                    <pre id="pre-${log.date.replace(' ', '')}" class="log-pre"><hr id="hr-${log.date.replace(' ', '')}"><div id="textarea-${log.date.replace(' ', '')}">${log.activity}</div><hr><span class="d-flex w-100 flex-sm-row-reverse"><small class="btn-group btn-group-sm" role="group">${$CEDbuttons(log.date.replace(' ', ''))}</small></span></pre>
                </li>
            `);
        });

        this.actions = {
            "logItem": (logId, action = null) => {
                let elements = $(`#log-list${logId}>li pre, #log-list${logId}>li hours`);
                $.each(elements, (i, element) => {
                    action == null ? $(element).is("pre") ? $(element).slideToggle(300) : $(element).fadeToggle(300)
                        : action == 1 || action == "show" ? $(element).is("pre") ? $(element).slideDown(300) : $(element).fadeIn(300)
                            : action == 0 || action == "hide" ? $(element).is("pre") ? $(element).slideUp(300) : $(element).fadeOut(300)
                                : $(element).toggle(1000, function () { console.log("This shouldn't ever occur."); });
                });
            },

            /**
             * 
             * @param {*} info 
             * @param {*} id 
             */
            "infoEdit": (info, id) => { 
                $(`#${edit_(`${info}-${id}`)}`).click((e) => {
                    e.preventDefault();
                    
                    $(`#textarea-${info}-${id}`).remove();
                    $(`#hr-${info}-${id}`).after(`<div id="textarea-${info}-${id}">${$worklog.find(e => e.id == id)[info]}</div>`);
                    
                    let logQuill = $quills[`${info}-${id}`] = new Quill(`#textarea-${info}-${id}`, { modules: { toolbar: $quillToolbarOptions  }, theme: 'snow' });
                    $(`#pre-${id} .ql-toolbar`).attr('id', `textarea-${info}-${id}-toolbar`).append(addDividerButton(`${info}-${id}`));
                    
                    linkDividerButton(logQuill, `${info}-${id}`);
                    
                    logQuill.focus();
                    logQuill.setSelection(logQuill.getLength(), logQuill.getLength());
                    
                    $.each($(`#pre-${id}>div[id*='${info}']`), (i, element) => {
                        $(element).css('background-color', 'white'); 
                        $(element).css('border', 'none');
                    });

                    $(`#pre-${id} .ql-toolbar`).css('border-bottom', '1px solid #ced4da').css('cursor', 'default');//.css('margin-bottom', '5px');
                    
                    $.each($(`#pre-${id}>div[id*='${info}']>div`), (i, element) => {
                        // $(element).css('padding', '0');
                    });

                    $logText[`${info}-${id}`] = $quills[`${info}-${id}`].root.innerHTML.replaceAll('<p>', '').replaceAll('</p>', '');
                    
                    $(`#${edit_(`${info}-${id}`)}`).prop('disabled', true);
                    $(`#${check_(`${info}-${id}`)}`).prop('disabled', false);
                    $(`#${delete_(`${info}-${id}`)}`).prop('disabled', false);
                }).click();
            },

            /**
             * 
             * @param {*} info 
             * @param { string } id 
             */
            "infoAcceptEdit": (info, id) => {
                let _this = this;
                $(`#${check_(`${info}-${id}`)}`).prop('disabled', true);
                $(`#${check_(`${info}-${id}`)}`).click((e) => {
                    e.preventDefault();   
                    $worklog.find(e => e.id == id)[info] = [$quills[`${info}-${id}`].root.innerHTML.replaceAll('<p>', '').replaceAll('</p>', '')];
                    _this.put(info, id);
                    _this.actions.infoEditCleanUp(info, id);
                }).click();
            },

            /**
             * 
             * @param {*} info 
             * @param {*} id 
             */
            "infoCancelEdit": (info, id) => {
                let _this = this;
                $(`#${delete_(`${info}-${id}`)}`).prop('disabled', true);
                $(`#${delete_(`${info}-${id}`)}`).click((e) => {
                    e.preventDefault();
                    $(`#textarea-${`${info}-${id}`} .ql-editor`).empty().append($logText[`${info}-${id}`]);
                    _this.actions.infoEditCleanUp(info, id);
                });
            },

            /**
             * 
             * @param {*} info 
             * @param {*} id 
             */
            "infoEditCleanUp": (info, id) => {
                $(`#${delete_(`${info}-${id}`)}`).prop('disabled', true);
                $(`#${check_(`${info}-${id}`)}`).prop('disabled', true);
                $(`#${edit_(`${info}-${id}`)}`).prop('disabled', false);
                $.each($(`#pre-${id}>div[id*='${info}']`), (i, element) => {
                    $(element).css('background-color', 'inherit');
                    $(element).css('padding', '0'); 
                });
                $.each($(`#pre-${id}>div[id*='${info}']>div`), (i, element) => {
                    $(element).css('padding', '0');
                });
                $(`#textarea-${info}-${id}-toolbar`).remove();
                $quills[`${info}-${id}`].enable(false);
                $quills = $.grep($quills, function(value) {
                    return value != `${info}-${id}`;
                });
            },

            /**
             * 
             * @param {*} log 
             */
            "logEdit": (log) => { 
                let logId = log.date.replace(' ', '');
                $(`#${edit_(logId)}`).click((e) => {
                    e.preventDefault();  
                    $(`#textarea-${logId}`).remove();
                    $(`#hr-${logId}`).after(`<div id="textarea-${logId}">${log.activity}</div>`);
                    let logQuill = $quills[logId] = new Quill(`#textarea-${logId}`, { modules: { toolbar: $quillToolbarOptions  }, theme: 'snow' });
                    $(`#pre-${logId} .ql-toolbar`).attr('id', `textarea-${logId}-toolbar`).append(addDividerButton(logId));
                    linkDividerButton(logQuill, logId);
                    logQuill.focus();
                    logQuill.setSelection(logQuill.getLength(), logQuill.getLength());
                    $.each($(`#pre-${logId}>div`), (i, element) => {
                        $(element).css('background-color', 'white'); 
                        $(element).css('border', 'none'); 
                    });
                    $(`#pre-${logId} .ql-toolbar`).css('border-bottom', '1px solid #ced4da');//.css('margin-bottom', '5px');
                    $.each($(`#pre-${logId}>div>div`), (i, element) => {
                        // $(element).css('padding', '0');
                    });
                    $logText[logId] = $quills[logId].root.innerHTML.replaceAll('<p>', '').replaceAll('</p>', '');
                    $(`#${edit_(logId)}`).prop('disabled', true);
                    $(`#${check_(logId)}`).prop('disabled', false);
                    $(`#${delete_(logId)}`).prop('disabled', false);

                }).click(); 
            },

            /**
             * 
             * @param {*} id 
             */
            "logEditCleanUp": (id) => {
                $(`#${delete_(id)}`).prop('disabled', true);
                $(`#${check_(id)}`).prop('disabled', true);
                $(`#${edit_(id)}`).prop('disabled', false);
                $.each($(`#pre-${id}>div`), (i, element) => {
                    $(element).css('background-color', 'inherit');
                    $(element).css('padding', '0'); 
                });
                $.each($(`#pre-${id}>div>div`), (i, element) => {
                    $(element).css('padding', '0');
                });
                $(`#textarea-${id}-toolbar`).remove();
                $quills[id].enable(false);
                $quills = $.grep($quills, function(value) {
                    return value != id;
                });
            },

            /**
             * 
             * @param {*} logId 
             * @param {*} logs 
             */
            "logAcceptEdit": (logId, logs) => {
                let _this = this;
                let id = logId.date.replace(' ', '');
                $(`#${check_(id)}`).prop('disabled', true);
                $(`#${check_(id)}`).click((e) => {
                    e.preventDefault();   
                    $worklog.find(e => e.id == logs.id).Logs[logId.id].activity = [$quills[id].root.innerHTML.replaceAll('<p>', '').replaceAll('</p>', '')];
                    _this.put(logId.id, logs.id);
                    _this.actions.logEditCleanUp(id);
                }).click();
            },

            /**
             * 
             * @param {*} logId 
             * @param {*} logs 
             */
            "logCancelEdit": (logId, logs) => {
                let _this = this;
                let id = logId.date.replace(' ', '');
                $(`#${delete_(id)}`).prop('disabled', true);
                $(`#${delete_(id)}`).click((e) => {
                    e.preventDefault();
                    $(`#textarea-${id} .ql-editor`).empty().append($logText[id]);
                    _this.actions.logEditCleanUp(id);
                });

            }
        };

        /**
         * 
         * @param { worklogObject } logs 
         * @returns 
         */
        this.linkControls = (logs) => {
            var _this = this;
            var actions = this.actions;
            var controls = [

                function logListItems() { 

                    $.each($(`#log-list${logs.id}>li`), (i, element) => {
                        $(element).on({
                            mouseover: function(e) {
                                $(this).css('background-color', '#f8f9fa'); 
                            }, 
                            mouseout: function(e) {
                                $(this).css('background-color', 'inherit'); 
                            },
                            click: function(e) {
                                if (e.currentTarget === e.target) {
                                    $(this).find("pre").slideToggle(300);
                                    $(this).find("hours").fadeToggle(300); 
                                }  
                            },
                            mousedown: function(e) {
                                if (e.currentTarget === e.target) { 
                                    $(this).css('background-color', '#ebebeb');
                                }
                            },
                            mouseup: function(e) {
                                $(this).css('background-color', '#f8f9fa');
                            }
                        })              
                    }).click();

                    // $.each($(`#log-list${logs.id}>li`), (i, element) => {
                    //     $(`#log-${element.id}`).click(function() { 
                    //         $(this).parent().find("pre").slideToggle(300);
                    //         $(this).parent().find("hours").fadeToggle(300);
                    //     }); 
                    // }); 
                },

                function logButtons() {
                    $.each(["Planned", "Accomplished", "Questions"], (i, item) => {
                        actions.infoEdit(item, logs.id);
                        actions.infoAcceptEdit(item, logs.id);
                        actions.infoCancelEdit(item, logs.id);
                    });
                    $.each(logs.Logs, (i, log) => {
                        actions.logEdit(log);
                        actions.logAcceptEdit(log, logs);
                        actions.logCancelEdit(log, logs);
                    });
                },

                function formHeadingBtn() {
                    $(`#form-heading${logs.id}-btn`).click(function () {

                        if ($(`#${plus(logs.id)}`).is(":visible") && $(`#${minus(logs.id)}`).is(":visible") || 
                            !$(`#${plus(logs.id)}`).is(":visible") && !$(`#${minus(logs.id)}`).is(":visible")) 
                            if ($(`#log-list${logs.id}`).is(":visible")) {
                                $(`#${plus(logs.id)}`).show();
                                $(`#${minus(logs.id)}`).hide();
                            } else {
                                $(`#${plus(logs.id)}`).hide();
                                $(`#${minus(logs.id)}`).show();
                            } 

                        $(`#form-heading${logs.id}-btn`).children().toggle(0, function () {
                            
                        });
                        $(`#log-list${logs.id}`).slideToggle(300, function() {

                        }).promise().done(function () {
 
                        });
                        $($logContainer(logs.id)).toggleClass("bordered-hidden"); 
                        $($logContainer(logs.id)).toggleClass("bordered");

                        // $({alpha:1}).animate({alpha:0}, {
                        //     duration: 500,
                        //     step: function() {
                        //         $($logContainer(logs.id)).css(`border-color`, `rgba(206, 212, 218, ${this.alpha})`);
                        //     }
                        // });
                    }).click();

                },

                function formHeading() {
                    $(`#form-heading${logs.id}`).click(function () {
                        let preList = `#log-list${logs.id}>li pre`;
                        $(`${preList}:visible`).length >= $(`${preList}:not(:visible)`).length
                            ? actions.logItem(logs.id, 0) // Collapse Logs 
                            : actions.logItem(logs.id, 1); // Expand Logs
                    });
                },

                function formHeadingDelete() {
                    $(`#log-container-${logs.id}`).append(deleteModal({
                        id: logs.id,
                        title: `Log Week: ${logs.Week}`,
                        text: "Are you sure you want to delete this?"
                    }));

                    $(`#form-heading${logs.id}-delete`).click(function() {
                        $(`#modal-${logs.id}`).modal('show');
                    });

                    $(`#modal-close-${logs.id}, #modal-cancel-${logs.id}`).click(function() {
                        $(`#modal-${logs.id}`).modal('hide');
                    });

                    $(`#modal-delete-${logs.id}`).click(function(e) {
                        $(`#modal-${logs.id}`).modal('hide');
                        _this.delete(logs.id);
                    });
                    // need to add DELETE
                },

            ];
            $.each(controls, (i, func) => func());
            return controls;
        };

        /**
         * 
         * @param { worklogObject } logs 
         * @param { boolean } hidden 
         */
        this.generateLogs = (logs, hidden = false) => {
            this.genLogList(logs);
            this.genPlans(logs);
            this.genLogListItems(logs);
            this.linkControls(logs);
            // $(`${$logContainer(logs.id)} b`).hide();
            // if (!hidden) $(`${$logContainer(logs.id)} b`).show(500);
            if (hidden) $(`${$logContainer(logs.id)}`).hide(); 
        };

        /**
         * 
         */
        this.generateAllLogs = () => {
            let _this = this;
            $($logDiv).children().hide(300).delay(150).promise().done(function () {
                $($logDiv).empty();
            }).promise().done(function () {
                $.each($worklog, (i, week) => {
                    _this.generateLogs(week, true);
                });
            });
        };

        /**
         * 
         * @param { worklogObject.id } weekId 
         * @param { boolean } reset 
         */
        this.renderRequest = (weekId, reset) => {
            let _this = this;
            $($logDiv).children().hide(300).delay(150).promise().done(function () {
                if (reset)
                    $($logContainer(weekId)).empty();
            }).promise().done(function () {
                $.each(weekId, (i, week) => {
                    if ($workweeks.includes(week) && $($logDiv).find(`${$logContainer(week)}`).length > 0) {
                        console.log("log-container", $logContainer(week));
                        $($logContainer(week)).show(300);
                    }
                    else
                        _this.request(week);
                });
            });
        };

        /**
         * 
         * @param { worklogObject.id } week 
         * @param { client } _this 
         * @returns 
         */
        this.request = (week, _this = this) => $.ajax({
            type: "GET",
            url: `${$dbPath}/${week}`,
            data: [],
            success: function (data) {
                $logs.push(data);
                _this.generateLogs(data, true);
            },
            error: function (err) {
                console.log(err);
            }
        });
 
        /**
         * 
         * @param { worklogObject.id } weekId 
         * @param { boolean } reset 
         */
        this.get = (weekId, reset = false) => {
            $logs = [];
            if (!Array.isArray(weekId))
                weekId = [weekId];
            this.renderRequest(weekId, reset);
        };

        /**
         * 
         * @param { function } genLogs 
         */
        this.getLogs = (genLogs = this.generateAllLogs) => {
            $.ajax({
                type: "GET",
                url: `${$dbPath}`,
                data: [],
                success: function (data) {
                    $worklog = data;
                    $workweeks = [];
                    $($weekSelector).empty()
                        .append(`<li><div value="all" class="dropdown-item" id="week-selector-option-all">All</div></li>`)
                        .append(`<li><div value="week" class="dropdown-item" id="week-selector-option-week">Week</div></li>`);
                    $.each($worklog, (i, log) => {
                        $($weekSelector).append(`<li><div value="${log.id}" class="dropdown-item" id="week-selector-option-${log.id}">${log.Week}</div></li>`); 
                        $workweeks.push(log.id);
                    });
                    $.each($(`${$weekSelector} li>div`), (i, item) => {
                        $(item).on({
                            click: (e) => {
                                e.preventDefault(); 
                                changeDropdown(item);
                            }
                        });
                    });
                    $(`#week-selector-option-all`).off();
                    $(`#week-selector-option-all`).click((e) => {
                        e.preventDefault();
                        $($allLogsButton).click();
                    });
                    $(`#week-selector-option-week`).off();
                    $(`#week-selector-option-week`).click((e) => {
                        e.preventDefault();
                        $($hideLogsButton).click();
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            }).promise().done(function () {
                genLogs();
            });
        };

        // #region post/post_async

        /**
         * Post new worklog object to database
         * @param { worklogObject } worklog 
         */
        this.post = (worklog) => {
            let _this = this;
            $.ajax({
                type: "POST",
                url: `${$dbPath}`,
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify(worklog),
                success: function(log) {

                    $worklog.push(log);
                    $workweeks.push(log.id);
                    $($weekSelector).append(`<li><div value="${log.id}" class="dropdown-item" id="week-selector-option-${log.id}">${log.Week}</div></li>`); 
                    $(`#week-selector-option-${log.id}`).click((e) => {
                        e.preventDefault(); 
                        changeDropdown($(`#week-selector-option-${log.id}`));
                    });
                    _this.generateLogs(log, $($weekDropdown).prop('selected') != 'all'); 
                    // console.log('successfully posted a new worklog:', log);
                    return log;
                },
                error: function(err) {
                    console.log(err);
                }
            })
        }

        /**
         * Asynchronously posts the new worklog object to the database
         * @param { worklogObject } worklog 
         * @returns 
         */
        this.post_async = async (worklog) => {
            let _this = this;
            return await $.ajax({
                type: "POST",
                url: `${$dbPath}`,
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify(worklog),
                success: function(log) {

                    $worklog.push(log)
                    $workweeks.push(log.id);
                    $($weekSelector).append(`<li><div value="${log.id}" class="dropdown-item" id="week-selector-option-${log.id}">${log.Week}</div></li>`); 
                    $(`#week-selector-option-${log.id}`).click((e) => {
                        e.preventDefault(); 
                        changeDropdown($(`#week-selector-option-${log.id}`));
                    });
                    _this.generateLogs(log, true);
                    if ($($weekDropdown).prop('selected') == 'all') {
                        $($logDiv).hide(400, function() {
                            $($addLogsButton).click();   
                            $(`#log-container-${log.id}`).show();
                        }).show(400, function() {

                        });
                    } else {
                        $($addLogsButton).click();
                    } 
                    // console.log('successfully posted a new worklog:', log);
                    return log;
                },
                error: function(err) {
                    console.log(err);
                }
            });  
        }

        // #endregion

        // #region put/put_async
        
        /**
         * PUT request to update worklog object specified by the weekId
         * @param {*} logId 
         * @param {*} weekId 
         */
        this.put = (logId, weekId) => { 
            $.ajax({
                type: "PUT",
                url: `${$dbPath}/${weekId}`,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    "Week": $worklog.find(e => e.id == weekId).Week, 
                    "Logs": $worklog.find(e => e.id == weekId).Logs,
                    "Accomplished": $worklog.find(e => e.id == weekId).Accomplished,
                    "Planned": $worklog.find(e => e.id == weekId).Planned,
                    "Questions": $worklog.find(e => e.id == weekId).Questions,
                    "id": $worklog.find(e => e.id == weekId).id 
                }),
                success: function(log) {
                    // console.log("successfully updated worklog:", log);

                },
                error: function(err) {
                    console.log(err);
                }
            })
        };

        /**
         * Asynchronous PUT request to update worklog object specified by the weekId
         * @param {*} logId 
         * @param {*} weekId 
         * @returns 
         */
        this.put_async = async (logId, weekId) => { 
            return await $.ajax({
                type: "PUT",
                url: `${$dbPath}/${weekId}`,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    "Week": $worklog.find(e => e.id == weekId).Week, 
                    "Logs": $worklog.find(e => e.id == weekId).Logs,
                    "Accomplished": $worklog.find(e => e.id == weekId).Accomplished,
                    "Planned": $worklog.find(e => e.id == weekId).Planned,
                    "Questions": $worklog.find(e => e.id == weekId).Questions,
                    "id": $worklog.find(e => e.id == weekId).id 
                }),
                success: function(log) {
                    // console.log("successfully updated worklog:", log);
                    return log;
                },
                error: function(err) {
                    console.log(err);
                }
            })
        };

        // #endregion

        // #region delete
        
        /**
         * DELETE request to delete the worklog object specified by the weekId
         * @param {*} weekId 
         */
        this.delete = (weekId) => {
            $.ajax({
                type: "DELETE",
                url: `${$dbPath}/${weekId}`,
                contentType: "application/json",
                success: function(response) {

                    $.grep($worklog, (log) => log.id != weekId);
                    $.grep($workweeks, (id) => id != weekId);
                    let selector = $(`#week-selector-option-${weekId}`),
                        container = $(`#log-container-${weekId}`);
                    selector.hide(400).promise().done(function() {
                        selector.remove();
                    });
                    container.children().hide(400).promise().done(function() {
                        container.remove();
                    }); 
                    $worklogIDs.find(log => log.id == weekId).used = false;

                    console.log('successfully deleted worklog:', response);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }

        // #endregion
    }
}


var client = new HttpClient();
