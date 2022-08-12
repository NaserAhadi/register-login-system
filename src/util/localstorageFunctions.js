export function setItemsOnLocalStorage(key, value){
    return localStorage.setItem(key, value)
}

export function getItemFromLocalStorage(key){
    return localStorage.getItem(key)
}