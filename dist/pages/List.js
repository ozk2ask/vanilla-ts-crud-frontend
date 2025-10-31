import { fetchItems } from "../api/itemApi.js";
/**
 * 受け取ったデータから<li>要素を生成するヘルパー関数
 */
function createListItemHtml(item) {
    // 完了状態に応じて 'line-through' クラス（またはstyle）を設定
    const textDecorationStyle = item.isCompleted ? 'line-through' : 'none';
    // バッククォート (`) を使ってHTML構造を定義し、データを ${} で埋め込む
    return `
        <li style="margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
            <span style="text-decoration: ${textDecorationStyle}; margin-right: 20px;">
                ${item.name}
            </span>
            <button onclick="window.location.hash = '#/edit/${item.id}'" style="margin-right: 10px;">
                編集
            </button>
            <button onclick="handleDelete(${item.id})">削除</button>
        </li>
    `;
}
/**
 * アイテム一覧ページ全体を描画する関数
 * @param appContainer 描画の基点となるHTML要素
 */
export function renderListPage(appContainer) {
    appContainer.innerHTML = '<h2>📋 アイテム一覧</h2><p>データを読み込み中...</p>'; // 初期ローディング表示
    fetchItems()
        .then((items) => {
        console.log("取得データ:", items);
        // データ取得成功
        appContainer.innerHTML = ''; // ローディング表示をクリア
        const titleHtml = '<h2>📋 アイテム一覧</h2>';
        let listContent = '';
        if (items.length === 0) {
            listContent = '<p>登録されているアイテムはありません。</p>';
        }
        else {
            // すべてのアイテムのHTMLを連結
            listContent = items.map(item => createListItemHtml(item)).join('');
        }
        // 最終的なHTMLを一度にコンテナに挿入 (パフォーマンスが良い)
        appContainer.innerHTML = `
                ${titleHtml}
                <ul style="list-style-type: none; padding: 0;">
                    ${listContent}
                </ul>
            `;
    })
        .catch(error => {
        // データ取得失敗
        console.error('一覧描画エラー:', error);
        appContainer.innerHTML = `
                <h2 style="color: red;">🚨 データ読み込み失敗</h2>
                <p>サーバーからデータを取得できませんでした。バックエンドサーバー (ポート8080) が起動しているか確認してください。</p>
                <p>詳細: ${error.message}</p>
            `;
    });
}
//# sourceMappingURL=List.js.map