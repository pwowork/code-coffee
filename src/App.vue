<template>
        <section class="row">
            <section class="list-group col">
                <a href="#"  class="list-group-item list-group-item-action"
                v-for="dog of dogs" :key="dog._id" @click="editDogClick(dog)">
              {{dog.name}}
                </a>
            </section>
            <section class="col">
                <dog-form :dog="{...editDog}"  @dog-save="saveDog"></dog-form>
            </section>
       </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Dog} from "../shared/interfaces";
import DogForm from "./dog-form.vue";
import Store from "./store";
export default defineComponent({
    name:"App",
    data(){
        return{
            dogs:[] as Array<Dog>,
            editDog :{
                name:'Component',
                age:6,
                description:'Default description'

            } as Dog|null
        }
    },
    async created(){
        const items= await Store.getAll();
        items.forEach((dog) => {
            this.dogs.push(dog);
        });
    }, 
    components:{
        'dog-form':DogForm
    },
    methods:{
        editDogClick(dog:Dog)
        {
            this.editDog={...dog};
        },
        async saveDog(dog:Dog,)
        {
            const dogIndex = this.dogs.findIndex(d=>d._id===dog._id);
            await Store.update(dog, this.dogs[dogIndex].name);
            this.dogs[dogIndex]={...dog};
        }
    }

});
</script>

<style>

</style>