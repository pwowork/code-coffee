<template>
<form @submit.prevent @submit="$emit('dog-save', dog)">
    <div class="form-group">
    <input type="hidden" id="dog-id"/>
    <label for="dog-name">Name:</label>
    <input type="text" minlength="3" maxlength="20" class="form-control" id="dog-name" aria-describedby="name-help" required
        v-model="dog.name">
    <small id="name-help" class="form-text text-muted">Enter the dog name.</small>
    </div>
    <div class="form-group">
    <label for="dog-age">Age:</label>
    <input type="number" min="0" max="20" class="form-control" id="dog-age" aria-describedby="age-help" required
        v-model="dog.age">
    <small id="age-help" class="form-text text-muted">Enter the dog age.</small>
    </div>
    <div class="form-group">
    <label for="dog-description">Description:</label>
    <textarea minlength="50" maxlength="1000" cols="15" rows="10" class="form-control" 
            id="dog-description" aria-describedby="description-help" required
            v-model="dog.description"></textarea>
    <small id="description-help" class="form-text text-muted">Describe the dog in the couple of sentences.</small>
    </div>
    <div>
        <button type="submit" class="btn  btn-success" >Save</button>
    </div>
</form>                 
</template>

<script lang="ts">
import {Dog} from "../shared/interfaces";
import {defineComponent, PropType} from "vue";

export default defineComponent({
    name:"dog-form",
    props:{
        dog:{
            type:Object as PropType<Dog>,
            default:()=> {
                return {
                    name:'Enter the name',
                    age:0,
                    _id:1,
                    description:"enter short description"
                }
            }
        }
    }
});
</script>

<style>

</style>