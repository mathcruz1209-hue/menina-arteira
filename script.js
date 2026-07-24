const supabaseUrl = "https://askclglyigztrvedgvdk.supabase.co";
const supabaseKey = "sb_publishable_hGqS8J001fJu_5vLypxQhw_3Gf-Agjq";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* ===============================
   CARREGAR PRODUTOS DO SUPABASE
   =============================== */
async function carregarProdutos(){

  let { data, error } = await supabaseClient
    .from("produtos")
    .select("*")
  .eq("categoria", CATEGORIA_PAGINA)

  let container = document.getElementById("lista-produtos");

  data.forEach(produto => {

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="img/${produto.imagem}">
      <div class="info">
        <h3>${produto.nome}</h3>
        <p></p>
        <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
        <button onclick="adicionar('${produto.nome}', ${produto.preco})">
          Adicionar ao Carrinho
        </button>
      </div>
    `;

    container.appendChild(div);

  });

}

carregarProdutos();

let carrinho = [];
let total = 0;

/* ===============================
   ADICIONAR PRODUTO
   =============================== */
function adicionar(nome, preco){

  let item = carrinho.find(produto => produto.nome === nome);

  if(item){
    item.quantidade++;
  }else{
    carrinho.push({
      nome: nome,
      preco: preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

/* ===============================
   REMOVER PRODUTO
   =============================== */
function remover(nome){
  carrinho = carrinho.filter(produto => produto.nome !== nome);
  atualizarCarrinho();
}

/* ===============================
   ATUALIZAR CARRINHO
   =============================== */
function atualizarCarrinho(){

  let lista = document.getElementById("lista-carrinho");
  let totalSpan = document.getElementById("total");
  let topo = document.getElementById("carrinho-total");

  lista.innerHTML = "";
  total = 0;

  carrinho.forEach(produto => {

    total += produto.preco * produto.quantidade;

    let li = document.createElement("li");

    li.innerHTML = `
      <div class="item-carrinho">
        <span>${produto.nome}</span>
        <span>R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</span>
        <button onclick="remover('${produto.nome}')">Remover</button>
      </div>
    `;

    lista.appendChild(li);

  });

  totalSpan.innerText = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  if(topo){
    topo.innerText = "Carrinho: " + total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }
}

/* ===============================
   FINALIZAR COMPRA WHATSAPP
   =============================== */
function finalizarCompra(){

  if(carrinho.length === 0){
    alert("Seu carrinho está vazio.");
    return;
  }

  let nome = document.getElementById("nome-cliente").value;

  if(nome.trim() === ""){
    alert("Por favor, preencha seu nome antes de finalizar.");
    return;
  }

  let mensagem = `Olá! Meu nome é ${nome}.%0A%0AQuero comprar:%0A%0A`;

  carrinho.forEach(produto => {
    mensagem += `• ${produto.nome} x${produto.quantidade}%0A`;
  });

  mensagem += `%0A💰 Total: ${total.toLocaleString("pt-BR", {
    style:"currency",
    currency:"BRL"
  })}`;

  let numero = "555199798046";

  let url = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(url, "_blank");
}


