import Axios from 'axios'

export const fetch = (url) => {
    return Axios.get(url, { headers : {
        'X-Requested-With' : 'XMLHttpRequest'
    }})
}