// Jonas Karg

// Intentional usege of "var" - the state can be
// modified or replaced at any point in time.
const __inst_style_elem = document.createElement("style");
document.head.appendChild(__inst_style_elem);
var __inst_state = {
    components: []
};

function inst() {
    let p = performance.now();
    const comps = [];

    if (typeof __inst_state !== "object" || __inst_state.components.constructor !== Array) {
        console.warn(Error(`(inst.js):\n  --> Invalid/undefined state-container "__inst_state".\n  --> Creating new one.`));
        __inst_state = { components: [] };
    }

    // New components
    let elements = Array.from(document.getElementsByTagName("comp"));
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (!element.hasAttributes()) {
            let tag = element.tagName.toLowerCase();
            console.warn(Error(`(inst.js):\n  --> Useless component found.\n  --> Component will be ignored.\n|\n| <${tag}></${tag}>\n| ^\n`));
            return;
        };

        let elAttrs = Array.from(element.attributes);
        let compAttrs = [];
        let funcStop = false;
        let func = "";

        for (let i = 0; i < elAttrs.length; i++) {
            if (!funcStop && elAttrs[i].value) funcStop = true;
            if (!funcStop) func += elAttrs[i].name;
            else compAttrs.push(elAttrs[i].cloneNode());
        }

        if (!/\w*\([^\n]*\)/.test(func)) {
            console.error(Error(`(inst.js):\n  --> Invalid component-function:\n  --> Component will be ignored.\n|\n| <comp ${func} ... ></comp>\n|       ^\n`));
            return;
        };

        const template = document.createElement("div");
        template.classList.add("__inst_comp__");
        template.setAttribute("key", i)
        element.parentNode.replaceChild(template, element);

        __inst_state.components.push({
            key: __inst_state.components.length,
            func: func,
            attributes: compAttrs
        });
    }

    const globalStyleObj = {};

    for (let i = 0; i < __inst_state.components.length; i++) {
        let selector = `div[class="__inst_comp__"][key="${i}"]`;
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = eval(__inst_state.components[i].func);
            __inst_state.components[i].attributes.map(attribute => {
                // This system prevents duplicate styles.
                if (attribute.name !== "style") element.setAttributeNode(attribute);
                else {
                    if (!globalStyleObj[attribute.value]) globalStyleObj[attribute.value] = selector;
                    else globalStyleObj[attribute.value] += `,${selector}`;
                }
                // else __inst_state.components[i].style = `${selector}{${attribute.value}}`;
            });
        }
    }

    let globalStyle = "";
    let selectors = Object.values(globalStyleObj);
    let content = Object.keys(globalStyleObj);

    for (let i = 0; i < selectors.length; i++) {
        globalStyle += `${selectors[i]}{${content[i]}}`;
    }

    __inst_style_elem.innerHTML = globalStyle;

    console.log(performance.now() - p);
}

window.addEventListener("load", () => {
    inst();
    inst();
    inst();
    inst();
});
