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
        return pax > 1 ? 40 * (pax - 1) * noches : 0
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
        this._subtotal = this._reserva.reduce((acc, { pax, noches }) =>
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
        this._tipoHabitacion = {
            standard: 100,
            suite: 150
        }
        this._subtotalDesafio = 0
        this._totalDesafio = 0
    }

    cargoAdicional(pax, noches, desayuno) {
        let cargoAdicional = pax > 1 ? 40 * (pax - 1) * noches : 0
        desayuno ? cargoAdicional += 15 * pax * noches : 0
        return cargoAdicional
    }

    calculaSubtotal() {
        this._subtotalDesafio = this._reservaDesafio.reduce((acc, { tipoHabitacion, pax, noches, desayuno }) => {
            let precio = 0
            for (const [clave, valor] of Object.entries(this._tipoHabitacion)) {
                if (clave === tipoHabitacion) precio = valor
            }
            return acc + precio * noches + this.cargoAdicional(pax, noches, desayuno)
        }, 0)
    }

    get subtotal() {
        return this._subtotalDesafio
    }

    calculaTotal() {
        this._totalDesafio = this._subtotalDesafio * 1.21
    }

    get total() {
        return this._totalDesafio
    }

    set reservaDesafio(reservaExt) {
        this._reservaDesafio = reservaExt
        this.calculaSubtotal()
        this.calculaTotal()
    }
}

class Cliente extends ClaseBase {
    constructor() {
        super()
        this.calculaSubtotal()
    }
}

class Profesional extends ClaseBase {
    constructor() {
        super()
        this._tipoHabitacion = {
            standard: 100,
            suite: 100
        }
    }

    calculaTotal() {
        this._totalDesafio = ((this._subtotalDesafio / 1.15) * 1.21).toFixed(2)
    }
}

const BookingCliente = new Cliente()
BookingCliente.reservaDesafio = reservas

console.log('Subtotal Cliente: ', BookingCliente.subtotal)
console.log('Total Cliente: ', BookingCliente.total)

const BookingProfesional = new Profesional()
BookingProfesional.reservaDesafio = reservas

console.log('Subtotal Profesional: ', BookingProfesional.subtotal)
console.log('Total Profesional: ', BookingProfesional.total)


