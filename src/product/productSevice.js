import Product from "./productModel";
import BaseSevice from "../../base/BaseService";
import autoBind from "auto-bind";
import HttpResponse from "../../helper/HttpResponse";

class ProductService extends BaseSevice {
  constructor() {
    super(Product);
    autoBind(this);
  }
  async getAll(_query) {
    try {
      const items = {
        laptop: [
          {
            name: "MSI Gaming GF63 Thin 11UD i7 11800H (648VN)",
            price: 25690000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/44/273213/msi-gaming-gf63-thin-11ud-i7-11800h-8gb-512gb-4gb-rtx3050ti-600x600.jpg",
          },
          {
            name: "Asus Gaming ROG Flow Z13 GZ301Z i7 12700H (LD110W)",
            price: 49990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/44/274539/asus-gaming-rog-flow-z13-gz301z-i7-ld110w-160322-120057-600x600.jpg",
          },
          {
            name: "Acer Nitro 5 Gaming AN515 57 5831 i5 11400H",
            price: 28040000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/44/247312/acer-nitro-5-gaming-an515-57-5831-i5-nhqdgsv003-600x600.jpg",
          },
          {
            name: "Dell Gaming Alienware m15 R6 i7 11800H (P109F001DBL)",
            price: 57190000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/44/271545/dell-gaming-alienware-m15-r6-i7-p109f001dbl-020322-112012-600x600.jpg",
          },
          {
            name: "Lenovo Gaming Legion 5 15ITH6 i7 11800H (82JK00FNVN)",
            price: 36990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/44/272005/lenovo-gaming-legion-5-15ith6-i7-82jk00fnvn-180322-100552-600x600.jpg",
          },
        ],
        phone: [
          {
            name: "Samsung Galaxy S22 Ultra 5G",
            price: 30990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/42/235838/Galaxy-S22-Ultra-Burgundy-600x600.jpg",
          },
          {
            name: "iPhone 11",
            price: 16290000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg",
          },
          {
            name: "OPPO Reno7 series",
            price: 10490000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/42/271717/oppo-reno7-z-5g-thumb-1-1-600x600.jpg",
          },
          {
            name: "iPhone 13 Pro Max",
            price: 33990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-gold-1-600x600.jpg",
          },
          {
            name: "Samsung Galaxy A52s 5G 128GB",
            price: 10690000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
          },
        ],
        tablet: [
          {
            name: "Samsung Galaxy Tab S8",
            price: 20990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/522/247510/Samsung-Galaxy-tab-s8-black-thumb-600x600.jpg",
          },
          {
            name: "Samsung Galaxy Tab A7 Lite",
            price: 4490000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/522/237325/samsung-galaxy-tab-a7-lite-gray-600x600.jpg",
          },
          {
            name: "iPad Pro M1 11 inch 5G",
            price: 44590000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/522/269329/pad-pro-m1-11-inch-wifi-cellular-1tb-2021-bac-thumb-600x600.jpeg",
          },
          {
            name: "iPad Pro M1 12.9 inch 5G",
            price: 29990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-2021-129-inch-gray-600x600.jpg",
          },
          {
            name: "Samsung Galaxy Tab S8+",
            price: 25990000,
            thumbnail:
              "https://cdn.tgdd.vn/Products/Images/522/247512/Tab-S8+-Black-1-600x600.jpeg",
          },
        ],
      };
      return new HttpResponse(items, { totalCount: items.length });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAllProducts() {
    try {
      const allProducts = await this.model.findAll({
        where: { isPublished: true },
      });
      return allProducts;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProductService;
