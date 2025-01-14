const vendas = [];

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
        console.log("Nenhuma venda registrada.");
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
        texto += `Código`.padEnd(15) + `Tipo`.padEnd(15) + `Marca`.padEnd(15) + `Modelo`.padEnd(15) + `Cor`.padEnd(15) + `Preço`.padStart(5) + "\n";
        texto += "-".repeat(90) + "\n";

        venda.veiculos.forEach((veiculo) => {
            texto += veiculo.codigo.toString().padEnd(15) +
                veiculo.tipo.padEnd(15) +
                veiculo.marca.padEnd(15) +
                veiculo.modelo.padEnd(15) +
                veiculo.cor.padEnd(15) +
                `R$${veiculo.preco.toFixed(2)}`.padStart(5) + "\n";
        });

        texto += "\n" + "=".repeat(90) + "\n\n\n"

    });

    console.log(texto)
};

function coletarDadosVenda() {
    const id = prompt("ID da venda: ");
    const nome = prompt("Nome do cliente: ");
    const email = prompt("E-mail do cliente: ");
    const cpf = prompt("CPF do cliente: ");
    const telefone = prompt("Telefone do cliente: ");
  
    const cliente = new Cliente(nome, email, cpf, telefone);
    const venda = new Venda(id, cliente);
  
    coletarDadosVeiculo(venda);
  }
  
  function coletarDadosVeiculo(venda) {
    do {
      const codigo = prompt("Código do veículo:");
      const tipo = prompt("Tipo do veículo:");
      const marca = prompt("Marca do veículo:");
      const modelo = prompt("Modelo do veículo: ");
      const cor = prompt("Cor do veículo:");
      const preco = prompt("Preço do veículo:");
  
      const veiculo = new Veiculo(
        codigo,
        tipo,
        marca,
        modelo,
        cor,
        parseFloat(preco)
      );
      venda.adicionarVeiculo(veiculo);
    } while (confirm("Deseja adicionar mais um veículo?"));
    venda.adicionar();
  
    if (confirm("Deseja adicionar mais uma venda? ")) {
      coletarDadosVenda();
    } else {
      alert("Venda registrada com sucesso.");
      exibirVendas();
    }
  }