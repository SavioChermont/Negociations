class MensagemView extends View<string> {
  template(model: string): string {
    return `<p class="alert-info">${model}</p>`;
  }
}
