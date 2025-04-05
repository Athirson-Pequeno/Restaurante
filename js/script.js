function salvarNoLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function adicionarItem(id) {
  itens = localStorage.getItem("lista");
  existe = false;
  if (itens) {
    itens = JSON.parse(itens);
    itens.forEach((element) => {
      if (element.id == id) {
        existe = true;
      }
    });

    if (!existe) {
      itens.push({ id: id, qtd: 1 });
      salvarNoLocalStorage("lista", itens);
    }
  } else {
    itens = [];
    itens.push({ id: id, qtd: 1 });
    salvarNoLocalStorage("lista", itens);
  }
  atualizarCarrinho();
}

function mudarQuantidade(id, quantidade) {
  if (quantidade != 0) {
    itens = localStorage.getItem("lista");
    existe = false;
    if (itens) {
      itens = JSON.parse(itens);
      itens.forEach((element, index) => {
        if (element.id == id) {
          existe = true;
          itens[index].qtd = quantidade;
          salvarNoLocalStorage("lista", itens);
        }
      });
      if (!existe) {
        adicionarItem(id);
      }
    } else {
      adicionarItem(id);
    }
  } else {
    removerDoCarrinho(id);
  }

  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  itens = localStorage.getItem("lista");
  if (itens) {
    itens = JSON.parse(itens);
    itens.forEach((element, index) => {
      if (element.id == id) {
        itens.splice(index, 1);
        salvarNoLocalStorage("lista", itens);
      }
    });
  }
  atualizarCarrinho();
}

function lerDoLocalStorage(chave) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : null;
}

function lerPratoDaLista(id) {
  const produtos = [
    {
      id: 1,
      nome: "Fava completa",
      preco: 59.9,
    },
    {
      id: 2,
      nome: "Carne de sol completa",
      preco: 189.9,
    },
    {
      id: 3,
      nome: "Feijoada",
      preco: 39.9,
    },
    {
      id: 4,
      nome: "Mini Acarajés",
      preco: 29.9,
    },
    {
      id: 5,
      nome: "Arroz Carreteiro",
      preco: 159.9,
    },
    {
      id: 6,
      nome: "Baião de dois",
      preco: 79.9,
    },
    {
      id: 7,
      nome: "Galinhada",
      preco: 22.9,
    },
    {
      id: 8,
      nome: "Picado",
      preco: 29.9,
    },
    {
      id: 9,
      nome: "Carne de sol na nata",
      preco: 59.9,
    },
    {
      id: 10,
      nome: "Refrigerante",
      preco: 4.99,
    },
    {
      id: 11,
      nome: "Cerveja",
      preco: 9.99,
    },
    {
      id: 12,
      nome: "Água",
      preco: 3.5,
    },
  ];

  const produto = produtos.find((element) => element.id === id);

  return produto;
}

function retornaListaDeProdutos() {
  listaId = JSON.parse(localStorage.getItem("lista"));

  if (!Array.isArray(listaId)) return [];

  carrinho = listaId
    .map((element) => {
      produtoAchado = lerPratoDaLista(element.id);

      if (!produtoAchado) return null;

      return {
        id: produtoAchado.id,
        nome: produtoAchado.nome,
        preco: produtoAchado.preco,
        quantidade: element.qtd,
        precoFinal: element.qtd * produtoAchado.preco,
      };
    })
    .filter(Boolean);

  return carrinho;
}
