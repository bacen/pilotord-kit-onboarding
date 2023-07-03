# Solidity API

## RealDigitalEnableAccount

Contrato que permite ao participante habilitar outras carteiras de sua propriedade.




### constructor

```solidity
constructor(address accessControlAddress) public
```

Constrói uma instância do contrato e armazena o endereço do contrato do RealDigital, responsável pelas verificações de controle de acesso.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| accessControlAddress | address | Endereço do contrato de controle de acesso |




### enableAccount

```solidity
function enableAccount(address member) public
```

Habilita uma nova carteira para o participante. Qualquer carteira previamente habilitada para o participante pode habilitar outras carteiras.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Novo endereço do participante |




### disableAccount

```solidity
function disableAccount() public
```

Desabilita a própria carteira que executou a função.

