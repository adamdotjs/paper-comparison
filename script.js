// 1. take input of quoted price and purchase price, then show percentage of savings/excess
// 2. Allow user to select CWT or Per M price. Show MWT input box if CWT is selected

function comparePrices(quotedPrice, purchasePrice) {
  const comparisonDisplay = document.querySelector("#comparison-display");
  const percentage = ((purchasePrice / quotedPrice) * 100 - 100).toFixed(2);

  if (!purchasePrice || !quotedPrice) {
    comparisonDisplay.innerText = `Please check for missing fields and try again`;
  } else if (purchasePrice < quotedPrice) {
    comparisonDisplay.innerText = `The purchase price is ${percentage}% less expensive than the quoted price.`;
  } else if (purchasePrice > quotedPrice) {
    comparisonDisplay.innerText = `The purchase price is ${percentage}% more expensive than the quoted price.`;
  } else {
    comparisonDisplay.innerText = `The purchase price is the same as the quoted price.`;
  }
}

function calculateQuotedPrice() {
  const mWeight = document.querySelector("#m-weight").value;
  const quotedPriceVal = document.querySelector("#quoted-price").value;
  const uomOption = document.querySelector("#quoted-price-uom").value;
  const qtyOrdered = document.querySelector("#quantity").value;

  if (uomOption === "m") {
    return quotedPriceVal * (qtyOrdered / 1000);
  } else {
    return quotedPriceVal * (mWeight / 100) * (qtyOrdered / 1000);
  }
}

function calculatePurchasePrice() {
  const mWeight = document.querySelector("#m-weight").value;
  const purchasePriceVal = document.querySelector("#purchase-price").value;
  const uomOption = document.querySelector("#purchase-price-uom").value;
  const qtyOrdered = document.querySelector("#quantity").value;

  if (uomOption === "m") {
    return purchasePriceVal * (qtyOrdered / 1000);
  } else {
    return purchasePriceVal * (mWeight / 100) * (qtyOrdered / 1000);
  }
}

function displayPrice(quotedPrice, purchasePrice) {
  const quotedPriceDisplay = document.querySelector("#quoted-price-display");
  const purchasePriceDisplay = document.querySelector("#purchase-price-display");
  const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  quotedPriceDisplay.innerText = `The total quoted price is ${priceFormat.format(quotedPrice)}`;
  purchasePriceDisplay.innerText = `The total purchase price is ${priceFormat.format(
    purchasePrice
  )}`;
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  comparePrices(calculateQuotedPrice(), calculatePurchasePrice());
  displayPrice(calculateQuotedPrice(), calculatePurchasePrice());
});
