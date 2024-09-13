class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana', carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: 'savana', carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: 'rio', carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: 'savana', carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        const especie = this.animais[animal];
        if (!especie) return { erro: 'Animal inválido' };
        if (quantidade <= 0 || typeof quantidade !== 'number') return { erro: 'Quantidade inválida' };

        const espacoNecessario = especie.tamanho * quantidade;

        const recintosViaveis = this.recintos.filter(({ bioma, animais, tamanho }) => {
            const espacoOcupado = animais.reduce((acc, { quantidade, tamanho }) => acc + quantidade * tamanho, 0);
            const biomaAdequado = Array.isArray(especie.bioma) ? especie.bioma.includes(bioma) : especie.bioma === bioma;


            const podeConvivio = !especie.carnivoro && animais.every(({ especie }) => !this.animais[especie].carnivoro) ||
                (especie.carnivoro && animais.length === 0);

            const espacoDisponivel = tamanho - espacoOcupado;

            const espacoExtra = (animais.length > 0 && animais[0].especie !== animal) ? 1 : 0;
            const espacoFinal = espacoDisponivel - espacoExtra;

            return biomaAdequado && podeConvivio && espacoFinal >= espacoNecessario;
        }).map(({ numero, tamanho, animais }) => {
            const espacoOcupado = animais.reduce((acc, { quantidade, tamanho }) => acc + quantidade * tamanho, 0);
            const espacoExtra = (animais.length > 0 && animais[0].especie !== animal) ? 1 : 0;
            const espacoLivre = tamanho - espacoOcupado - espacoNecessario - espacoExtra;
            return `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${tamanho})`;
        });

        return recintosViaveis.length ? { recintosViaveis } : { erro: 'Não há recinto viável' };
    }
}

export { RecintosZoo as RecintosZoo };
