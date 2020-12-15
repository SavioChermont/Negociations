class MensagemView extends View {
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
    template(model) {
        return `<p class="alert-info">${model}</p>`;
    }
}
