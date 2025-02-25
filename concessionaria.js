const readline = require("readline");
const vendasIniciais = [
    {
        id: 1,
        cliente: {
            nome: "João Silva",
            email: "joao@email.com",
            cpf: "123.456.789-00",
            telefone: "(11) 99999-9999",
        },
        veiculos: [
            { codigo: 2391, tipo: "Carro", marca: "Honda", modelo: "Civic G10", cor: "Preto", preco: 295900 },
            { codigo: 1783, tipo: "Moto", marca: "Triumph", modelo: "Tyger 900", cor: "Preta", preco: 54000 },
        ],
        statusVenda: "Pendente",
    },
    {
        id: 2,
        cliente: {
            nome: "Maria Oliveira",
            email: "maria@email.com",
            cpf: "987.654.321-00",
            telefone: "(21) 98888-8888",
        },
        veiculos: [
            { codigo: 1206, tipo: "Carro", marca: "Nissan", modelo: "Skyline GT-R R34", cor: "Azul", preco: 1579000 },
            { codigo: 8011, tipo: "Moto", marca: "Kawasaki", modelo: "Ninja H2R", cor: "Preta", preco: 57500 },
        ],
        statusVenda: "Concluída",
    },
    {
        id: 3,
        cliente: {
            nome: "Carlos Pereira",
            email: "carlos@email.com",
            cpf: "147.258.369-00",
            telefone: "(31) 91234-5678",
        },
        veiculos: [
            { codigo: 2806, tipo: "Carro", marca: "Chevrolet", modelo: "Corvette Z06", cor: "Laranja", preco: 1698000 },
            { codigo: 1038, tipo: "Carro", marca: "Lamborghini", modelo: "Aventador SVJ", cor: "Vermelha", preco: 8000000 },
            { codigo: 1510, tipo: "Moto", marca: "Yamaha", modelo: "YZF-R7", cor: "Preta", preco: 60000 },
        ],
        statusVenda: "Em andamento",
    },
    {
        id: 4,
        cliente: {
            nome: "Fernanda Costa",
            email: "fernanda@email.com",
            cpf: "321.654.987-00",
            telefone: "(41) 99888-7777",
        },
        veiculos: [
            { codigo: 2262, tipo: "Carro", marca: "Dodge", modelo: "Charger 1970", cor: "Preto", preco: 1000000 },
        ],
        statusVenda: "Pendente",
    },
    {
        id: 5,
        cliente: {
            nome: "Lucas Lima",
            email: "lucas@email.com",
            cpf: "654.987.123-00",
            telefone: "(51) 99999-8888",
        },
        veiculos: [
            { codigo: 3160, tipo: "Moto", marca: "Suzuki", modelo: "GSX-R750", cor: "Azul", preco: 48900 },
        ],
        statusVenda: "Concluída",
    },
];

let idVenda = vendasIniciais.length;

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
        const automovel = this.veiculos.findIndex((veiculo) => veiculo.codigo === Number(codigo));

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

const vendas = vendasIniciais.map(venda => {
    const novaVenda = new Venda(venda.id, new Cliente(
        venda.cliente.nome,
        venda.cliente.email,
        venda.cliente.cpf,
        venda.cliente.telefone
    ));

    venda.veiculos.forEach(veiculo => {
        novaVenda.adicionarVeiculo(new Veiculo(
            veiculo.codigo,
            veiculo.tipo,
            veiculo.marca,
            veiculo.modelo,
            veiculo.cor,
            veiculo.preco
        ));
    });

    novaVenda.alterarStatus(venda.statusVenda);
    return novaVenda;
});

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
        texto += "\n\n" + "_".repeat(90) + "\n";

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
    console.log("_".repeat(90));
    console.log("\n" + "VENDA ATUALIZADA".padStart(50))
    console.log("_".repeat(90) + "\n");
    exibirVendas(vendaLocalizada)
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
        console.log("_".repeat(90));
        console.log("\n" + "VENDA ATUALIZADA".padStart(50))
        console.log("_".repeat(90) + "\n");
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

    let texto = "\n" + "TOTAL DAS VENDAS".padStart(50) + "\n";
    texto += "_".repeat(90) + "\n\n";
    totaisDeVenda.forEach((total) => {
        texto += `ID da venda: ${total.idVenda}\n`;
        texto += `Quantidade de veículos: ${total.quantidadeVeiculos}\n`;
        texto += `Valor total: R$${total.totalVendas.toFixed(2)}\n\n`;
    });

    console.log(texto);
}

function gerarRelatorioVendas() {
    let relatorio = "\n";
    relatorio += "RELATÓRIO DE VENDAS".padStart(50) + "\n";
    relatorio += "_".repeat(90) + "\n\n";

    vendas.forEach((venda) => {
        const idVenda = venda.id;
        const nomeCliente = venda.cliente.nome;
        const emailCliente = venda.cliente.email;
        const cpfCliente = venda.cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        const telefoneCliente = venda.cliente.telefone;
        const totalVendas = venda.veiculos.reduce((total, veiculo) => total + veiculo.preco, 0);

        const totalArredondado = Math.ceil(totalVendas);

        relatorio += `ID da venda: ${idVenda}\n\n`;
        relatorio += `Cliente: ${nomeCliente}\n`;
        relatorio += `Email: ${emailCliente}\n`;
        relatorio += `CPF: ${cpfCliente}\n`;
        relatorio += `Telefone: ${telefoneCliente}\n\n`;

        venda.veiculos.forEach((veiculo, index) => {
            relatorio += `Veículo ${index + 1}: ${veiculo.marca} ${veiculo.modelo} ${veiculo.cor} | Preço: R$${veiculo.preco.toFixed(2)}\n`;
        });

        relatorio += `\nTOTAL DA VENDA = R$${totalArredondado.toFixed(2)}\n`;
        relatorio += "_".repeat(90) + "\n\n";
    });


    console.log(relatorio);
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
        console.log("[6] - Relatório de vendas")
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
            case "6":
                await gerarRelatorioVendas();
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