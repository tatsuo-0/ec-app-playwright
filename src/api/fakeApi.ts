export type Product = {
  id : number;
  name : string;
  price : number;
  description : string;
};

const products:Product[] = [
    { id: 1,
      name: "iPhone",
      price: 120000, 
      description:"高性能カメラと大画面ディスプレイを搭載した最新スマートフォン。長時間駆動のバッテリーで一日中安心して使えます。"
    },
    { 
      id: 2, 
      name: "MacBook",
      price: 240000,
      description:"薄型軽量ボディに高いパフォーマンスを凝縮したノートPC。動画編集やプログラミングもストレスなくこなせます。"
    },
    { id: 3,
      name: "AirPods",
      price: 30000,
      description: "ノイズキャンセリング機能付きの完全ワイヤレスイヤホン。軽量設計で長時間の装着でも耳が疲れにくい仕様です。"
    }
  ];

export async function getProducts() {
  return products;
}

export async function getProductById( id:number ){
  return products.find((p)=> p.id === id);
}