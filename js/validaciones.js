
export function valida(input) {
    const tipoDeInput = input.dataset.type;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipodeDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]
/* Aqui puedo traer y cambiar el idioma con algun API */
const mensajesDeError = {
    nombre : {
        valueMissing: "This field is required and cannot be empty"
    },
    email : {
        valueMissing: "This field is required and cannot be empty",
        typeMismatch: "Email not valid"
    },
    password: {
        valueMissing: "This field is required and cannot be empty",
        patternMismatch: "At least 8 characters - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters"
    },
    nacimiento: {
        valueMissing: "This field is required and cannot be empty",
        customError: "You must be 18 years old"
    },
    numero: {
        valueMissing: "This field is required and cannot be empty",
        patternMismatch: "Format required is XXXX-XXXX Number"
    },
    direccion: {
        valueMissing: "This field is required and cannot be empty",
        patternMismatch: "Direccion must containt 10 to 40 letters"
    },
    ciudad: {
        valueMissing: "This field is required and cannot be empty",
        patternMismatch: "City must containt 4 to 30 letters"
    },
    provincia: {
        valueMissing: "This field is required and cannot be empty",
        patternMismatch: "Province must containt 4 to 30 letters"
    },

}


const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipodeDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "You must be 18 years old"
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + +18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}