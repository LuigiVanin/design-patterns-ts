# Observer Pattern

O padrão de design de Observer tem a ideia de possibilitar a uma entidade se inscrever em outra entidade e receber notificações, dessa maneira, um número _n_ de entidades podem observar e reagir a qualquer evento desse objeto sendo observado. O design Pattern também pode ser chamado de **PubSub**, pois temos uma interface de um objeto **Publisher** e outro **Subcriber**.

Como já foi dito, podemos separar esse pattern em duas entidades, uma denominada **Subscriber** em que irá se increver para receber eventos de um **Publisher**. Podemosn chamar também de Subject e Observer, sendo o **Subject -> Publisher** e o **Observer -> Subscriber**.

### Problema

Vamos supor que temos uma loja que vende um tipo x de celular e um cliente tem interesse em comprar esse produto e quer saber quando o mesmo irá chegar na loja. Para que o cliente saber se o seu produto está na loja ele terá que visitar o estabelecimento em tempos em tempos. Para solucionar esse problema entra o observer pattern, em que se cria um meio de notificar o cliente para que ele venha ao estabelecimento apenas quando for necessário.



### Exemplo:

Usando o exemplo abaixo vamos criar uma demostração em código do Observer Pattern.

Primeiramente vamos criar as interfaces gerais para o **Subscriber** e o **Publisher**.

```typescript 
export interface Subscriber<T> {
    update: (data: T) => void;
}

export interface Publisher<T> {
    subscribe: (observer: Subscriber<T>) => void;
    unsubscribe: (observer: Subscriber<T>) => void;
    notify: (data: T) => void;
}
```

Agora vamos implemetar as interface para estruturas análogas ao nosso cliente e estabelecimento citado no exemplo:

```typescript
type Produto = {
    name: string;
    preco: number;
    // ...
}

class Cliente implements Subscriber<Produto> { 
    loja: Loja;

    goToStore() {
        // ...
    }

    notify(data: Produto) {
        if (data.name === "PRODUTO QUE EU QUERO") {
            this.goToStore();
        }
    }

}

class Loja implements Publisher<Produto> {
    observers: Cliente[]

    subsribe(observer: Cliente) {
        this.observers.push(observer);
        observer.store = this;
    }

    unsubscriber(observer: Cliente) {
        this.observers.filter((item) => item.name !== observer.name);
    }

    notify(data: Produto) {
        this.observers.forEach((item) => item.notify(data));
    }
} 
```