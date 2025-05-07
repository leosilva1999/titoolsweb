import {format, formatISO, parseISO} from 'date-fns'

export const formatToBrazilianDate = (date) => {
    return format(date, 'dd/MM/yyyy')
}

export const formatToInput = (date) => {
    const dataObj = typeof date === 'string' ? parseISO(date) : date;
    return formatISO(dataObj).substring(0, 16);
}
