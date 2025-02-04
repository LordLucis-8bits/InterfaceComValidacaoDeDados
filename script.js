function validarForm() {
  var nome = document.getElementById('nome').value.trim();
  var email = document.getElementById('email').value.trim();
  var dataNascimento = document.getElementById('dataNascimento').value.trim();
  var sexo = document.querySelector('input[name="sexo"]:checked');
  var estadoCivil = document.getElementById('estadoCivil').value;
  var interesses = document.querySelectorAll('input[name="interesse"]:checked');

  // Validando o campo nome
  if (nome.length < 15) {
    alert('O nome completo deve ter no mínimo 15 caracteres.');
    document.getElementById('nome').focus();
    return false;
  }

  // Validando o campo email
  if (email.length < 10 || !email.includes('@') || !email.includes('.')) {
    alert('Por favor, insira um e-mail válido.');
    document.getElementById('email').focus();
    return false;
  }

  // Validando o campo data de nascimento
  var dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!dataRegex.test(dataNascimento)) {
    alert('Formato de data inválido. Use DD/MM/AAAA.');
    document.getElementById('dataNascimento').focus();
    return false;
  }

  var partesData = dataNascimento.split('/');
  var dia = parseInt(partesData[0], 10);
  var mes = parseInt(partesData[1], 10) - 1; // Mês é zero-indexed no JavaScript
  var ano = parseInt(partesData[2], 10);
  var dataValida = new Date(ano, mes, dia);
  var hoje = new Date();
  var idade = hoje.getFullYear() - dataValida.getFullYear();
  var mesAtual = hoje.getMonth();
  if (mesAtual < mes || (mesAtual === mes && hoje.getDate() < dia)) {
    idade--;
  }

  // Verificando se a idade é menor que 15 anos, se o estado civil for Solteiro(a)
  if (estadoCivil === 'Solteiro(a)' && idade < 15) {
    alert('Para estado civil "Solteiro(a)", é necessário ter pelo menos 15 anos de idade.');
    document.getElementById('dataNascimento').focus();
    return false;
  }

  // Validando se pelo menos uma área de interesse foi selecionada
  if (interesses.length === 0) {
    alert('Selecione pelo menos uma área de interesse.');
    document.getElementById('interesseAnalise').focus();
    return false;
  }

  // Se passou por todas as validações, exibe mensagem de sucesso
  alert('Dados enviados com sucesso!');
  return true;
}