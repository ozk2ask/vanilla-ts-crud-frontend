const API_URL = 'http://localhost:8080/api/items';
export async function fetchItems() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`データの取得に失敗: ${response.status}, ${response.statusText}`);
        }
        return (await response.json());
    }
    catch (error) {
        console.error('API通信エラー:', error);
        throw new Error('ネットワーク接続またはサーバー応答エラー');
    }
}
export async function createItem(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        // ...
    });
    if (!response.ok) {
        throw new Error('作成に失敗しました');
    }
    return response.json();
}
//# sourceMappingURL=itemApi.js.map