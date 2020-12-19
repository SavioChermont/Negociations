System.register(["../models/index", "../views/index", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, NegociacaoController, DiaDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView(".negociacoesView", true);
                    this._mensagemView = new index_2.MensagemView(".mensagemView", true);
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().toString().replace("/-/g", ","));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update("Negociação só pode ser feita em dia útil!");
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                }
                _ehDiaUtil(data) {
                    return (data.getDay() != DiaDaSemana.Sabado &&
                        data.getDay() != DiaDaSemana.Domingo);
                }
                importaDados() {
                    function isOk(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    fetch("http://localhost:8080/dados")
                        .then((res) => isOk(res))
                        .then((res) => res.json())
                        .then((dados) => {
                        dados
                            .map((dado) => new index_1.Negociacao(new Date(), dado.vezes, dado.montante))
                            .forEach((negociacao) => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                    })
                        .catch((err) => console.log(err));
                }
            };
            __decorate([
                index_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle(500)
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle(500)
            ], NegociacaoController.prototype, "importaDados", null);
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
