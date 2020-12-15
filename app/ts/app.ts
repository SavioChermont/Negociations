import { NegociacaoController } from "./controllers/NegociacaoController";
const negociacaoController = new NegociacaoController();
$(".form").on(
  "submit",
  negociacaoController.adiciona.bind(negociacaoController)
);
