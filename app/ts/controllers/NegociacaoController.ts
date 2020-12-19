import { Negociacao, Negociacoes } from "../models/index";
import { MensagemView, NegociacoesView } from "../views/index";
import { domInject } from "../helpers/decorators/index";
import { NegociacaoParcial } from "../models/index";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;

  @domInject("#quantidade")
  private _inputQuantidade: JQuery;

  @domInject("#valor")
  private _inputValor: JQuery;
  private _negociacoes: Negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView(".negociacoesView", true);
  private _mensagemView = new MensagemView(".mensagemView", true);

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    let data = new Date(this._inputData.val().toString().replace("/-/g", ","));

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update("Negociação só pode ser feita em dia útil!");
      return;
    }
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

  importaDados() {
    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }
    fetch("http://localhost:8080/dados")
      .then((res) => isOk(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[]) => {
        dados
          .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
          .forEach((negociacao) => this._negociacoes.adiciona(negociacao));
        this._negociacoesView.update(this._negociacoes);
      })
      .catch((err: any) => console.log(err));
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
