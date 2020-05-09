# GCP - Home Access

### Propósito
Este script foi criado para agilizar a atualização do novo IP dinâmico nas regras de firewall no GCP quando estou trabalhando de casa

### Roadmap
- Nada a fazer

### Requerimentos em ambiente Ubuntu
| Packages | Info | Referência |
| ------ | ------ | ------ |
| NodeJS |  |  |
| NPM |  |  |
| request | Pacote NPM |  |
| @google-cloud/compute | Pacote NPM |
| gcloud | Linha de comando do GCP no Ubuntu | https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu |
| Firewall | Configuração de regra de firewall no GCP | https://cloud.google.com/filestore/docs/configuring-firewall?hl=pt-br |
| Conta de Serviço | Configuração de conta de Serviço no GCP | https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=pt-br |
| Role e IAM | Configuração de role customizada no GCP | https://cloud.google.com/iam/docs/creating-custom-roles?hl=pt-br |

### Instalação e configuração

- clone o repositório 
```sh
$ cd workspace
$ git clone 
$ cd gcp_home_access
```
- instale o nodejs e as dependências se ainda não tiver instalado
```sh
$ sudo apt update
$ sudo apt install -Y nodejs npm
$ npm install request --save
$ npm install --save @google-cloud/compute
```
- Crie uma regra de firewall no GCP chamada `homeaccess`

![Screenshot](firewall.png)

- Crie uma regra role customizada no GCP chamada `HomeAccessRole` e adicione as seguintes politicas na role.
```sh
compute.firewalls.update
compute.networks.updatePolicy
compute.firewalls.get
```
![Screenshot](role.png)

- Crie uma conta de serviço chamada `homeaccess-firewallrule`, ela será usada pelo script para acessar o GCP e fazer a atualização do firewall.

![Screenshot](serviceaccount.png)

