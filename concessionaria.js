const readline = require("readline");
const vendas = [];
let idVenda = 0;

const opcoesStatus = ["Pendente", "Em andamento", "Concluída", "Cancelada"];

class Veiculo {
    constructor(codigo, tipo, marca, modelo, cor, preco) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.preco = preco;
    }
}

class Cliente {
    constructor(nome, email, cpf, telefone) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
    }
}

class Venda {
    constructor(id, cliente) {
        this.id = id;
        this.cliente = cliente;
        this.veiculos = [];
        this.statusVenda = "Pendente";
    }

    adicionar() {
        vendas.push(this);
    }

    adicionarVeiculo(veiculo) {
        this.veiculos.push(veiculo);
    }

    removerVeiculo(codigo) {
        const automovel = this.veiculos.findIndex((veiculo) => veiculo.codigo === codigo);

        if (automovel !== -1) {
            const veiculoRemovido = this.veiculos[automovel];
            this.veiculos.splice(automovel, 1);
            console.log(`\n>> VEÍCULO "${veiculoRemovido.marca.toUpperCase()} ${veiculoRemovido.modelo.toUpperCase()} ${veiculoRemovido.cor.toUpperCase()}" REMOVIDO DA VENDA ${this.id} COM SUCESSO!!\n`);
        } else {
            console.log(`\n>> VEÍCULO ${codigo} NÃO ENCONTRADO.`)
        }
    }

    alterarStatus(novoStatusVenda) {
        this.statusVenda = novoStatusVenda;
    }
}

function exibirVendas(vendaFiltrada = null) {
    const listaVendas = vendaFiltrada ? [vendaFiltrada] : vendas;

    if (listaVendas.length === 0) {
        console.log(">> NENHUMA VENDA REGISTRADA.");
        return;
    }

    let texto = "";

    listaVendas.forEach((venda) => {
        texto += `ID da venda: ${venda.id.toString().padEnd(10)} Status: ${venda.statusVenda.padStart(10)} \n\n`;
        texto += `>>> DADOS DO CLIENTE\n\n`;
        texto += `Nome: ${venda.cliente.nome}\n`;
        texto += `Email: ${venda.cliente.email}\n`;
        texto += `CPF: ${venda.cliente.cpf}\n`;
        texto += `Telefone: ${venda.cliente.telefone}\n\n\n`;

        texto += `>>> INFORMAÇÕES DOS VEÍCULOS\n\n`;
        texto += `Código`.padEnd(13) + `Tipo`.padEnd(13) + `Marca`.padEnd(15) + `Modelo`.padEnd(22) + `Cor`.padEnd(13) + `Preço`.padStart(5) + "\n";
        texto += "-".repeat(90) + "\n";

        venda.veiculos.forEach((veiculo) => {
            texto += veiculo.codigo.toString().padEnd(13) +
                veiculo.tipo.padEnd(13) +
                veiculo.marca.padEnd(15) +
                veiculo.modelo.padEnd(22) +
                veiculo.cor.padEnd(13) +
                `R$${veiculo.preco.toFixed(2)}`.padStart(5) + "\n";
        });

        texto += "-".repeat(90);
        texto += "\n\n"

    });

    console.log(texto)
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise((resposta) => rl.question(pergunta, resposta));
};

async function coletarDadosVenda() {
    console.log("\nNOVA VENDA\n");
    const id = ++idVenda;
    console.log(`ID da venda: ${id}`)
    const nome = await perguntar("Nome do cliente: ");
    const email = await perguntar("E-mail do cliente: ");
    const cpf = await perguntar("CPF do cliente: ");
    const telefone = await perguntar("Telefone do cliente: ");

    const cliente = new Cliente(nome, email, cpf, telefone);
    const venda = new Venda(id, cliente);

    console.log("-".repeat(25));
    await coletarDadosVeiculo(venda);
}

async function coletarDadosVeiculo(venda) {
    do {
        const codigo = await perguntar("\nCódigo do veículo: ");
        const tipo = await perguntar("Tipo do veículo: ");
        const marca = await perguntar("Marca do veículo: ");
        const modelo = await perguntar("Modelo do veículo: ");
        const cor = await perguntar("Cor do veículo: ");
        const preco = await perguntar("Preço do veículo: ");

        const veiculo = new Veiculo(
            codigo,
            tipo,
            marca,
            modelo,
            cor,
            parseFloat(preco)
        );

        venda.adicionarVeiculo(veiculo);
        console.log("-".repeat(25));
    } while ((await perguntar("\n>> Deseja adicionar mais um veículo? (s/n): ")).toLowerCase() === "s");
    venda.adicionar();

    if ((await perguntar(">> Deseja adicionar mais uma venda? (s/n): ")).toLowerCase() === "s") {
        await coletarDadosVenda();
    } else {
        console.log("\n>> VENDAS REGISTRADAS COM SUCESSO!!\n");
    }
}

function procurarVenda(idVenda) {
    return vendas.find((venda) => venda.id === parseInt(idVenda));
}

async function excluirVeiculo() {
    const idVenda = await perguntar(">> Digite o ID da venda que deseja excluir um veículo: ");
    const vendaLocalizada = procurarVenda(idVenda);

    if (!vendaLocalizada) {
        console.log(`\n>> VENDA ${idVenda} NÃO ENCONTRADA.`);
        return;
    }

    const codigoVeiculo = await perguntar(">> Digite o código do veículo que deseja excluir: ");
    vendaLocalizada.removerVeiculo(codigoVeiculo);
}

async function alterarStatusVenda() {
    const idVenda = await perguntar(">> Digite o ID da venda que deseja alterar o status: ");
    const vendaLocalizada = procurarVenda(idVenda);

    if (!vendaLocalizada) {
        console.log(`\n>> VENDA ${idVenda} NÃO ENCONTRADA.`);
        return;
    }

    console.log()
    const indexNovoStatus = await perguntar(" 1 - Pendente\n 2 - Em andamento\n 3 - Concluída\n 4 - Cancelada\n\n>> Digite o número que corresponde ao status de venda desejado: ") - 1;

    if (indexNovoStatus >= 0 && indexNovoStatus < opcoesStatus.length) {
        vendaLocalizada.alterarStatus(opcoesStatus[indexNovoStatus]);
        console.log(`>> STATUS DA VENDA ${idVenda} ALTERADO COM SUCESSO!!\n\n`);
        console.log("====== VENDA COM O STATUS ALTERADO ======\n")
        exibirVendas(vendaLocalizada);
    } else {
        console.log(`>> Opção inválida.`);
    }
}

function calcularTotalVendas() {
    return vendas.map((venda) => {
        const quantidadeVeiculos = venda.veiculos.length;
        const totalVendas = venda.veiculos.reduce(
            (total, veiculo) => total + parseFloat(veiculo.preco), 0);

        return {
            idVenda: venda.id,
            quantidadeVeiculos,
            totalVendas,
        };
    });
}

function exibirTotalVendas() {
    const totaisDeVenda = calcularTotalVendas(vendas);

    let texto = "====== TOTAL DAS VENDAS ======\n\n";
    totaisDeVenda.forEach((total) => {
        texto += `ID da venda: ${total.idVenda}\n`;
        texto += `Quantidade de veículos: ${total.quantidadeVeiculos}\n`;
        texto += `Valor total: R$${total.totalVendas.toFixed(2)}\n\n`;
    });

    console.log(texto);
}

async function menu() {
    while (true) {
        console.log("_".repeat(90) + "\n");
        console.log("=".repeat(20) + " MENU " + "=".repeat(20));
        console.log("[1] - Registrar uma venda");
        console.log("[2] - Exibir vendas");
        console.log("[3] - Excluir um veículo de uma venda")
        console.log("[4] - Alterar o status de uma venda")
        console.log("[5] - Exibir o total das vendas")
        console.log("[0] - Sair do programa\n");

        const opcao = await perguntar("Escolha uma opção: ");
        console.log("_".repeat(90));

        switch (opcao) {
            case "1":
                await coletarDadosVenda();
                break;
            case "2":
                await exibirVendas();
                break;
            case "3":
                await excluirVeiculo();
                break;
            case "4":
                await alterarStatusVenda();
                break
            case "5":
                await exibirTotalVendas();
                break
            case "0":
                console.log(">> Programa encerrado.");
                rl.close();
                return;
            default:
                console.log("\n>> Opção inválida.");
        }
    }
}

menu()