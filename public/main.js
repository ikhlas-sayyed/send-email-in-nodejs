const urlParams = new URLSearchParams(window.location.search);
const err = urlParams.get('err');
const send = urlParams.get('send');
if(err){
switch (err) {
    case 'undefined':
        alert('undefined values')
        break;
    case 'invalid':
        alert('invaild email')
        break;
    case 'send-err':
        alert('email send err')
        break;
     
    default:
        break;
}
}if (send=='ok') {
    alert('email send')
}