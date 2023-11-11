# Prototype Pattern

O design de protótipo ou prototype pattern em inglês é um padrão criacional em que possibilita a criação de uma nova entidade a partir de uma entidade preexistente, essa nova entidade deve ser igual o objeto a qual foi originado, gerando assim dois objetos iguais independentes um do outro.

### Problema

Dependendo da complexidade do objeto criado se torna difícil copiar o mesmo de forma manual ou reproduzir seus atributos e métodos sem mater os objetos original e copiado interligados(quando se copia um objeto se passa um referência por memória). Com esse problema em mente se tem o pattern de protoype que basicamente adicionar instruções para clonar o objeto como um método do mesmo, dessa maneira padronizamos esse processo.

Podemos simplificar o prototype pattern como um interface como a abaixo:

```typescript
interface Prototype {
    clone() Prototype;
}

class TextEditor implements Prototype {
    text: string;
    cursorPosition: number;
    snapshots: TextEditorSnapshot[]
    // ...

    clone(): TextEditor {
        clone = new TextEditor();
        clone.setText(this.text);
        clone.setCursorPos(this.cursorPosition);
        clone.setSnapshots([]);

        return clone;
    }
}

const main = () => {
    editor = new TextEditor();
    editor.setText("Esse é o seu editor vazio, escreva algo para começar");

    editorClone = editor.clone();

    functionThatShuffleEditorWords(editorClone);

    console.log(editor) // <== Editor original intacto
    console.log(editorCloned) // <== Editor clonado embaralhado
}
```

### Referências

- https://refactoring.guru/design-patterns/prototype