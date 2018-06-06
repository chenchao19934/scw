<template>
  <div class="wx-register">
    <!-- Header -->
    <TheHeader title="会员注册"></TheHeader>

    <div class="wx-registerContent">
      <!-- Banner -->
      <Banner style="height: auto;">
        <img src="./image/banner.jpg"
             style="width: 100%"
             slot="bannerImg" />
      </banner>

      <RegisterForm>
        <i-field label="姓名："
                 placeholder="请输入您的姓名"
                 v-model="registerForm.name"></i-field>
        <i-radio align="right"
                 class="page-part"
                 title="性别："
                 v-model="registerForm.sex"
                 :options="sexOptions" />
        <i-field label="手机号："
                 placeholder="请输入您的手机号"
                 v-model="registerForm.phone"></i-field>
        <i-field label="验证码："
                 placeholder="输入验证码"
                 class="wx-validCode is-valid"
                 v-model="registerForm.verificationCode"
                 v-if="$route.query.bid !== '51'">
          <i-button type="gray"
                    class="wx-validBtn is-valid"
                    @click="onSendMsgCodeRegister()">{{!registerHasSend ? '获取验证码' : '再次发送(' + registerCodeTime + ')'}}</i-button>
        </i-field>

        <div class="btn-group"
             style="padding: 0 15px;">
          <IButton style="margin-top: 30px;"
                   size="large"
                   type="red"
                   @click="submitDataRegister()">提交</IButton>
          <IButton style="margin-top: 10px;"
                   size="large"
                   type="gray"
                   @click="$router.push({ name: 'memberBindingCard' })">绑定实体卡</IButton>
        </div>
      </RegisterForm>
    </div>
  </div>
</template>

<script>
import {
  IHeader,
  Banner,
  IField,
  IButton,
  IRadio,
  TheHeader,
} from '@/components/index.js';
import RegisterForm from './RegisterForm';
import * as service from '@/api/service';
import _ from 'lodash';

export default {
  name: 'memberRegister',

  components: {
    IHeader,
    Banner,
    IField,
    IButton,
    IRadio,
    TheHeader,
    RegisterForm,
  },

  data() {
    return {
      logoPath: '',
      registerForm: {
        name: '',
        sex: '男',
        phone: '',
        verificationCode: '',
      },
      registerHasSend: false, // 是否已发送
      registerCodeTime: 60, // 倒计时时间
    };
  },

  created() {
    this.sexOptions = ['男', '女'];
    this.getMallInfo();
  },

  methods: {
    // 动态获取logo
    async getMallInfo() {
      const data = await service.getIndex({});
      this.logoPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.logo}`;
      console.log('logoPath', this.logoPath);
    },

    // 发送短信 - 注册
    async onSendMsgCodeRegister() {
      // 防止用户多次点击发送验证码
      if (this.registerHasSend) {
        return;
      }

      const regexPhone = /^1[34578]\d{9}$/; // 手机号码格式

      if (!this.registerForm.phone) {
        this.$Toast('请填写您的手机号码');
        return;
      } else if (!regexPhone.test(this.registerForm.phone)) {
        console.log('phone:', this.registerForm.phone);
        this.$Toast('请填写正确的手机号码格式');
        return;
      }

      this.registerHasSend = true;

      console.log('countDownRegister');
      this.countDownRegister();

      const data = await service.sendMsgCode({
        tel: this.registerForm.phone,
      });

      // errCode === -1时，提示改账户发送短信超出上限
      if (data.errCode === -1) {
        this.$Toast(data.errMsg);
      }
    },

    // 提交表单数据 - 注册
    submitDataRegister: _.debounce(
      async function submitDataRegister() {
        const regexName = /^[\u4e00-\u9fa5a-zA-Z]+$/; // 名字格式
        const regexPhone = /^1[34578]\d{9}$/; // 手机号码格式
        const verificationCode = /^[0-9]+$/; // 手机验证码格式

        if (!this.registerForm.name) {
          this.$Toast('请填写您的姓名');
          return;
        } else if (!regexName.test(this.registerForm.name)) {
          this.$Toast('请填写正确的名字格式');
          return;
        }

        if (!this.registerForm.phone) {
          this.$Toast('请填写您的手机号码');
          return;
        } else if (!regexPhone.test(this.registerForm.phone)) {
          this.$Toast('请填写正确的手机号码格式');
          return;
        }

        if (this.$route.query.bid !== '51') {
          if (!this.registerForm.verificationCode) {
            this.$Toast('请填写您的手机验证码');
            return;
          } else if (
            !verificationCode.test(this.registerForm.verificationCode)
          ) {
            this.$Toast('手机验证码格式错误');
            return;
          }

          if (!this.hasAgreeProto) {
            this.$Toast('请查看用户注册协议，并同意');
            return;
          }
        }

        const data = await service.getWeixinCards({
          submit: 1,
          verify: this.registerForm.verificationCode,
          userTrueName: this.registerForm.name,
          userPhone: this.registerForm.phone,
          identityCard: this.registerForm.id,
        });

        this.formDisabled = false;

        if (data.errCode === 0) {
          this.$MessageBox({
            title: '恭喜您！',
            message: '会员注册成功',
            closeOnClickModal: false,
          }).then(() => {
            if (this.$route.query.callback_url) {
              window.location.href = this.$route.query.callback_url;
              return;
            }

            this.$router.replace({ name: 'memberCenter' });
          });
        } else {
          this.$Toast(data.errMsg);
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      },
    ),

    // 倒计时 - 注册
    countDownRegister() {
      setTimeout(() => {
        this.registerCodeTime -= 1;

        if (this.registerCodeTime <= 0) {
          this.registerCodeTime = 60;
          this.registerHasSend = false;
          return;
        }
        this.countDownRegister();
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@include b(register) {
  min-height: 100vh;
  background: #ededed;

  /* 覆盖 */
  .i-field-core {
    border-radius: rem(3);
  }
  .i-cell-wrapper {
    background: none;
  }
}

@include b(registerContent) {
  padding: rem(20);
}

@include b(validBtn) {
  display: flex;
  align-items: center;

  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: rem(240);

  color: #323232;

  @include when(valid) {
    font-size: rem(24);
    height: rem(70);
  }
}

@include b(validCode) {
  @include when(valid) {
    .i-field-core {
      // width: rem(445);
      // flex: 0;
      flex-flow: 1;
      margin-right: rem(30);
    }
    .i-cell-value {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>


