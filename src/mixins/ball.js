import { moreUnit,addToCark } from '@/api/newService';
export default {
    data() {
        return {
            showMoveDot : [], //控制下落的小圆点显示隐藏
            windowHeight: null, //屏幕的高度
            windowWidth : null,
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
        }
    },
    mounted(){
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        if(typeof(this.cubic) === 'undefined') {
            this.cubic = '0.49, -0.29, 0.75, 0.41';
        }
    },
    methods : {
        // 无多规格加入购物车
        showMoveDotFun(showMoveDot,elLeft,elBottom,shop) {
            if(shop.number === undefined) {
                shop.number = 1;
                shop.check = true;
            }
            this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
            this.elLeft = elLeft;
            this.elBottom = elBottom;
            this.shopImg = shop.img;
            // 加入本地缓存
            this.carkLocal(shop);
        },
        // 多规格
        async showMoveUnits(shop) {
            if (!shop.goods_id) {
                shop.goods_id = shop.id;
            }
            let data = await moreUnit({ id: shop.goods_id}),
                arr = [],
                obj;
            data.forEach(e => {
                let obj = {
                    "goods_name" : e.name,
                    "goods_id" : e.id,
                    "price" : e.price,
                    "newprice" : shop.newprice,
                    "goods_unit" : e.goods_unit,
                    "img" : e.img,
                    "tag" : shop.tag,
                    "number" : 1,
                    "check" : true,
                    "description" : shop.description,
                    "is_multi_type" : 0,// 多规格
                    "oss" : e.oss,
                    "limit" : shop.limit,
                    "is_activity" : shop.is_activity,
                    "is_coupon" : shop.is_coupon
                }
                arr.push(obj);
            })
            this.$emit('getPop',arr);
        },
        beforeEnter(el){
            el.style.webkitTransform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;
            el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;

            el.children[0].style.webkitTransform = `translate3d(${this.elLeft - 30}px,0,0)`;
            el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;

            el.children[0].style.opacity = 0;
            el.children[0].style.backgroundImage = `url(${this.shopImg}?x-oss-process=image/resize,w_50/format,jpg/quality,Q_80)`;
            el.children[0].style.backgroundSize = "100% 100%";
        },
        afterEnter(el){ 
            el.style.webkitTransform = `translate3d(0,0,0)`;
            el.style.transform = `translate3d(0,0,0)`;

            el.children[0].style.webkitTransform = `translate3d(${this.endX},0,0)`;
            el.children[0].style.transform = `translate3d(${this.endX},0,0)`;

            el.style.webkitTransition = `transform 0.5s cubic-bezier(${this.cubic})`;
            el.style.transition = `transform 0.5s cubic-bezier(${this.cubic})`;

            el.children[0].style.webkitTransition = 'transform 0.5s ease-out';
            el.children[0].style.transition = 'transform 0.5s ease-out';
            
            this.showMoveDot = this.showMoveDot.map(item => false);
            el.children[0].style.opacity = 1;

            el.children[0].addEventListener('webkitTransitionEnd', () => {
                this.listenInCart();
            })
            el.children[0].addEventListener('transitionend', () => {
                this.listenInCart();
            })

            el.children[0].addEventListener('webkitAnimationEnd', () => {
                this.listenInCart();
            })
            el.children[0].addEventListener('animationEnd', () => {
                this.listenInCart();
            })
        },
        //监听圆点是否进入购物车
        listenInCart(){
            this.$emit('ballOver');
        },
        //  购物车本地缓存
        carkLocal(obj) {
            if(this.$store.state.isLogin) {
                if (!this.$store.state.isBindPhone) {
                    this.$store.state.isShowBindPhone = true;
                }else {
                    addToCark({
                        goods_id : obj.goods_id,
                        user_id : localStorage.userId
                    }).then(res=> {
                        if (res.message != "") {
                            this.$toast(res.message);
                        }
                        this.$store.state.shopCarkLenth = res.number
                    })
                }
            }else {
                let count = 0;
                if (localStorage.ShoppingCart && localStorage.ShoppingCart !== '[]') {
                    let arr = JSON.parse(localStorage.ShoppingCart),
                        isRepeat = false;
                    arr.forEach(element => {
                        if (element.goods_id === obj.goods_id) {
                            isRepeat = true;
                        }
                    });
                    if( isRepeat ) {
                        let index = arr.findIndex(v => {
                            return v.goods_id === obj.goods_id
                        })
                        if (index != -1) {
                            arr[index].number ++;
                        }
                    }else {
                        arr.push(obj);
                    }
                    localStorage.ShoppingCart = JSON.stringify(arr);
                }else {
                    let arr = [];
                    arr.push(obj);
                    localStorage.ShoppingCart = JSON.stringify(arr);
                }
                JSON.parse(localStorage.ShoppingCart).forEach(element => {
                    count += element.number;
                })
                this.$store.state.shopCarkLenth = count;
            }
        }
    }
}