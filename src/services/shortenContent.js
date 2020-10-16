export const shortenContent = (data, limit, symbol) => {
    let content = data.split(' ')
    if(content.length < limit) return data

    if(!(/(<.+>|^<.+|.+>$)/.test(content[limit-1]))){  //neu ko phai <sth..> hoac <sth... hoac sth>
        //check xem co thuoc open tag ko
        for(let i = limit-2; i > 0; i--){
            if(/<.+/.test(content[i]) && !/<.*>/.test(content[i])){ // gap open tag => thuoc open tag
                return shortenContent(data, i+1,symbol)
            } else if(/.*>$/.test(content[i])) { // gap close tag
                return content.slice(0, i+1).join(' ') + symbol
            }
        }
        return content.slice(0, limit).join(' ') + symbol

    } else {
        return shortenContent(data, limit - content[limit-1].length, symbol)
    }
} 