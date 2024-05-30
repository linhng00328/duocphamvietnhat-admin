export const getInvoiceTemplate = () => {
    return parseInt(localStorage.getItem('invoiceordertemplate') ?? 0)
}

export const setInvoiceTemplate = (index) => {
    localStorage.setItem("invoiceordertemplate", index);
}