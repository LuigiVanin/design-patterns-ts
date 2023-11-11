# Iterator Pattern

O padrão de design de software Iterator consiste em um iterador que oferece métodos para acessar, remover e adicionar elementos a uma coleção. A coleção pode ser uma lista, um array, uma árvore ou qualquer outra estrutura de dados, porém deve prover uma maneira de ser percorrido sequencialmente, geralmente com um método `next()`.

### Exemplo:

Vamos supor que temos uma Trêm com diversos vagões conectados entre sí. Queremos representar esse trem em forma de software. O trem é uma coleção de vagões, e cada vagão é um objeto, para termos a maneira de acessar todos os vagões devemos ser capazes de passar de um vagão para outro, além de acessar o vagão podemos ser capazes de trocar a ordem de cada item e remove-los e adiciona-los.

```typescript
interface IVagao {
    code: string;
    next: IVagao | null;
    prev: IVagao | null;

    next(): Vagao;
    remove(): void;
    add(vagao: Vagao): void;
}

class Vagao implements IVagao {
    constructor(
        public code: string,
        public next: IVagao | null = null,
        public prev: IVagao | null = null
    ) {}

    next() {
        return this.next;
    }

    remove() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }

    add(vagao: Vagao) {
        vagao.next = this.next;
        vagao.prev = this;
        this.next.prev = vagao;
        this.next = vagao;
    }
}

interface ITrem extends IVagao {}
```

### Referências

- https://refactoring.guru/design-patterns/iterator