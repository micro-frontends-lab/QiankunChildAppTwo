<!-- @micro example: 单例模式 -->
<template>
    <div class="ExampleSingleton ivu-p">
        <Card>
            <p class="ivu-mb">{{name}} 单例示例</p>
            <Form :label-width="80">
                <FormItem label="Input">
                    <Input placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="Select">
                    <Select>
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import { name } from '../../package.json'
    export default {
        name: 'ExampleSingleton',
        data () {
            return {
                name: name
            }
        }
    }
</script>

<style lang="sass" scoped>
    .ExampleSingleton .ivu-card
        background: #ddeaff
</style>
