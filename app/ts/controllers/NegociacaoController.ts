import { Negociacao, Negociacoes } from "../models/index";
import { MensagemView, NegociacoesView } from "../views/index";

export class NegociacaoController {
  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  private _negociacoes: Negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView(".negociacoesView", true);
  private _mensagemView = new MensagemView(".mensagemView", true);

  constructor() {
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    let data = new Date(this._inputData.val().toString().replace("/-/g", ","));

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update("Negociação só pode ser feita em dia útil!");
      return;
    }

    console.log(data.getDay());
    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val().toString()),
      parseFloat(this._inputValor.val().toString())
    );

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update("Negociação adicionada com sucesso!");
  }

  private _ehDiaUtil(data: Date) {
    return (
      data.getDay() != DiaDaSemana.Sabado &&
      data.getDay() != DiaDaSemana.Domingo
    );
  }
}

enum DiaDaSemana {
  Segunda = 0,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
  Domingo,
}
