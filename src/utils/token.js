export const setToken =(token)=>{
    localStorage.setItem('TOKEN',token)
}

export const getToken =(token)=>{
    localStorage.getItem('TOKEN')
}

export const romoveToken =(token)=>{
    localStorage.removeItem('TOKEN')
}
