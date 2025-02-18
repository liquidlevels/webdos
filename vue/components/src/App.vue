<script setup>
import BlogPost from './components/BlogPost.vue';
import ConterButton from './components/ConterButton.vue';

import { ref } from 'vue';

const posts = ref([
  { title: "Post netherite", id: 1, text: "Netherite is a material from the Nether, used primarily to upgrade diamond gear." },
  { title: "Post coal", id: 2, text: "Coal is a mineral item mainly obtained from coal ore. It is primarily used for crafting torches and campfires, as well as fuel." },
  { title: "Post iron axe", id: 3, text: "An axe is used to break logs, blocks derived from wood and some other blocks" },
  { title: "Post dragon egg", id: 4, text: "The dragon egg is a decorative block or a trophy item, and is the rarest item obtainable in the game, as it generates only once" },
  { title: "nothing", id: 5 },
]);

const favoriteTitle = ref("")
const favoriteText = ref("")

const favoritePost = (title) => {
  favoriteTitle.value = title
}

const favoriteContent = (text) => {
  favoriteText.value = text
}
 
</script>

<template>
  <!-- <BlogPost  
    title="Post netherite" 
    text="Netherite is a material from the Nether, used primarily to upgrade diamond gear." 
    :id="1"/>
  <BlogPost  
    title="Post coal" 
    text="Coal is a mineral item mainly obtained from coal ore. It is primarily used for crafting torches and campfires, as well as fuel." 
    :id="2" />
  <BlogPost  
    title="Post iron axe" 
    text="An axe is used to break logs, blocks derived from wood and some other blocks" 
    :id="3" />
  <BlogPost  
    title="Post dragon egg" 
    text="The dragon egg is a decorative block or a trophy item, and is the rarest item obtainable in the game, as it generates only once" 
    :id="4" />

  <BlogPost
    :id="10"
    title="nothing"  
  /> -->

  <h2>Favorite Item {{ favoriteTitle }}</h2>
  <p>Content: {{ favoriteText }}</p>

  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :id="post.id"
    :title="post.title"
    :text="post.text"
    @myfavorite="favoritePost(post.title)"
    @content="favoriteContent(post.text)"
  />

</template>