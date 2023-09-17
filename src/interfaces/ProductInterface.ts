export type ProductListInterface = {
    id: string;
    title: string;
    price: number;
    thumbnail: number;
}

export type BaseProductInterface = {
    title: string;
    sku: string;
    categoryId: string;
    description?: string;
    price: number;
    weight: number;
    length: number;
    width: number;
    height: number;
}

export type ProductInterface = {
    thumbnail: string;
} & BaseProductInterface

export type StoringProductAPIInterface = {
    thumbnail: any;
} & BaseProductInterface

export type ProductDetailInterface = {
    categoryName: string;
} & ProductInterface;