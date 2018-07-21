# inst.js
## A minimalist, zero-dependent, easy to use framework that requires no configuration.

### Usage
```html
<head>
    ...
</head>

<body>
    <!-- This tag is compiled into a <div> with the content of the given function. -->
    <!-- The style is globalized. -->
    <comp func([1, 2, 3]) style="border: 1px solid #000"></comp>

    <script>
        // This is just an example function/component
        function func(numbers) {
            return numbers.map(number => `<h1>This is number ${number}.</h1>`).join("");
        }
    </script>
    <script src="path/to/inst.js"></script>
</body>
```

### That turns into this:
```html
<head>
    ...
    <style>div[class="__inst_comp__"][key="0"]{border: 1px solid #000}</style>
</head>

<body>
    <div class="__inst_comp__" key="0">
        <h1>This is number 1.</h1>
        <h1>This is number 2.</h1>
        <h1>This is number 3.</h1>
    </div>

    <script>
        function func(numbers) {
            return numbers.map(number => `<h1>This is number ${number}.</h1>`).join("");
        }
    </script>
    <script src="path/to/inst.js"></script>
</body>
```

The only function this framework has is "`inst()`".<br>
When called, all `<comp>` elements are transformed into divs and there is an object/component created behind the scenes.
<br><br>
Each time, "`inst()`" is called, the components will be updated.
<br>
`inst()` is automatically called on load. You could add your own eventlisteners or updaters if you want.
<br>
The first "render" with `inst()` will take longest. If inst is called multiple times, the render time will decrease.
<br><br>
#### The example above takes about .6ms to to render the first time. The second time takes around .2ms and the third time only takes .09ms
Concluding - inst.js is fairly fast.