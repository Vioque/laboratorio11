const reservas = [
    {
        tipoHabitacion: 'standard',
        pax: 1,
        noches: 3,
        desayuno: false
    },
    {
        tipoHabitacion: 'standard',
        pax: 2,
        noches: 4,
        desayuno: true
    },
    {
        tipoHabitacion: 'suite',
        pax: 2,
        noches: 1,
        desayuno: false
    },
    {
        tipoHabitacion: 'standard',
        pax: 3,
        noches: 2,
        desayuno: true
    }
]

class ReservaWeb {
    constructor() {
        this._reserva = []
        this._subtotal = 0
        this._total = 0
    }

    calculaTipoHabitacion(tipoHabitacion) {
        switch (tipoHabitacion) {
            case 'standard':
                return 100
            case 'suite':
                return 150
        }
    }

    calculaCargoAdicional(pax, noches) {
        const cargo = pax > 1 ? 40 * (pax - 1) * noches : 0
        return cargo
    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acc, { tipoHabitacion, pax, noches }) =>
            acc + this.calculaTipoHabitacion(tipoHabitacion) * noches + this.calculaCargoAdicional(pax, noches), 0)
    }

    get subtotal() {
        return this._subtotal
    }

    calculaTotal() {
        this._total = this._subtotal * 1.21
    }

    get total() {
        return this._total
    }

    set reserva(reservaExt) {
        this._reserva = reservaExt
        this.calculaSubtotal()
        this.calculaTotal()
    }
}

const booking = new ReservaWeb()
booking.reserva = reservas
console.log('Caso 1 Subtotal: ', booking.subtotal)
console.log('Caso 1 Total: ', booking.total)

reservas.push({ tipoHabitacion: 'standard', pax: 1, noches: 2 })
booking.reserva = reservas
console.log('Caso 1 Subtotal ampliación reserva: ', booking.subtotal)
console.log('Caso 1 Total ampliación reserva: ', booking.total)

/** Caso 2
 * Tour operador, se aplican condiciones especiales */
class TourOperador extends ReservaWeb {
    calculaSubtotal() {
        this._subtotal = reservas.reduce((acc, { pax, noches }) =>
            acc + 100 * noches + this.calculaCargoAdicional(pax, noches), 0)
    }

    calculaTotal() {
        this._total = ((this._subtotal / 1.15) * 1.21).toFixed(2)
    }
}

const tourOperador = new TourOperador()
tourOperador.reserva = reservas
console.log('Subtotal Tour Operador: ', tourOperador.subtotal)
console.log('Total Tour Operador con descuento: ', tourOperador.total)

/** Desafío y ejercicio adicional*/

class ClaseBase {
    constructor() {
        this._reservaDesafio = []
        this._precioHabitacion = {
            standard: 100,
            suite: 150
        }
        this._subtotalDesafio = 0
        this._totalDesafio = 0
    }

    cargoAdicional(acc, pax, noches) {
        const cargoAdicional = pax > 1 ? 40 * (pax - 1) * noches : 0
        if reservas[acc].desayuno { cargoAdicional += 15 * pax * noches }
        return cargoAdicional
    }

    calculaSubtotal() {
        this._subtotalDesafio = reservas.reduce((acc, { costeHabitacion, pax, noches }) =>
            acc + costeHabitacion * noches + this.cargoAdicional(acc, pax, noches), 0)
    }

    get subtotal() {
        return this._subtotalDesafio
    }

    calculaTotal() {
        this._totalDesafio = this._subtotalDesafio * 1.21
    }

    get calculaTotal() {
        return this._totalDesafio
    }

    set reservaDesafio(reservaExt) {
        this._reservaDesafio = reservaExt
        this.calculaSubtotal()
        this.calculaTotal()
    }
}

const BookingCliente = new ClaseBase()
BookingCliente.reservaDesafio = reservas

class Cliente