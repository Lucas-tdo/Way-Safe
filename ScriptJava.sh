#!/bin/bash

# Função para validar execução de comandos
validar_execucao() {
  if [ $? != 0 ]; then
    echo "Erro: O último comando falhou. Abortando execução."
    exit 1
  fi
}

# Verifica se o JAVA está instalado
java -version > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "Java já está instalado no sistema!"
  java -version
else
  echo "Java não está instalado!"

  echo "Deseja instalar o Java e as bibliotecas necessárias? [s/n]"
  read get

  if [ "$get" == "s" ]; then
    echo "Atualizando pacotes..."
    sudo apt update -y && sudo apt upgrade -y
    validar_execucao

    echo "Instalando OpenJDK 17..."
    sudo apt install openjdk-17-jdk -y
    validar_execucao

    echo "Instalando bibliotecas auxiliares..."
    sudo apt install -y curl wget unzip zip software-properties-common
    validar_execucao

    echo "Configurando variáveis de ambiente JAVA_HOME e PATH..."
      
    # Caminho onde o Java foi instalado
    JAVA_PATH=$(readlink -f /usr/bin/java | sed "s:bin/java::")
    validar_execucao

    # Cria o arquivo de configuração no diretório /etc/profile.d
    sudo bash -c "cat > /etc/profile.d/java_env.sh" <<EOF
export JAVA_HOME=${JAVA_PATH}
export PATH=\$PATH:\$JAVA_HOME/bin
EOF
    validar_execucao

    # Aplica as variáveis no ambiente atual
    source /etc/profile.d/java_env.sh
    validar_execucao

    echo "JAVA_HOME configurado para: $JAVA_HOME"
    echo "Instalação e configuração concluídas com sucesso!"
  else
    echo "Instalação cancelada pelo usuário."
  fi
fi