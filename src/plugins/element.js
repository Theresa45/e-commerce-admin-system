import Vue from "vue";
// 按需引入ElementUI组件
import { Button, Form, FormItem, Input, Message, MessageBox } from "element-ui";

Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
