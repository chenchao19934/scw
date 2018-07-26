import Mock from 'mockjs';
const Random = Mock.Random;

const produceNewsData = function () {
    let articles = Mock.mock({
        "array":[
            "北京市",
            "天津市",
            "河北省",
            "山西省"
        ]
    })
    return {
        articles
    }
}

Mock.mock('/public/news/index', 'get', produceNewsData);