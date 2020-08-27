const express = require("express");
const bodyParser = require("body-parser");
const port = 3002

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("index", { nome_produto: "", quantidade: "", preco_unitario: "", preco_total_a_vista: "", preco_total_a_prazo: "", n_parcelas: "", valor_parcela: "", mensagens: [] });
});

app.post("/calcular", function (req, res) {
	let mensagens = [];

	let nome_produto = req.body.nome_produto
	let quantidade = parseInt(req.body.quantidade);
	let preco_unitario = parseFloat(req.body.preco_unitario);
	let n_parcelas = parseInt(req.body.n_parcelas);

	if (!req.body.nome_produto)
		mensagens.push("Nome do Produto não informado.");

	if (!req.body.quantidade)
		mensagens.push("Quantidade não informada.");

	if (!req.body.preco_unitario)
		mensagens.push("Preço Unitário não informado.");

	if (!req.body.n_parcelas)
		mensagens.push("Número de Parcelas não informado.");

	let preco_total_a_vista = quantidade * preco_unitario;
	let preco_total_a_prazo = preco_total_a_vista * 1.03;
	let valor_parcela = preco_total_a_prazo / n_parcelas;

	res.render("index", { nome_produto, quantidade, preco_unitario: preco_unitario.toFixed(2), preco_total_a_vista: preco_total_a_vista.toFixed(2), preco_total_a_prazo: preco_total_a_prazo.toFixed(2), n_parcelas, valor_parcela: valor_parcela.toFixed(2), mensagens });
});

app.listen(port, () => {
	console.log(`O VendaProdutos está rodando em http://localhost:${port}`)
})