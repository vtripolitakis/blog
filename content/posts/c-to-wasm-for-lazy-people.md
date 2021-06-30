---
title: "C to Wasm for Lazy People"
date: 2021-06-26T21:46:18+03:00
draft: false
---
## export C functions to WebAssembly for lazy people
#### 2021-06-24 - Vangelis Tripolitakis (vtripolitakis@_DONTSPAMME_me.com)

0. I suspect you've already have Emscripten (https://emscripten.org/) installed.
1. Make sure, you've included the proper paths, so you can issue `emcc` from command line. If not sure, visit Emscripten's documentation and see how it's done. (tip: `source emsdk_env.sh` on your Emscripten installation folder - I assume you use bash).
2. OK. First, create C file. Name it with something unique, like `demo.c`

`demo.c` source
```C
double divide_numbers(double a, double b) {
    return a / b;
}

double multiply_numbers(double a, double b) {
    return a * b;
}


int main(int argc, char** argv) {
    return -1;
}
```

3. Now you need to compile it using Emscripten's magic:  `emcc demo.c  -o "myfuncs.js" -s EXPORTED_FUNCTIONS='["_multiply_numbers", "_divide_numbers"]' -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' -s MODULARIZE=1 -s 'EXPORT_NAME="moduleFactory"'`. Let's elaborate a bit on this. This code creates two files named `myfuncs.js` and `myfuncs.wasm`. The actual WebAssembly code is inside the `wasm` file (oh really?). The Javascript file does the dirty work of loading the WebAssembly code and giving us the tools to export our functions `divide_numbers` and `multiply_numbers` on our code. Be careful to add a `_` prefix on the `EXPORTED_FUNCTIONS` array. Moreover, don't forget to instruct `emcc` to modularize the output using `-s MODULARIZE=1 -s 'EXPORT_NAME="moduleFactory"` option to output a factory method named `moduleFactory`. We'll see how this factory works on the next step.
4. Let's create an HTML page that'll demonstrate our first exploration in WebAssembly. I name it `demo.html`.

`demo.html` source
```HTML
<!doctype html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
    <script type="text/javascript" src="myfuncs.js"></script>
    <script>
      // initialize Emscripten stack and then move on :-)
      moduleFactory().then(function(Module){
        var multiplyNumbers = Module.cwrap('multiply_numbers','number',['number','number']);
        window.alert('3*4=' + multiplyNumbers(3,4));
        var divideNumbers = Module.cwrap('divide_numbers','number',['number','number']);
        window.alert('3/4=' + divideNumbers(3,4));
      })
    </script>
  </body>
</html>
```
5. So as you may infer from the code above, the `moduleFactory` module factory is loaded when we include the `myfuncs.js` Emscripten interfacing file. Next, we handle `moduleFactory`'s promise which returns a  `Module` object containing two methods named `cwrap` and `ccall` which do the dirty work of exposing our exported functions or running them directly, respectively. I use `cwrap` as I think its style is a bit cleaner, according to my taste. In short the syntax is `var myFunctionName = Module.cwrap('function_name_without_dash', 'output_type', ['argument_types'])`. In our case, we export a function named `multiply_numbers` which returns a `number` (it's JS no number types, don't forget), takes as input two arguments of type `number`, and assign it into the `multiplyNumbers` function.
6. Now you think we're done. Forget it. Modern browsers will complain if you try to access `demo.html` using `file://` protocol (yeap it's CORS). You need to serve it madame/sir! So Python comes to the rescue. Just issue `python3 -m http.server` or for Python2 `python -m SimpleHTTPServer` and point to `http://localhost:8000/demo.html` and have fun. I assume you issued those commands on the same directory containing `demo.html`, `myfuncs.js` and `myfuncs.wasm`.
7. Enjoy!


