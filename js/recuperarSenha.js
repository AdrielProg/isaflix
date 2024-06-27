document.addEventListener('DOMContentLoaded', function() {
    // ... (your atulizaSelecao and inserirHTML functions)
    const radio = document.querySelectorAll('.selected');
    const button = document.querySelector('.botao-enviar');
    const textInput = document.querySelector('.email-sms-enviar');
    const paragraf = document.querySelector('.paragrafo-dinamico')

    if(radio && button && textInput && paragraf){

        atulizaSelecao(radio, button, textInput, paragraf); // Call the function after DOM is loaded
    }
    else{
        console.error('Parametros invalidos', radio, button, textInput)
    }
});



function atulizaSelecao(radio, button, textInput, paragraf) {
  
    radio.forEach(function(radio) {
      radio.addEventListener('change', function() {

            inserirHTML(radio, button, textInput, paragraf) 
        
      });
    });
  }


function inserirHTML (condicao, button, textInput, paragraf){
    if(condicao.value === 'sms'){
        button.innerHTML = 'Enviar SMS'
        textInput.type = 'tel'
        textInput.placeholder = '(xx)-xxxxx-xxxx'
        paragraf.innerHTML = 'Enviaremos uma mensagem de texto com um código de redefinição da sua senha. Sujeito a tarifas sobre o uso de dados e mensagens.'
        textInput.innerHTML = ''
        //mascara
        cleaveInstance = new Cleave(textInput, {
            phoneRegionCode: 'BR',
            numericOnly: true,
            blocks: [0, 2, 5, 4], // 0 para o prefixo opcional, 2 para o DDD, 5 e 4 para os números
            delimiters: ['(', ') ', '-']
        })
    }
    else if(condicao.value === 'email'){
        button.innerHTML = 'Enviar por email'
        textInput.type = 'text'
        textInput.placeholder = 'nome@exemplo.com.br'
        paragraf.innerHTML = 'Enviaremos um email com instruções de como redefinir sua senha'
        textInput.value = ''; 
        
   
    }

}


// Adiciona event listener para o rádio "Email"
document.querySelector('input[value="email"]').addEventListener('change', function() {
    if (this.checked && cleaveInstance) {
      cleaveInstance.destroy();
      cleaveInstance = null;
    }
  });