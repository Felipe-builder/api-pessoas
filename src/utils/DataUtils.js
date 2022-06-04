export class DataUtils {
    

    /**
     * Esta função retira da hora "08:32" o caractere ":" e ajusta ao horário de brasila
     * @param {*} valorIntervalo 
     * @returns 
     */
    static modificaValorIntervalo(valorIntervalo) {
        const novaData = new Date();
        if (typeof valorIntervalo === 'string' && valorIntervalo.length > 0) {
            let hours = valorIntervalo.split(':');
            novaData.setHours((Number(hours[0] - 3)), Number(hours[1]));
            return novaData;
        }
    }

    /**
     * Esta função retira da hora "08:32" o caractere ":" e ajusta ao horário de brasila
     * @param {*} valorHorarioFixo 
     * @returns 
     */
    static modificaValoHorarioFixor(valorHorarioFixo) {
        const novaData = new Date();
        if (typeof valorHorarioFixo === 'string' && valorHorarioFixo.length > 0) {
            let hours = valorHorarioFixo.split(':');
            novaData.setHours((Number(hours[0] - 3)), Number(hours[1]));
            return novaData;
        }
    }
}