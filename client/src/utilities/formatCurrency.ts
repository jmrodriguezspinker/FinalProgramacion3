const CURRENCY_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS"
});

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}

/**
 * ! Está creando un formateador de moneda usando Intl.NumberFormat, que es una API integrada de JavaScript para formateo internacional (fechas, números, monedas, etc.).
 * ? Explicación de cada parte:
 * ? Intl.NumberFormat(...): constructor para crear un objeto que formatea números.
 * ? undefined: significa que usará el idioma del entorno del navegador o sistema.
 * ? currency: "USD": indica que se debe mostrar en dólares estadounidenses.
 * ? style: "currency": le dice que el número debe verse como una moneda, no como un número normal.
 */