import {format} from 'date-fns'

export const formatToBrazilianDate = (date) => {
    return format(date, 'dd/MM/yyyy')
}
