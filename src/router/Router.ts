// src/router/Router.ts (シンプル版)

import { renderListPage } from '../pages/List.js';
import { renderEditPage } from '../pages/Edit.js';
import { renderDetailPage } from '../pages/Detail.js';

export class Router {
    private static appContainer: HTMLElement; 

    public static init(): void {
        const container = document.getElementById('app');
        if (!container) {
            console.error("エラー: ルーターのコンテナ要素 (#app) が見つかりません。");
            return;
        }
        Router.appContainer = container; 

        // 初期ロード時の処理とハッシュ変更イベントを設定
        window.addEventListener('hashchange', Router.handleRouting);
        Router.handleRouting(); // 起動時に一度実行
    }

    /**
     * 現在のURLハッシュに基づいて、描画関数を呼び出します。（Switch文で簡略化）
     */
    private static handleRouting(): void {
        // # から始まるハッシュを取得し、先頭の # と / を取り除く
        const hash = window.location.hash.slice(1).replace(/^\//, ''); 
        
        console.log(`[Simple Router] Current path: ${hash}`); // デバッグ用

        // --- Switch 文によるシンプルなパス判定 ---
        switch (hash) {
            case '': // URLが # なし、または # のみの場合
            case 'list':
                renderListPage(Router.appContainer);
                break;
            
            case 'edit': // 新規登録画面
                renderEditPage(Router.appContainer); // IDなしで呼び出し
                break;
                
            // IDを持つ詳細/編集パスの処理
            // 例: edit/123 や detail/456 の形式に対応
            default:
                // パスを / で分割し、edit/5 のような形式をチェック
                const parts = hash.split('/');
                const pathName = parts[0];
                const idString = parts[1]; // ID候補

                if ((pathName === 'edit' || pathName === 'detail') && idString) {
                    const id = parseInt(idString, 10);
                    
                    if (!isNaN(id)) {
                        if (pathName === 'edit') {
                            renderEditPage(Router.appContainer, id); // 編集画面
                        }
                        if (pathName === 'detail') {
                            renderDetailPage(Router.appContainer, id);
                        }
                         else { // 'detail' の場合
                            // 💡 詳細画面の描画関数が必要 (ここではEditPageを流用またはエラー表示)
                             Router.appContainer.innerHTML = `<h2>🔍 アイテム ${id} の詳細</h2><p>詳細ページが実装されていません。</p>`; 
                        }
                        break;
                    }
                }
                
                // どのルートにもマッチしなかった場合
                Router.appContainer.innerHTML = '<h2>❌ 404 Not Found (シンプルルーター)</h2><p>指定されたページは見つかりません。</p>';
                break;
        }
    }
}