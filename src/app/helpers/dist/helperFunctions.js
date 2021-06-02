"use strict";
exports.__esModule = true;
exports.printServiceInfo = exports.makeid = void 0;
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}
exports.makeid = makeid;
function printServiceInfo(address, payload, httpHdr) {
    console.log('urlAddress: ', address);
    console.log('HEADERS:', httpHdr);
    console.log('payload: ', payload);
}
exports.printServiceInfo = printServiceInfo;
