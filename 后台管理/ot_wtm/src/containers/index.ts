export default {
    editer: () => import('./editer').then(x => x.default),
    /**WTM**/ 
    test: () => import('./test').then(x => x.default)
    /**WTM**/ 
}