# Recomendador de Produtos RD Station - Teste Técnico

## Visão Geral

Este projeto implementa um sistema de recomendação de produtos da RD Station baseado nas preferências do usuário. Desenvolvido com React.js e Tailwind CSS, a aplicação permite:

- Selecionar preferências e funcionalidades desejadas
- Escolher entre recomendações individuais ou múltiplas
- Receber produtos recomendados com base nos critérios selecionados

## Principais Melhorias Implementadas

### Lógica de Recomendação (`recommendation.service.js`)
- Implementação do serviço de recomendação do zero
- Algoritmo de scoring baseado em matches de preferências e features
- Tratamento de empates
- Validação de inputs e tratamento de erros
- Otimização de performance

### Formulário (`Form.js`)
- Validação dos campos antes do envio
- Feedback visual claro sobre campos obrigatórios
- Mensagens de erro específicas
- Melhoria na experiência do usuário

### Interface (`App.js`, `RecommendationList`, componentes de campo)
- Layout responsivo aprimorado
- Componentes estilizados com Tailwind CSS
- Feedback visual para estados vazios
- Melhoria na organização visual

### Testes (`recommendation.service.test.js`)
- Abrangencia de testes unitários
- Cobertura de casos principais e edge cases
- Testes de validação e comportamento

## Como Executar

1. **Pré-requisitos**:
   - Node.js 18.3+
   - Yarn

2. **Instalação**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <DIRETORIO_DO_PROJETO>
   yarn install ##na pasta /frontend tambem
   ./install.sh
   ```

3. **Execução**:
   ```bash
   yarn dev
   ```

4. **Scripts Disponíveis**:
   - `start`: Inicia frontend e backend
   - `start:frontend`: Apenas frontend
   - `start:backend`: Apenas backend
   - `test`: Executa testes unitários

## Critérios Implementados
 


✅ 1. Receber preferências via formulário
✅ 2. Retornar recomendações baseadas nas seleções
✅ 3. Modo SingleProduct (apenas 1 produto)
✅ 4. Modo MultipleProducts (lista de produtos)
✅ 5. Tratamento de empates (último produto válido)
✅ 6. Lidar com diferentes tipos de preferências
✅ 7. Serviço modular e extensível

# Extras
✅ Validação de formulário completa  
✅ Feedback visual claro para o usuário  
✅ Testes unitários abrangentes  
✅ Código limpo
✅ Performance otimizada  

## Tecnologias Utilizadas

- **Frontend**: React.js 18
- **Estilização**: Tailwind CSS
- **API Mock**: json-server
- **Testes**: Jest

## Considerações Finais

O projeto foi desenvolvido com foco em:
- Código limpo e legível
- Boas práticas de React
- Experiência do usuário
- Performance
- Testabilidade

Todas as funcionalidades principais foram implementadas conforme especificado, com melhorias adicionais na validação e feedback ao usuário.

---
## Autor

Desenvolvido por [Thicianny Marques]

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
