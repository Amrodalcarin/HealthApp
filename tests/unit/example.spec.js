import { mount } from "@vue/test-utils";
import UserCard from "@/components/user-card.vue";
import Vuetify from 'vuetify';
const localVue = require('vue')
localVue.use(Vuetify)

describe("UserCard.vue", () => {
  it("render username", () => {
    const wrapper = mount(UserCard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
