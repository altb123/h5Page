const formList = [
    {
        label: '姓名',
        prop: 'name',
        type: 'input',
        rules: [
            { required: true, message: '不能为空' },
        ]

    },
    {
        label: '电话',
        prop: 'phone',
        type: 'input',
        rules: [
            { required: true, message: '不能为空' },
            { type: 'number', message: '请输入正确的电话号码', trigger: 'blur'},
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584])\d{9})$/, message: '请输入正确的电话号码',trigger: 'blur'},
        ]
    },
    {
        label: '邮箱',
        prop: 'email',
        type: 'input',
        rules: [
            { required: true, message: '不能为空' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
        ]
    },
    {
        label: '地址',
        prop: 'address',
        type: 'input'
    },
    {
        label: '提交',
        prop: 'submit',
        type: 'button',
        url: ''
    }
];

export {
    formList
}