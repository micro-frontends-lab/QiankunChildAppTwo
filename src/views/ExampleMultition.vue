<!-- @micro example: 多例模式 -->
<template>
    <div class="ExampleMultition">
        <p class="ivu-mb">{{name}} 多例示例</p>
        <Form ref="formInline">
            <FormItem>
                <Input type="text" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import { name } from '../../package.json'
    export default {
        name: 'ExampleMultition',
        data () {
            return {
                name: name
            }
        }
    }
</script>
