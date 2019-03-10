<template>
  <div class="container">
    <card v-for="(card, index) in cards" :key="index"
          :background="card.background">
      <span slot="icon">
        <img v-bind:src="card.image"/>
      </span>
      <h1 slot="header">{{ card.name }}</h1>
      <p slot="content">{{ card.description }}</p>
    </card>
  </div>
</template>

<script>
  import Card from './Card'
  import firebase from '../firebase'

  const database = firebase.database()
  const cardsRef = database.ref()

  export default {
    name: 'Index',
    components: {Card},
    data () {
      return {
        cards: []
      }
    },
    created () {
      cardsRef.on('child_added', snapshot => {
        this.cards.push({...snapshot.val(), id: snapshot.key})
      })
      cardsRef.on('child_removed', snapshot => {
        const deletedCard = this.cards.find(card => card.id === snapshot.key)
        const index = this.cards.indexOf(deletedCard)
        this.cards.splice(index, 1)
      })
      cardsRef.on('child_changed', snapshot => {
        const updatedCard = this.cards.find(card => card.id === snapshot.key)
        updatedCard.name = snapshot.val().name
        updatedCard.description = snapshot.val().description
        updatedCard.image = snapshot.val().image
      })
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
