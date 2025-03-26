import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export function show_alert(mensaje, type, foco=''){
    onfoco(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icon: type,
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
    })
}

function onfoco(foco){
    if(foco !== ''){
        document.getElementById(foco).foco();
    }
}