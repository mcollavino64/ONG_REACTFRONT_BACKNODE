import Swal from 'sweetalert2';

// Common configs
const alerts = Swal.mixin({
    confirmButtonColor: '#18A0FB',
    cancelButtonColor: '#db5752'
});

const notifications = Swal.mixin({
    toast: true,
    padding: '0.5rem',
    position: 'top-start',
    showConfirmButton: false,
    width: '100%'
});

// Success alert
// Alert.success(titulo, texto, OPCIONAL texto_boton_confirmacion (DEFAULT: OK))
const success = (title, text, confirmButtonText = 'OK') => {
    alerts.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText
    });
}
// Error alert
// Alert.error(titulo, texto, OPCIONAL texto_boton_confirmacion (DEFAULT: Volver))
const error = (title, text, confirmButtonText = 'Volver') => {
    alerts.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText
    });
}
// Confirm alert
// Alert.confirm(titulo, texto, OPCI0NAL texto_boton_confirmacion? (DEFAULT: Seguro), OPCIONAL texto_al_confirmar? (DEFAULT: Hecho))
const confirm = async (title, text, confirmButtonText = 'Seguro', doneText = 'Hecho') => {
    return alerts.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else
            return false;
    })
}
// confirm example
/* Alert.confirm('Esta seguro de eliminar esto?', 'Esta accion no puede deshacerse', 'Estoy seguro')
        .then((result) => {
          if(result){
            console.log('Fue eliminado');
            ...acciones al confirmar
          }else{
            console.log('No se elimino');
            ...accciones al cancelar
          }
        });
*/

// Notificación permanente
// Alert.notify(titulo, OPCIONAL icono_error? (DEFAULT: false))
const notify = (title, error = false) => {
    notifications.fire({
        title,
        showCloseButton: true,
        icon: error ? 'error' : 'success'
    });
}

// Notificacion temporal
// Alert.tempNotify(titulo, OPCIONAL icono_error? (DEFAULT: false))
const tempNotify = (title, error = false) => {
    notifications.fire({
        title,
        icon: error ? 'error' : 'success',
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}

// Input type Text
// Alert.inputText(titulo, OPCIONAL msg (DEFAULT: 'El campo no puede quedar vacío'))
const inputText = async (title, msg = 'El campo no puede quedar vacío') => {
    const { value: text } = await alerts.fire({
        title,
        input: 'text',
        inputPlaceholder: title,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return msg
            }
        }
    })

    if (text) {
        alerts.fire(`El valor ingresado es: ${text}`)
    }
    return text
}

// Input type Email
// Alert.inputEmail(titulo)
const inputEmail = async (title = 'Ingresa tu Email') => {
    const { value: email } = await alerts.fire({
        title,
        input: 'email',
        inputPlaceholder: title,
        inputValidator: (value) => {
            if (!(/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/).test(value)) {
                return ('El email no es válido!');
            }
        }
    })

    if (email) {
        alerts.fire(`Email ingresado: ${email}`)
    }
    return email
}

// Input type Password
// Alert.inputPassword(titulo)
const inputPassword = async (title = 'Ingrese su contraseña') => {
    const { value: password } = await alerts.fire({
        title,
        input: 'password',
        inputPlaceholder: title,
        inputAttributes: {
            minlength: 5,
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        inputValidator: (value) => {
            if (value.trim().length < 5) {
                return (`La contraseña debe tener al menos 5 caracteres! <br />
                No se permiten espacios vacíos`);
            }
        }
    })

    if (password) {
        alerts.fire(`Contraseña ingresada: ${password}`)
    }
    return password
}



const Alert = {
    success,
    error,
    confirm,
    notify,
    tempNotify,
    inputText,
    inputEmail,
    inputPassword
}


export default Alert;