<template>
    <div class="search">
        <select name="search" id="" @change="optionChange">
            <option :value="option" v-for="(option, index) in options" :key="index" >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    methods: {
        optionChange(event) {
            let value = event.target.value
            let index = this.options.indexOf(value)
            this.$emit('option-change', index)
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search
    display : inline-block
    select
        font-size: 16px

</style>