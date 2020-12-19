System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            let unidade = "ms";
            let divisor = 1;
            if (emSegundos) {
                unidade = "s";
                divisor = 1000;
            }
            descriptor.value = function (...args) {
                const retorno = metodoOriginal.apply(this, args);
                const t1 = performance.now();
                const resultado = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                return resultado;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
