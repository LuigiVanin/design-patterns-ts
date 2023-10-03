# Builder Pattern

O padrão do contrutor, ou builder pattern, é um padrão de código que permite que o usuário crie instâncias complexas de um objeto usando métodos da própria classe para contruílo **passo a passo** de maneira simples é rápida.

Essa abordagem substitui o problema de ter que criar um construtor com diversos parâmetros, que pode ser confuso e difícil de entender, documentar e utilizar. Além disso, o usuário pode não precisar de todos os parâmetros, o que torna o construtor ainda mais confuso, com o builder pattern o usuário adiciona apenas o que irá utilizar e o `Builder` irá tomar conta do resto.

### Exemplo:

Vamos supor que queremos contruir uma casa, a classe `House` já é uma class pré-existente no nosso código e ela foi feita de maneira que pode ser com diferentes formatos, quantidade de cômodos, telhados, jardim e etc. Para se criar uma casa, devido variação de opções, seria necessário passar diversos parâmetros para o construtor, o que pode ser confuso e difícil de entender, documentar e utilizar. Além disso, o usuário pode não precisar de todos os parâmetros, o que torna o construtor ainda mais confuso, com o builder pattern o usuário adiciona apenas o que irá utilizar e o `Builder` irá tomar conta do resto.

```typescript
class House {
    constructor(
        public format: HouseFormat,
        public rooms: HouseRoom[],
        public roof: HouseRoof,
        public garden: HouseGarden
    ) {
        // ...
    }
}

class HouseBuilder {
    roof: HouseRoof;
    garden: HouseGarden;
    format: HouseFormat;
    rooms: HouseRoom[];

    constructor() {}

    addRoof(roof: HouseRoof) {
        // ...
        return this;
    }

    addGarden(garden: HouseGarden) {
        // ...
        return this;
    }

    addFormat(format: HouseFormat) {
        // ...
        return this;
    }

    addRoom(room: HouseRoom) {
        // ...
        return this;
    }

    build() {
        return new House(this.format, this.rooms, this.roof, this.garden);
    }
}
```

Podemos ver acima que o `HouseBuilder` é responsável por criar uma casa, ele possui métodos para adicionar cada parte da casa, e no final ele retorna uma instância de `House` com todos os parâmetros necessários.

Vale salientar que ao final de cada método de adição de parâmetro, o método retorna a instância de `HouseBuilder` para que o usuário possa encadear as chamadas e adicionar todos os parâmetros necessários.

```typescript
const house = new HouseBuilder()
    .addFormat(HouseFormat.SQUARE)
    .addGarden(HouseGarden.BIG)
    .addRoof(HouseRoof.TILE)
    .addRoom(HouseRoom.BEDROOM)
    .addRoom(HouseRoom.BATHROOM)
    .addRoom(HouseRoom.KITCHEN)
    .build();
```

E voilà, temos uma casa criada com apenas uma linha de código, e o usuário não precisa se preocupar com a ordem dos parâmetros, ou com os parâmetros que ele não precisa.
