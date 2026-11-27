let alunos = [];

const formulario = document.querySelector("#formulario");

const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const turma = document.querySelector("#turma");
const nota1 = document.querySelector("#nota1");
const nota2 = document.querySelector("#nota2");

const mensagem = document.querySelector("#mensagem");
const resumo = document.querySelector("#resumo");
const listaAlunos = document.querySelector("#listaAlunos");

const botaoLimpar = document.querySelector("#limpar");


// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// Função para calcular a média
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}


// Evento de cadastro
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Pegando os valores dos campos
    let nomeAluno = nome.value.trim();
    let idadeAluno = Number(idade.value);
    let turmaAluno = turma.value.trim();
    let primeiraNota = Number(nota1.value);
    let segundaNota = Number(nota2.value);


    // VALIDANDO OS CAMPOS
    if (nomeAluno === "") {
        mostrarMensagem("Informe o nome do aluno!", "erro");
        nome.focus();
        return;
    }

    if (idade.value === "" || idadeAluno <= 0) {
        mostrarMensagem("Informe uma idade válida!", "erro");
        idade.focus();
        return;
    }

    if (turmaAluno === "") {
        mostrarMensagem("Informe a turma do aluno!", "erro");
        turma.focus();
        return;
    }

    if (nota1.value === "" || primeiraNota < 0 || primeiraNota > 10) {
        mostrarMensagem("A primeira nota deve estar entre 0 e 10!", "erro");
        nota1.focus();
        return;
    }

    if (nota2.value === "" || segundaNota < 0 || segundaNota > 10) {
        mostrarMensagem("A segunda nota deve estar entre 0 e 10!", "erro");
        nota2.focus();
        return;
    }

    // VERIFICANDO ALUNO DUPLICADO
    let nomeFormatado = nomeAluno.toLowerCase();
    let turmaFormatada = turmaAluno.toLowerCase();

    let duplicado = false;

    for (let i = 0; i < alunos.length; i++) {

        let nomeExistente = alunos[i].nome.toLowerCase();
        let turmaExistente = alunos[i].turma.toLowerCase();

        if (
            nomeExistente === nomeFormatado &&
            turmaExistente === turmaFormatada
        ) {
            duplicado = true;
            break;
        }
    }

    if (duplicado) {
        mostrarMensagem(
            "Este aluno já está cadastrado nesta turma!",
            "erro"
        );

        nome.focus();
        return;
    }


    // CALCULANDO A MÉDIA
    let media = calcularMedia(primeiraNota, segundaNota);


    // DEFININDO A SITUAÇÃO
    let situacao;

    if (media >= 7) {
        situacao = "Aprovado";
    } else {
        situacao = "Reprovado";
    }


    // CRIANDO O OBJETO DO ALUNO
    let aluno = {
        nome: nomeAluno,
        idade: idadeAluno,
        turma: turmaAluno,
        nota1: primeiraNota,
        nota2: segundaNota,
        media: media,
        situacao: situacao
    };


    // ADICIONANDO O ALUNO AO ARRAY
    alunos.push(aluno);


    // ATUALIZANDO A TELA
    exibirAlunos();
    atualizarResumo();


    // MENSAGEM DE SUCESSO
    mostrarMensagem("Aluno cadastrado com sucesso!", "sucesso");


    // LIMPANDO O FORMULÁRIO
    formulario.reset();

});

// FUNÇÃO PARA EXIBIR OS ALUNOS NA TABELA
function exibirAlunos() {

    // Limpa o conteúdo anterior da tabela
    let linhasAntigas = listaAlunos.querySelectorAll(".linha-aluno");

for (let i = 0; i < linhasAntigas.length; i++) {
    linhasAntigas[i].remove();
}


    // Verifica se existem alunos cadastrados
    if (alunos.length === 0) {

        let linha = document.createElement("tr");
        linha.classList.add("linha-aluno");
        
        let coluna = document.createElement("td");

        coluna.textContent = "Nenhum aluno cadastrado.";
        coluna.colSpan = 8;

        linha.appendChild(coluna);
        listaAlunos.appendChild(linha);

        return;
    }


    // Percorrendo o array de alunos
    for (let i = 0; i < alunos.length; i++) {

        let aluno = alunos[i];

        // Criando uma linha
        let linha = document.createElement("tr");


        // Criando as colunas
        let colunaNome = document.createElement("td");
        let colunaIdade = document.createElement("td");
        let colunaTurma = document.createElement("td");
        let colunaNota1 = document.createElement("td");
        let colunaNota2 = document.createElement("td");
        let colunaMedia = document.createElement("td");
        let colunaSituacao = document.createElement("td");
        let colunaAcao = document.createElement("td");


        // Inserindo os valores nas colunas
        colunaNome.textContent = aluno.nome;
        colunaIdade.textContent = aluno.idade;
        colunaTurma.textContent = aluno.turma;
        colunaNota1.textContent = aluno.nota1.toFixed(1);
        colunaNota2.textContent = aluno.nota2.toFixed(1);
        colunaMedia.textContent = aluno.media.toFixed(1);
        colunaSituacao.textContent = aluno.situacao;


        // Aplicando classes conforme a situação
        if (aluno.situacao === "Aprovado") {
            linha.classList.add("aprovado");
        } else {
            linha.classList.add("reprovado");
        }


        // Criando botão de remover
        let botaoRemover = document.createElement("button");

        botaoRemover.textContent = "Remover";
        botaoRemover.type = "button";


        // Evento do botão remover
        botaoRemover.addEventListener("click", function() {
            removerAluno(i);
        });


        // Adicionando o botão à coluna
        colunaAcao.appendChild(botaoRemover);


        // Adicionando as colunas à linha
        linha.appendChild(colunaNome);
        linha.appendChild(colunaIdade);
        linha.appendChild(colunaTurma);
        linha.appendChild(colunaNota1);
        linha.appendChild(colunaNota2);
        linha.appendChild(colunaMedia);
        linha.appendChild(colunaSituacao);
        linha.appendChild(colunaAcao);


        // Adicionando a linha à tabela
        listaAlunos.appendChild(linha);

    }

}

// FUNÇÃO PARA REMOVER ALUNO
function removerAluno(indice) {

    alunos.splice(indice, 1);

    exibirAlunos();
    atualizarResumo();

    mostrarMensagem("Aluno removido com sucesso!", "sucesso");

}

// FUNÇÃO PARA ATUALIZAR O RESUMO
function atualizarResumo() {

    let total = alunos.length;
    let aprovados = 0;
    let reprovados = 0;

    // Percorrendo o array
    for (let i = 0; i < alunos.length; i++) {

        if (alunos[i].situacao === "Aprovado") {
            aprovados++;
        } else {
            reprovados++;
        }

    }

    // Exibindo os resultados
    resumo.textContent =
        "Total de alunos: " + total +
        " | Aprovados: " + aprovados +
        " | Reprovados: " + reprovados;

}

// BOTÃO PARA LIMPAR O FORMULÁRIO
botaoLimpar.addEventListener("click", function() {

    formulario.reset();

    mensagem.textContent = "";
    mensagem.className = "";

});

// INICIALIZAÇÃO DA PÁGINA
exibirAlunos();
<<<<<<< HEAD
atualizarResumo();
=======
atualizarResumo();
>>>>>>> a00c7cc (Atualiza arquivos do projeto)
