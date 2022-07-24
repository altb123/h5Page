/**
 * @description 深拷贝(数组/对象)
 * @param {Object/Array} 传入参数
*/
const deepClone = (copyData: any) => {
    const targetObj: any = copyData.constructor === Array ? [] : {}; // 先给定一个容器

    for(const key in copyData) { // 遍历数据
        // if(copyData.hasOwnProperty.call(key)) { // 容错处理
        if(copyData[key] && typeof(copyData[key]) === 'object') {
            targetObj[key] = deepClone(copyData[key]);
        } else {
            targetObj[key] = copyData[key];
        }
        // }
    }
    return targetObj;
}

/**
 * 公共图库
*/
const PictureList = [
    {
        name: '七怪1.jpeg',
        src: `七怪1.jpeg`
    },
    {
        name: '七怪2.jpeg',
        src: `七怪2.jpeg`
    },
    {
        name: '唐三1.jpeg',
        src: `唐三1.jpeg`
    },
    {
        name: '唐三2.jpeg',
        src: `唐三2.jpeg`
    },
    {
        name: '小舞.jpeg',
        src: `小舞.jpeg`
    },
    {
        name: '戴沐白.jpeg',
        src: `戴沐白.jpeg`
    },
    {
        name: '朱竹清.jpeg',
        src: `朱竹清.jpeg`
    },
    {
        name: '奥斯卡1.jpeg',
        src: `奥斯卡1.jpeg`
    },
    {
        name: '奥斯卡2.jpeg',
        src: `奥斯卡2.jpeg`
    },
    {
        name: '宁荣荣1.jpeg',
        src: `宁荣荣1.jpeg`
    },
    {
        name: '宁荣荣2.jpeg',
        src: `宁荣荣2.jpeg`
    },
    {
        name: '马红俊.jpeg',
        src: `马红俊.jpeg`
    }
];

export {
    deepClone,
    PictureList
}