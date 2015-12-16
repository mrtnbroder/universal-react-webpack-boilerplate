
const getLowestPrice = (a, b) => Math.min(a, b)
const getIsOnPromotion = (i) => i.priceIsTemporary
const matchColor = (color, next) => +color.id === +needle

export const getSKU = (p) => `${p.id}-${p.id}${p.item}`
export const getPrice = (p) => p.price
export const getSalePrice = (p) => p.items.map(getPrice).reduce(getLowestPrice, getPrice(p))
export const getColorName = (colors, item) => colors.reduce(matchColor, item.color)
export const isOnSale = (p) => getSalePrice(p) <= getPrice(p)
export const isOnPromotion = (p) => p.items.some(getIsOnPromotion)
