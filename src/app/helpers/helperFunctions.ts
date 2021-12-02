import { HttpHeaders } from "@angular/common/http";

export function makeid(length: number) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

export function printServiceInfo(address: string, payload: any, httpHdr: HttpHeaders) {
      console.log('urlAddress: ', address);
      console.log('HEADERS:', httpHdr);
      console.log('payload: ', payload);
}

export function isMobile(width: any){
    let result: boolean = false
    if(width < 601) {
        console.log(true);
        result = true;
    }
    else {
        console.log(false);
        result = false

    }
    return result;
}