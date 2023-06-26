<script>
import BlockChain from './components/classes/BlockChain'
import Block from './components/classes/Block'

//console.log(JSON.stringify(minhaBlockChain, null, 4))

/*
console.log('A blockchain é valida? ' + minhaBlockChain.isChainValid())

minhaBlockChain.chain[1].data = {amount: 100}
minhaBlockChain.chain[1].hash = minhaBlockChain.chain[1].calculateHash()

console.log('A blockchain é valida? ' + minhaBlockChain.isChainValid())
*/



export default {
  name: 'App',
  methods: {
    criarBlockchain() {
      this.carregando = 0
      let minhaBlockChain = new BlockChain(this.dificuldade)  // cria minha blockchain
      this.estaCarregando = true
      this.minerarBlocos(minhaBlockChain)
      this.estaCarregando = false
    },
    criarBlocos() {
      let arrayBlocos = []
      for (let i = 0; i < 10; i++) {
        arrayBlocos.push(new Block(i + 1, new Date(), { amount: Math.random() * (Math.random() * 1000) }))
      }
      return arrayBlocos
    },
    minerarBlocos(minhaBlockChain) {
      this.desvioPadrao = 0
      this.listaTempos = []

      for (let j = 0; j < 10; j++) {
        let blocosCriados = []
        blocosCriados = this.criarBlocos()
        this.carregando = this.carregando + 10
        for (let i = 0; i < blocosCriados.length; i++) {
          console.log('Minerando bloco ' + (i + 1) + ' pela ' + (j + 1) + ' vez...')
          const antes = Date.now()
          minhaBlockChain.addBlock(blocosCriados[i])
          const duracao = Date.now() - antes
          this.listaTempos.push(duracao)
          console.log('O Bloco ' + (i + 1) + ' demorou ' + duracao + ' ms')
        }
      }
      this.media = this.listaTempos.reduce((total, valor) => total + valor / this.listaTempos.length, 0).toFixed(2);
      let variancia = this.listaTempos.reduce((total, valor) => total + Math.pow(this.media - valor, 2) / this.listaTempos.length, 0);
      this.desvioPadrao = Math.sqrt(variancia).toFixed(2);
    }
  },
  data() {
    return {
      dificuldade: 0,
      listaTempos: [],
      media: 0,
      desvioPadrao: 0,
      carregando: 0,
      estaCarregando: false
    }
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>Blockchain</h1>
    </v-app-bar>

    <v-main>
      <v-card>
        <v-select label="Dificuldade" v-model="dificuldade" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></v-select>
        <v-btn @click="criarBlockchain">Rodar blockchain</v-btn>

        <v-progress-circular :value="carregando"></v-progress-circular>
        <v-spacer></v-spacer>
        <v-card-text>Resultados: {{ media }} ms &plusmn; {{ desvioPadrao }} ms</v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>