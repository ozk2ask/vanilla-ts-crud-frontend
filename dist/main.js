import { Router } from './router/Router.js';
console.log("test --------------------------->>>>>>>>>>>>xxxxxx");
// アプリケーション起動時の処理
document.addEventListener('DOMContentLoaded', () => {
    // 画面全体を保持するコンテナ要素が存在することを確認
    // index.html には #app がまだないので、ここで作成または取得を試みる
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    // ルーターを起動
    Router.init();
});
//# sourceMappingURL=main.js.map