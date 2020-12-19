System.register(["../models/index", "../views/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, NegociacaoController, DiaDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView(".negociacoesView", true);
                    this._mensagemView = new index_2.MensagemView(".mensagemView", true);
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().toString().replace("/-/g", ","));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update("Negociação só pode ser feita em dia útil!");
                        return;
                    }
                    console.log(data.getDay());
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                }
                _ehDiaUtil(data) {
                    return (data.getDay() != DiaDaSemana.Sabado &&
                        data.getDay() != DiaDaSemana.Domingo);
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Segunda"] = 0] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 1] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 2] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 3] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 4] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 5] = "Sabado";
                DiaDaSemana[DiaDaSemana["Domingo"] = 6] = "Domingo";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
