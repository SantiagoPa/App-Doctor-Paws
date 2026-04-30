

export const formatCurrency = (price: number) => {
  const formatter =  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  return formatter.format(price);
}
