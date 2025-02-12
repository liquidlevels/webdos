<script setup>
import BlogPost from './components/BlogPost.vue';
import ConterButton from './components/ConterButton.vue';

</script>

<template>
  <BlogPost  
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
  />
</template>