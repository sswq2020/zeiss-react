export function getList(){
    return fetch('/api/v1/machines', {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(obj => {
        return obj.data
    }).catch(err => {
        console.log(err);
    })
}


export function getDetail(id:string){
    return fetch(`/api/v1/machines/${id}`, {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(obj => {
        return obj.data
    }).catch(err => {
        console.log(err);
    })
}