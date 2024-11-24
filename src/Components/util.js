import {toast} from 'react-toastify';

export const handleSucesss = (mes) =>{
    toast.success(mes, {
     position: 'top-right'
    })
    
}


export const handleerror = (mes) =>{
    toast.error(mes, {
     position: 'top-right'
    })
    
}

