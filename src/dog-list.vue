<template>
    <section class="list-group col">
    <router-link href="#"  class="list-group-item list-group-item-action"
    v-for="dog of dogs" :key="dog._id" 
    :to="{name:'details', params:{name:dog.name}}"
    >
    {{dog.name}}
    </router-link>
</section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Dog} from "../shared/interfaces";
import DogForm from "./dog-form.vue";
import Store from "./store";
export default defineComponent({
    name:"dog-list",
    data(){
        return{
            dogs:[] as Array<Dog>
        }
    },
    async created(){
        const items= await Store.getAll();
        items.forEach((dog) => {
            this.dogs.push(dog);
        });
    }, 
    methods:{
    }

});</script>

<style>

</style>