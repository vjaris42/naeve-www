import { date } from 'quasar';

export default async ({ Vue, ssrContext, store}) => {
    Vue.filter('dateHuman',dateHuman);
    Vue.filter('dateHumanFull',dateHumanFull);
    Vue.filter('ourMedia',ourMedia);
    Vue.filter('formatName',formatName);
    Vue.filter('timeRelative',timeRelative);
}

function timeRelative(val){
    //converting time to UTC time
    var then = new Date(convertLocalTime(val)) ;
    var now = new Date(Date.now()); 

    var diffMins = date.getDateDiff( now, then, 'minutes');
    var diffHours = date.getDateDiff( now, then,'hours');
    var diffDays = date.getDateDiff( now, then,'days');

    if(diffMins < 5 ) return ' a few minutes ago';
    else if(diffHours <= 1 ) return 'an hour ago';
    else if(diffHours < 8 ) return diffHours +' hours ago';
    
    else if(diffDays < 1 ) return 'Today';
    else if(diffDays < 7 ) return diffDays + " days ago";
    else return 'on ' + date.formatDate(val, 'Do MMMM YYYY');

}

function dateHuman(val){
    var then = new Date(convertLocalTime(val)) ;
    var now = new Date(Date.now()); 
    var diffYrs = date.getDateDiff( now, then,'years');
    var yrFrmt = (diffYrs > 0) ? ', YYYY' : '';
    return date.formatDate(val, 'Do MMMM' + yrFrmt);
}

function dateHumanFull(val){
    return date.formatDate(val, 'Do MMMM,  YYYY');
}

function formatName(val){

    return val.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}
function ourMedia(value){
    if(value == null) return 'statics/site/user.png';
    else if(typeof value === 'object') return value;
    else if (value){
        if(value.includes(':')) return value;
        else return process.env.media_server_url+value;
    }
}


function convertLocalTime(val){
    return date.addToDate(new Date(val), { hours: 5, minutes: 30 })
}