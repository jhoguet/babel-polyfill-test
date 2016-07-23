# babel-polyfill-test

This repo demonstrates a conflict between `babel-polyfill` and `aurelia-polyfills`

To reproduce, download this repo and start a web server at the root

    python -m SimpleHTTPServer 8001
    open http://localhost:8001/
    
In chrome, you can see the success case

![](https://www.evernote.com/shard/s169/sh/8a81d3fe-c7c3-4470-96e5-39ed585a81fb/cdf5d73e85e56bb391cd633ad7ef22ed/deep/0/192.168.1.113-8002.png)

And in IE 11 you can see the failure

![](https://www.evernote.com/shard/s169/sh/05f2ba4f-0e0d-43f0-a15e-eb05ae8ee377/2a5c24597665dcbcc326c9bb36017eda/deep/0/IE11---Win7--Running-.png)

I have concluded that `aurelia-polyfills` has to run first and `babel-polyfill` `Map` ends up calling into `aurelia-polyfills` `Collection` in a way causes an infinite loop in `aurelia-polyfills`. 

I haven't pin pointed exactly where the bug is or which repo is responsible, but I have made an observation

* `aurelia-polyfills` `Collection` appears to assume the constructor is `Collection` and if it is not it tries to correct it ([src](https://github.com/aurelia/polyfills/blob/master/dist/commonjs/aurelia-polyfills.js#L605)) (but sometimes it is `Map` from `babel-polyfill`) [src](https://github.com/zloirock/core-js/blob/master/modules/es6.map.js#L5). 

## Next Steps  
- [ ] see if anyone on aurelia-polyfills has seen this / has ideas
- [ ] see if anyone on babel-polyfill has seen this / has ideas
- [ ] see if I can isolate it to the `Map` polyfill on the babel side that is conflicting with the aurelia side
- [ ] see if aurelia is polyfilling `Map` (I assume it is) and why babel is also trying to polyfill it
- [ ] assess work arounds
