import View from "./View";
export class MensagemView extends View {
    template(model) {
        return `<p class="alert-info">${model}</p>`;
    }
}
