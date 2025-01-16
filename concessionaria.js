const readline = require("readline");
const vendas = [];
let idVenda = 0;

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
}

function exibirVendas() {
    if (vendas.length === 0) {
        console.log(">> NENHUMA VENDA REGISTRADA.");
        return;
    }

    let texto = "";

    vendas.forEach((venda) => {
        texto += "=".repeat(90) + "\n"
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

        texto += "\n" + "=".repeat(90) + "\n\n\n"

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
    const id = ++idVenda;
    console.log(`\nID da venda: ${id}`)
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
    } while ((await perguntar("\n>> Deseja adicionar mais um veículo? (sim/não): ")).toLowerCase() === "sim");
    venda.adicionar();

    if ((await perguntar(">> Deseja adicionar mais uma venda? (sim/não): ")).toLowerCase() === "sim") {
        await coletarDadosVenda();
    } else {
        console.log("\n>> VENDA REGISTRADA COM SUCESSO!!\n\n");
        exibirVendas();
        rl.close();
    }
}

(async () => {
    console.log("REGISTRO DE VENDAS".padStart(30));
    console.log("=".repeat(50))
    await coletarDadosVenda();
})();