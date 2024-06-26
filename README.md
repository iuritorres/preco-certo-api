# API - Preço Certo

Esse projeto se resume em uma API que fornece uma rota de cotação automática para lojas onlines.

## Instalação

Abra o terminal e navegue até a pasta onde o projeto será clonado.

Em seguida digite no terminal:

```batch
git clone https://github.com/iuritorres/preco-certo-api.git
cd preco-certo-api
npm install
npm run dev
```

## Requisição

No momento há apenas 1 rota "/search-product", lembrando que nessa api deve ter o prefixo "/api" antes de qualquer outra rota.

### Ambiente

Certifique-se de alterar o nome do arquivo de ambiente de `.env.example` para `.env` e preencher as constantes presentes no arquivo.

### /search-product

Faça uma requisição `POST` para `http://localhost:8080/api/scraping/search-product`, lembrando de mudar o `8080` para sua rota escolhida no arquivo de ambiente.

e passe como corpo da requisição um objeto JSON nesse formato:

```json
{
	"name": "Console PS5 Slim 1TB Digital Edition - Branco"
}
```

ele fará a cotação (no momento apenas tem suporte na Magazine Luíza), e retornará um objeto assim:

```json
{
	"products": [
		{
			"name": "Console PlayStation 5 Slim Disk Edition Branco 1TB + Returnal e Ratchet e Clank + Controle Sem Fio Dualsense Branco",
			"price": 3999,
			"url": "https://www.magazinevoce.com.br/magazineextprecocerto/console-playstation-5-slim-disk-edition-branco-1tb-returnal-e-ratchet-e-clank-controle-sem-fio-dualsense-branco-sony/p/ceafd9593j/ga/otga/",
			"rating": {
				"count": 5,
				"score": 5
			}
		}
	]
}
```

Trazendo o nome, preço, URL de acesso direto na plataforma (link de afiliado do desenvolvedor), e a classificação do produto com a quantidade de avaliações e o score médio de estrelas (de 0 à 5).
