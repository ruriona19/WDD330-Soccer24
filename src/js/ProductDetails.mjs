
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  init() {
    this.renderProductDetails(this.dataSource);
  }

  renderProductDetails() {
    const discountAmount = Math.floor(Math.random() * (50 - 9) + 9);

    const pDescription = document.querySelector('.product__description');
    const pName = document.getElementById('product_name');
    const logo = document.querySelector('#logo');
    const banner = document.querySelector('#banner');
    const poster = document.querySelector('#poster');
    const trophy = document.querySelector('#trophy')
    const fanart1 = document.querySelector('#fanart1');
    // const title = document.querySelector('title');
    // const btn = document.getElementById('addToCart');

    pName.innerHTML = this.dataSource["strLeague"];
    pDescription.innerHTML = this.dataSource["strDescriptionEN"];  
    // pClassification.innerHTML = this.dataSource["NameWithoutBrand"];
    // pColor.innerHTML = "<b>Color:</b> " + this.dataSource["Colors"][0]["ColorName"];
    // pPrice.innerHTML = "$"  + this.dataSource["FinalPrice"];
    logo.src = this.dataSource["strLogo"];
    banner.src = this.dataSource["strBanner"];
    poster.src = this.dataSource["strPoster"];
    trophy.src = this.dataSource["strTrophy"];
    fanart1.src = this.dataSource["strFanart1"];
    // img.alt = this.dataSource["Name"];
    // btn.setAttribute('data-id', this.dataSource["Id"]);
    // title.innerHTML = "Sleep Outside | " + this.dataSource["Name"];
  }
}
