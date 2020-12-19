export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    let unidade: string = "ms";
    let divisor: number = 1;
    if (emSegundos) {
      unidade = "s";
      divisor = 1000;
    }
    descriptor.value = function (...args: any[]) {
      const retorno = metodoOriginal.apply(this, args);
      const t1 = performance.now();
      const resultado = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      return resultado;
    };

    return descriptor;
  };
}
