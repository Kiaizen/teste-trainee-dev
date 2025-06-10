# 🛠️ Relatório Técnico - Felipe Harão Marques Fernandes Madeira

## 1. 📌 Visão Geral da Solução

Durante o desenvolvimento e ajustes da aplicação, foram realizadas diversas melhorias: desde a correção de pequenos erros (typos) até a implementação de novas funcionalidades completas. O projeto foi gradualmente evoluído com foco em usabilidade, funcionalidade e qualidade de código.

---

## 2. 🚀 Como Executar a Aplicação

### Clonando o Repositório

```bash
git clone https://github.com/Kiaizen/teste-trainee-dev.git
cd imts-lista-tarefas
```

### Instalando Dependências

```bash
npm install
```

### Executando a Aplicação

```bash
npm start
```

Depois, acesse no navegador:

```
http://localhost:4200
```

---

## 3. 🐞 Correção dos Erros Iniciais

- Adicionei o script `npm start` ao `package.json`.
- Corrigi typo no `header.component.ts`.
- Adicionei o `RouterModule` ao `imports` do `app.module.ts`.
- Corrigi o `import` do `TodoService` no `new-task.component.ts`.
- Instalei e configurei o FontAwesome.
- Corrigi conflito de declaração duplicada do `HeaderComponent` entre módulos.
- Recebi ajuda do ChatGPT em vários pontos para ganhar agilidade.

---

## 4. 🔧 Relatório de Correção de Bugs

- Removida linha duplicada no `new-task.component.ts` (linha 24).
- Corrigida a lógica da função `addTask`, que estava bloqueando após uma inserção.
- Corrigido texto do botão de adicionar tarefa para português.
- Ajustado ternário do botão para refletir corretamente o estado.
- Adicionado `confirm()` ao `todo.service.ts` antes de excluir tarefas.
- Corrigida a lógica do filtro para considerar apenas tarefas não concluídas.
- Renomeada a função `updatedTodo` para `taskChecked`, com padronização dos nomes relacionados.

### Refatorações no serviço e componentes

**No `TodoService`**:
- Adicionado `BehaviorSubject` para gerenciar estado de edição.
- Criado método `setEditingTodo()`.
- Corrigido `updateTodo()` para atualizar corretamente localStorage e lista.

**No `TodoItemComponent`**:
- `updateTodo()` agora utiliza `setEditingTodo()`.

**No `NewTaskComponent`**:
- Implementado `OnInit` e `OnDestroy` com gerenciamento de inscrição.
- Adicionada lógica para detectar se é criação ou edição de tarefa.
- Criado getter `buttonText` para alternar dinamicamente o texto do botão.

**Outras correções**:
- Corrigido problema de espaços vazios com uso de `trim()`.
- Adicionado `flex-grow` e `gap` em `todo-item_content` para melhor layout.
- Corrigido `overflow-y` no CSS do componente `todo`.

---

## 5. ✨ Relatório de Implementação de Melhorias

- **Ordenação A-Z**: Criada nova função `sortTodosAZ` para ordenar apenas tarefas não concluídas com `localeCompare()`.
- **Tecla Enter para adicionar**: Utilizado `(keyup.enter)` para maior usabilidade.
- **Filtro de palavras ofensivas**: Biblioteca `bad-words` implementada; filtragem com `includes('*')` após o processamento.
- **Exportação para PDF**: Utilizada a biblioteca `jsPDF` para exportar a lista de tarefas (obrigado ChatGPT pela força com a doc).
- **Confirmações e alertas modernos**: Substituídos `alert()` e `confirm()` pela biblioteca `sweetalert2`.

---

## 6. ❌ Relatório de Débito Técnico

- A funcionalidade de **editar tarefas** foi particularmente difícil, pois minha experiência principal é com React.
- Tive dificuldades com a **comunicação entre componentes** no Angular, mas consegui resolver com ajuda do ChatGPT e revisando os fundamentos do framework.

---

## 7. 💡 Sugestões de Melhorias Futuras

- Melhorar **interface e responsividade** (especialmente para daltônicos como eu).
- Adicionar **autenticação por usuário**, com backend e banco de dados.
- Implementar **deadlines** para tarefas e notificação.
- Criar visualização de **tarefas por status** (ex: pendentes, em andamento, concluídas).

---

## 8. 🧠 Considerações Finais

O desafio foi extremamente enriquecedor. No começo achei que teria uma baita dor de cabeça, mas me diverti muito resolvendo os problemas. Foi a primeira vez que escrevi um README com tanta dedicação — mesmo que eu não passe, já saio feliz por ter aprendido tanto.

Muito obrigado pela oportunidade! 🙏