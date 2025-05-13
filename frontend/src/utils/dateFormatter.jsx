import {format, formatISO, parseISO} from 'date-fns'

export const formatToBrazilianDate = (date) => {
    return format(date, 'dd/MM/yyyy')
}

export const formatToISO = (date) => {
    const dataObj = new Date(date);
    return formatISO(dataObj).substring(0, 16);
}
