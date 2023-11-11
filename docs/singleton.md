# Singleton Pattern

O padrão singleton é um padrão de software que permite com que estados das instâncias seja compartilhado. Ao criar uma nova instância com uma classe singleton os dados que já foram inseridos via outras instâncias serão passados para esse novo objeto, caso não haja valores de instâncias passadas o mesmo irá iniciar com valores default.

Esse padrão é extrameamente útil quando precisamos ter apenas uma fonte de verdade na nossa aplicação, como por exemplos estados globais, conexões com banco de dados ou outros casos.

**Vales salientar**, que por muitos o singleton é considerado um anti pattern justamente por instroduzir estados compartilhados e que por sua vez instroduzem muitos efeitos colaterais para a aplicação.

```typescript 
class Singleton {
    private static _instance: Singleton;
    state: any // <-- esse estado será sempre compartilhado

    public getInstance(): Singleton {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}
```


A usablidade da estrutura ficaria da seguinte maneira, veja que o estado interno do singleton será sempre o mesmo:


```typescript 
const singleton1 = Singleton.getInstance();
singleton1.state = "texto 1";

const singleton2 = Singleton.getInstance();
console.log(singleton2) // "texto 1"

singleton2.state = "text 2"

console.log(singleton1) // "texto 2"
```

### Referência

- https://refactoring.guru/pt-br/design-patterns/singleton