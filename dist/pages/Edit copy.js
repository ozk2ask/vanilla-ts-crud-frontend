// src/pages/Edit.ts
// Routerの呼び出しに合わせて、HTMLElementを引数として受け取る
export function renderEditPage(appContainer, id) {
    const action = id === undefined ? '新規登録' : `${id} の編集`;
    appContainer.innerHTML = `<h2>✏️ ${action}ページ</h2><p>CRUDのC/U部分のロジックをここに書きます。</p>`;
    // ここでフォームやデータを描画します
}
//# sourceMappingURL=Edit%20copy.js.map