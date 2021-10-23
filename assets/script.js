const pessoas = [];
var isDarkMode = false;

function viaCepRequest(event){
    event.preventDefault();
    var cep = document.getElementById("input-cep").value;
    var url = `https://viacep.com.br/ws/${cep}/json`;


    // ele está aguardando uma resposta dessa url; então, se a resposta for diferente de ok, throw new error. através de console.log() ele vai exibir a msg de erro da response

    // após digitar o cep e buscar o endereço, ele vai exibir uma promise no console (caso haja um console.log()) - "eu faço uma promessa de ir buscar a informação que você está me pedindo"

    fetch(url)
    .then((response) => {
        if(!response.ok) throw new Error(`Error. ${response.status}`);
        return response.json();
    })
    .then((data) => {
        if(!("erro" in data)){
            document.getElementById("input-rua").value = data.logradouro;
    document.getElementById("input-numero").value = data.numero;
    document.getElementById("input-bairro").value = data.bairro;
    document.getElementById("input-cidade").value = data.cidade;
    document.getElementById("input-estado").value = data.estado;
        }
        else{
            alert("CEP não encontrado!");
        }

    })
    .catch((err) => console.log(err.message));
}

function cadastrarPessoa() {
    const pessoa = {
        // cria um id randômico - Math random   
        // mostra apenas a parte inteira - Math floor
        id: Math.floor(Math.random() * (100 - 1) - 1),
        nome: document.getElementById("input-nome").value,
        sobrenome: document.getElementById("input-sobrenome").value,
        email: document.getElementById("input-email").value,
        endereco: {
            cep: document.getElementById("input-cep").value,
            logradouro: document.getElementById("input-rua").value,
            numero: document.getElementById("input-numero").value,
            pontoReferencia: document.getElementById("input-referencia").value,
            bairro: document.getElementById("input-bairro").value,
            cidade: document.getElementById("input-cidade").value,
            estado: document.getElementById("input-estado").value
        }
    }

    // push é uma função para adicionar um objeto ao final da array - objeto "pessoa" na array "pessoas"
    pessoas.push(pessoa);
    alert(`${pessoa.nome} cadastrado com sucesso!`);
    limparCampos();
    atualizarTabela();
}

function limparCampos() {
    document.getElementById("input-nome").value = "";
    document.getElementById("input-sobrenome").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-cep").value = "";
    document.getElementById("input-rua").value = "";
    document.getElementById("input-numero").value = "";
    document.getElementById("input-referencia").value = "";
    document.getElementById("input-bairro").value = "";
    document.getElementById("input-cidade").value = "";
    document.getElementById("input-estado").value = "";
    return;
}

function atualizarTabela() {
    var tableBody = document.getElementById("table-body");
    if (pessoas.length === 0) {
        tableBody.innerHTML = '<h3>Sem registros.</h3>';
        return;
    }

    var novoTableBody = "";
    pessoas.map((p, i) => {
        novoTableBody += `<tr>
                            <th scope="row">${p.id}</th>
                            <td>${p.nome}</td>
                            <td>${p.sobrenome}</td>
                            <td>${p.email}</td>
                            <td style="text-align: center;">
                                <button class="btn btn-warning m-0 " onclick="editarRegistro('${i}')">Editar</button>
                                <button class="btn btn-danger m-0" onclick="excluirRegistro('${i}')">Excluir</button>
                            </td>                            
                        </tr>`;
    });

    tableBody.innerHTML = novoTableBody;
}

function excluirRegistro(index) {
    var pessoa = pessoas[index];
    pessoas.splice(index, 1);
    alert(`Registro ${pessoa.id} | ${pessoa.nome} removido com sucesso!`);
    atualizarTabela();
}
// essa função precisa trazer dados já cadastrados para permitir a edição
function editarRegistro(index) {
    var pessoa = pessoas[index];

    document.getElementById("input-nome").value = pessoa.nome;
    document.getElementById("input-sobrenome").value = pessoa.sobrenome;
    document.getElementById("input-email").value = pessoa.email;
    document.getElementById("input-cep").value = pessoa.endereco.cep;
    document.getElementById("input-rua").value = pessoa.endereco.rua;
    document.getElementById("input-numero").value = pessoa.endereco.numero;
    document.getElementById("input-referencia").value = pessoa.endereco.pontoReferencia;
    document.getElementById("input-bairro").value = pessoa.endereco.bairro;
    document.getElementById("input-cidade").value = pessoa.endereco.cidade;
    document.getElementById("input-estado").value = pessoa.endereco.estado;

    var botao = document.getElementById("btn-confirmar");

    //remove o tipo original dele ("Cadastrar" em azul, e type "submit"), e coloca uma nova cor (Verde por causa do "btn success")
    // o innet.HTML muda o nome que aparece no elemento. no caso, o botão "Cadastrar" vai virar "Salvar"

    botao.removeAttribute("type");
    botao.setAttribute("class", "btn btn-success")
    botao.innerHTML = "Salvar";
    botao.onclick = function (event) {
        event.preventDefault();
        atualizarRegistro(pessoa);
    }
}

function atualizarRegistro(pessoa) {
    // pra cada pessoa registrada no meu array, p vai receber uma pessoa
    // p = posição; se a posição do p.id for igual ao id de pessoa.id, o valor index vai receber o id
    var index = pessoas.findIndex(p => p.id === pessoa.id);


    // o "...pessoa" é rash/spread. ele vai alterar somente os dados que a pessoa irá informar e vai repetir os dados que não forem alterados, e precisa copiar todos os dados que não estão sendo informados (ex: id)

    pessoas[index] = {
        ...pessoa,
        nome: document.getElementById("input-nome").value,
        sobrenome: document.getElementById("input-sobrenome").value,
        email: document.getElementById("input-email").value,
        endereco: {
            cep: document.getElementById("input-cep").value,
            logradouro: document.getElementById("input-rua").value,
            numero: document.getElementById("input-numero").value,
            pontoReferencia: document.getElementById("input-referencia").value,
            bairro: document.getElementById("input-bairro").value,
            cidade: document.getElementById("input-cidade").value,
            estado: document.getElementById("input-estado").value
        }

    }

    alert(`Registro ${pessoa.id} atualizado com sucesso!`);
    limparCampos();
    atualizarTabela();
    estadoInicialBotao();


}

function estadoInicialBotao() {
    var botao = document.getElementById("btn-confirmar");
    botao.setAttribute("type", "submit");
    botao.setAttribute("class", "btn btn-primary");
    botao.innerHTML = "Cadastrar";
    botao.onclick = function () {
        return;
    }
}

function cancelarRegistro(event) {
    event.preventDefault(); // remove o comportamento padrão do evento - no caso, "onsubmit" do formulário
    limparCampos();
    estadoInicialBotao();

}

// está sendo linkado no menu dropdown-darkmode-active lá no html, no <nav> (collapse-navbar-collapse)
// a tag body é a primeira e única da array, por isso o [0], mesma coisa com o nav e a table


function setDarkMode() {
    if (!isDarkMode) {
        var nav = document.getElementsByTagName("nav")[0];
        nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-black");
        var body = document.getElementsByTagName("body")[0];
        body.setAttribute("class", "bg-dark text-light");
        var table = document.getElementsByTagName("table")[0];
        table.setAttribute("class", "table text-light");
        document.getElementById("controle-dark-mode").innerText = "Disable";
        isDarkMode = true;
        return;
    }
    var nav = document.getElementsByTagName("nav")[0];
        nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-primary");
        var body = document.getElementsByTagName("body")[0];
        body.removeAttribute("class");
        var table = document.getElementsByTagName("table")[0];
        table.setAttribute("class", "table");
        document.getElementById("controle-dark-mode").innerText = "Active";
        isDarkMode = false;


}