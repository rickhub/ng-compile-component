# ng-compile-component
> A simple AngularjS component for compiling components dynamically.

This component allows you to render components dynamically into your views, based on their name. To pass attributes you simply define an object with the properties required by the target-component's bindings. Check out the example below for getting started.

---

### Install (npm)
```shell
npm i ng-compile-component
```

---

### Include `module.js`
Only if not included already.
```html
<script src='./node_modules/ng-compile-component/src/module.js'></script>
```

### Include `ng-compile-component.js`
```html
<script src='./node_modules/ng-compile-component/src/ng-compile-component-service.js'></script>
<script src='./node_modules/ng-compile-component/src/ng-compile-component.js'></script>
```

### Add the dependency
```javascript
angular.module('app', ['rckd.utils']);
```
Now you are ready to rumble!

---
# Usage
`<ng-compile-component component='=' bindings='='>`

Attributes:

> `component`
> Contains the name of the target-component (i.e. "myFancyComponent" or "my-fancy-component")

> `bindings`
> An object which represents the bindings of the target-component.

### Example

Inside of your component's controller:
```javascript
this.component = 'message-box';
this.bindings = {
    title: 'Hey',
    message: 'You wanna compile something?',
    buttons:{
        no: true
        yes: true
    }
};
```

Inside of your html:
```html
<ng-compile-component
    component='$ctrl.component'
    bindings='$ctrl.bindings'
></ng-compile-component>
```

This results in:
```html
<message-box
  title='{{ $ctrl["title"] }}'
  message='{{ $ctrl["message"] }}'
  buttons='$ctrl["buttons"]'
></message-box>
```
---

Define values inline:
```html
<ng-compile-component
    component='"message-box"'
    bindings="{
      title: 'Hey',
      message: 'You wanna compile something?',
      buttons:{
        yes: true,
        no: tru
      }
    }"
></ng-compile-component>
```
