module.exports = {
    type: "React",
    // 服务器端口地址
    serverPort: 8765,
    // helper 路径
    registerHelper: "wtmfront/registerHelper",
    // 模板路径
    template: "wtmfront/template",
    // 菜单写入 文件
    subMenu: "src/subMenu.json",
    // 生成组件存放路径
    containers: "src/containers",
    // api 地址
    apiUrl: "http://118.24.147.230:8000",
    // swagger doc 地址
    swaggerDoc: "http://118.24.147.230:8000/v2/api-docs",
    // 规范 接口
    include: {
        // 列表搜索
        search: {
            name: "search",
            method: "post"
        },
        // 详情
        details: {
            name: "get/{id}",
            // name: "get/{**}",
            method: "get"
        },
        // 插入
        insert: {
            name: "add",
            method: "post"
        },
        // 修改
        update: {
            name: "edit",
            method: "post"
        },
        // 删除
        delete: {
            name: "delete",
            method: "post"
        },
        // 导入
        import: {
            name: "import",
            method: "post"
        },
        // 导出
        export: {
            name: "export",
            method: "post"
        },
        // execl 模板
        template: {
            name: "template",
            method: "post"
        }
    },
    // 公共接口地址
    public: [
        
    ],
    // 排除
    exclude: [
       
    ]
}