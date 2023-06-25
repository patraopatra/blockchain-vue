<script>
import MainContent from './components/MainContent.vue'

import BlockChain from './components/classes/BlockChain'
import Block from './components/classes/Block'

let minhaBlockChain = new BlockChain()  // cria minha blockchain

console.log('Minerando bloco 1...')

const antes = Date.now()
minhaBlockChain.addBlock(new Block(1, "25/05/2023", {amount: 4})) // adiciona um bloco
const duracao = Date.now() - antes

console.log('O Bloco 1 demorou '+duracao+ ' ms')

console.log('Minerando bloco 2...')
minhaBlockChain.addBlock(new Block(2, "28/05/2023", {amount: 10})) // adiciona um bloco
                                            // os dados podem ser o que quiser
                                            
//console.log(JSON.stringify(minhaBlockChain, null, 4))

/*
console.log('A blockchain é valida? ' + minhaBlockChain.isChainValid())

minhaBlockChain.chain[1].data = {amount: 100}
minhaBlockChain.chain[1].hash = minhaBlockChain.chain[1].calculateHash()

console.log('A blockchain é valida? ' + minhaBlockChain.isChainValid())
*/



export default {
  name: 'App',

  components: {
    MainContent,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <MainContent></MainContent>
    </v-main>
  </v-app>
</template>