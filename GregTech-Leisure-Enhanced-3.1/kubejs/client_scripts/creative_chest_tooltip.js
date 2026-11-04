// Exibe o aviso de ajuste de equilíbrio do baú criativo.
ItemEvents.tooltip(event => {
    event.add('gtceu:creative_chest', [
        Text.of('⚠ Ajuste de Equilíbrio').red(),
        Text.of('Interação com botão direito desativada').gray()
    ]);
});
