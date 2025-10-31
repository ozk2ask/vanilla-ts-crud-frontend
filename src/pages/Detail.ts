
// Routerの呼び出しに合わせて、HTMLElementを引数として受け取る
export function renderDetailPage(appContainer: HTMLElement, id: number): void {
    appContainer.innerHTML = `<h2>📋 アイテムID: ${id}詳細ページ</h2><p>CRUDのR部分のロジックをここに書きます。</p>`;
}