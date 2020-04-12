const path = require('path')
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');
module.exports = {
    getAST: (path) => { // 将代码转为Ast（抽象语法树）        
        const content = fs.readFileSync(path, 'utf-8')
        return babylon.parse(content, {
            sourceType: 'module'
        })
    },
    getDependencis: (ast) => { // 获取ast中的import依赖文件
        const dependencis = []
        traverse(ast, {
            ImportDeclaration: ({node}) => {
                dependencis.push(node.source.value)
            }
        })
        return dependencis
    },
    transform: (ast) => { // 将ast转为浏览器可以执行的代码
        const {code} = transformFromAst(ast, null, {
            presets: ['env']
        });
        return code;
    }

}