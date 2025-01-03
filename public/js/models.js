
var $worklogIDs = generateIdMap();

var logObject = {
    date: '',
    hours: '',
    activity: [],
    id: ''
}

var worklogObject = {
    Week: '',
    Logs: [],
    Accomplished: [],
    Planned: [],
    Questions: [],
    id: ''
}

const Log = (_date, id, offset = null) => {
    let date = getFormatDate({ date: _date, offset: offset ?? id, day: 'ordinal', month: 'long', list: true });
    return {
        "date": date.string,
        "hours": "00:00 - 00:00",
        "activity": [],
        "id": id 
    }
}

const addNewLogs = (from, to) => {
    let index = 0, count = logLength(from, to), logs = [];
    while (index < count) {
        let log = Log(from, index), weekday = log.date.weekday;
        if (weekday == 'Friday') { index += 2; count += 2; }
        if (weekday == 'Saturday') { index += 2; count += 2; continue; } 
        if (weekday == 'Sunday') { index += 1; count += 1; continue; }       
        logs.push(log)
        index++;
    }
    return logs;
}

const UpdateIds = async () => $.each(await getdb(), (i, _ids) => $worklogIDs.find(e => e.id == _ids.id).used = true);
   
const LogId = () => { let v; (v = $worklogIDs.find(e => e.used == false)).used = true; return v.id; }

const WorkLog = async (from = $addLogDateStart, to = $addLogDateFinish, planned = $addLogTextEditor) => { 
    await UpdateIds(); 
    return {
        "Week": `${$(from).val()} - ${$(to).val()}`,
        "Logs": addNewLogs($(from).datepicker('getDate'), $(to).datepicker('getDate')),
        "Accomplished": [],
        "Planned": [$(planned).html().replaceAll('<p>', '').replaceAll('</p>', '')],
        "Questions": [],
        "id": LogId()
    } 
}
 
const postWorkLog = async () => {
    client.post(await new Promise((resolve, reject) => {
        setTimeout(() => resolve(WorkLog()));
    }));
} 

const postWorkLogWithResult = async () => {
    // let promise = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(WorkLog()));
    // });
    // let result = await promise;
    // let repost = await client.postasync(result);
    let post = await client.post_async(await new Promise((resolve, reject) => {
        setTimeout(() => resolve(WorkLog()));
    }));
    $(`#${plus(post.id)}`).toggle();
    $(`#${minus(post.id)}`).toggle();       
    return post;
}
