export interface product{
    name:string,
    price:number,
    desc:string,
    img:string,
    category:string,
    isdeleted:boolean,
    inStock:boolean,
    quantity:number,
    size:productSize
}

enum productSize{
    "small",
    "medium",
    "large"
}