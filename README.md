#Bienvenidos al curso de Angular!

Tienes preguntas? [Crea un issue](https://github.com/eloytoro/ngCourse/issues/new)

Ya sabes conceptos basicos? Revisa

* [fgPractices](https://github.com/eloytoro/fgPractices)
* [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)
* [ui.router](https://github.com/angular-ui/ui-router)

Para correr este demo usa

```
git clone https://github.com/eloytoro/ngCourse.git
cd ngCourse
npm install
gulp serve
```

Para conectarlo con el servidor necesitas [todo-backend](https://github.com/eloytoro/todo-backend)

##Que es Angular?
+ Front-End framework
+ Orientado a componentes
+ Separado en modulos
+ Comunicación asíncrona
+ Diseño para trabajo colaborativo
+ Expandible

##Por qué Angular?
+ Aplicación web interactiva
+ Comunicación con un API RESTful
+ Comunidad extensa / Gran cantidad de plug-ins.
+ Ordenado y estructurado

---

##MVC _(Model/View/Controller)_
Data que provee el servidor (Modelo)
```json
{
    "email": "etoro@4geeks.com.ve",
    "name": "Eloy Toro"
}
```
Vista de Front
```html
<p>
    Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
</p>
```
Controlador
```javascript
.controller(function ($scope) {
    $scope.user = data;
});
```
Resultado
> Conectado como **Eloy Toro** / _etoro@4geeks.com.ve_

---

#Primera aplicación de angular

```javascript
angular.module('app', []) // Definición de módulo de angular

.controller('MyController', function ($scope) {
    // Modelo a utilizar
    $scope.user = {
        name: "Eloy Toro",
        email: "etoro@4geeks.com.ve"
    };
});
```
```html
<!-- El modulo principal de nuestra aplicación se llama 'app' -->
<body ng-app="app">
    <!-- El controlador 'MyController' opera dentro del div en el que es definido -->
    <div class="container" ng-controller="MyController">
        <p>
            Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
        </p>
    </div>
</body>
```

---

#Scopes

Angular separa el scope de los distintos controladores tanto a nivel de lógica como a nivel de DOM.
```javascript
angular.module('app', []) // Definición de módulo de angular

.controller('MyController', function ($scope) {
    $scope.user = {
        name: "Eloy Toro",
        email: "etoro@4geeks.com.ve"
    };
})

.controller('OtherController', function ($scope) {
    $scope.user = {
        name: "Rigoberto",
        email: "rigoberto@4geeks.com.ve"
    };
});
```

---

```html
<!-- El modulo principal de nuestra aplicación se llama 'app' -->
<body ng-app="app">
    <!-- El controlador 'MyController' opera dentro del div en el que es definido -->
    <div class="container">
        <div class="row" ng-controller="MyController">
            <!-- scope del controlador 'MyController' -->
            <p>
                Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
            </p>
        </div>
        <div class="row" ng-controller="OtherController">
            <!-- scope del controlador 'OtherController' -->
            <p>
                Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
            </p>
        </div>
    </div>
</body>
```
Angular usa _block scope_ para diferenciar los diferentes scopes en tu aplicación, muy parecido a como lo hace javascript en su estructura de código.

---

#Servicios

Angular provee una serie de herramientas que aportan a la lógica de una aplicación

##Usando un servicio

En nuestro controlador
```javascript
.controller('MyController', ['$scope', '$http', function ($scope, $http) {
    $http({
        url: 'api/users/',
        method: 'get',
    }).success(function (data) {
        console.log(data);
    });
}]);
```

---

##Servicios Comunes
* $http
* $q
* $location
* $element
* _[Documentación de Servicios](https://docs.angularjs.org/api/ng/service)_

##Declarando tus servicios
Normalmente los servicios se usan para crear lógica que muchos componentes de la aplicación necesitan y comparten

---

```javascript
.service('Errors', function () {
    this.parse = function (msg) {
        switch (msg) {
            case 'InvalidCredentials': return 'Usuario o contraseña incorrecta';
            case 'InvalidAction': return 'Acción no Válida';
        }
    };
    this.log = function (msg) {
        console.log(this.parse(msg));
    };
});
```
Uso en el controlador
```javascript
.controller('MyController', function ($scope, $http, Errors) {
    $http({
        url: 'api/users/',
        method: 'get',
    })
    .success(function (data) { /*...*/ })
    .error(function (data) {
        console.log(Errors.parse(data.msg));
    });
});
```

---

##Inyección de dependencias

Los controladores (y otros componentes de angular) usan solo un subconjunto de todos los recursos disponibles, el desarrollador debe declarar programaticamente cuales se usaran usando la sintaxis de _dependency injection_.

```javascript
['$http', 'MyService', '$scope', function ($http, MyService, $scope) {
    /* ... */
}]
```

Angular tambien detecta cuales servicios se estan inyectando a la hora de instanciar componentes, asi que la notacion se puede simplificar mas aun.

```javascript
function ($http, MyService, $scope) {
    /* ... */
}
```

Pero en este caso el codigo no puede ser minificado, se deben usar herramientas que _anoten_ dependencias antes de pasar por el proceso de minificación

---

#Factories

Los componentes de tipo `factory` imitan el patron de diseño que va por el mismo nombre.

```javascript
.factory('User', function () {
    var constructor = function (name, birthday) {
        this.name = name;
        this.birthday = birthday;
    };
    constructor.age = function () {
        var total = new Date(Date.now() - this.birthday.getTime());
        return Math.abs(total.getUTCFullYear() - 1970);
    };
    return constructor;
});

// en el controller...

.controller('MyCtrl', function (User) {
    var eloy = new User('Eloy', new Date(1993, 2, 13));
    eloy.age() // => 22
});
```

---

#Directivas

Las directivas son una de las herramientas mas útiles y poderosas que Angular ofrece.
+ Altamente reutilizables
+ Ordenan el DOM
+ Separan la aplicación por componentes

---

```javascript
angular.module('app', [])

.directive('myButton', function () {
    return {
        restrict: 'E', // especifica que esta directiva es un Elemento de HTML
        template: '<button class="btn">Click Me</button>'
        // or
        templateUrl: 'path/to/directive.html'
    };
});
```
```html
<div class="container">
    <!--  El nombre de la directiva cambia de myButton a my-button -->
    <my-button></my-button>
</div>
```
El resultado seria
```html
<div class="container">
    <my-button>
        <button class="btn">Click Me</button>
    </my-button>
</div>
```

---

##Otras opciones
+ `restrict`: `'E'` para elementos como mostrado en el ejemplo, `'A'` para atributos (asi como lo es `href` o `class`) o `'EA'` para ambas.
+ `replace`: `true` en caso que se desee que se borre el nombre de la directiva una vez compilado el DOM (es `false` por defecto)
+ `transclude`: `true` permite que dentro de los delimitadores de la directiva exista contenido (`false` por defecto)
+ `template`: Describe el html de la directiva inline
+ `templateUrl`: El html de la directiva como archivo en tu aplicación (Recomendado)
+ `controller`: Las directivas pueden instanciar o usar controladores.
+ `link`: Callback ejecutado cuando la directiva se carga en el DOM
+ `scope`: Determina si la directiva crea su propio scope o genera el propio a partir del scope padre.
El formato con el que se crea el scope es:

```javascript
scope: {
    // valor del scope: como lo obtiene
    text: '=text'
}
```

```html
<my-button text="buttonText"></my-button>
```

---

Existen 3 distintas maneras de obtener valores del scope del padre en la directiva.

* `'='` - Obtiene el valor directamente del scope del padre.
* `'@'` - Es simplemente un string puesto en el campo.
* `'&'` - Evalua la _expresión angular_ en el campo.

```javascript
scope: {
    text: '=',
    icon: '@',
    onclick: '&'
}
```

```html
<my-button
    text="buttonText" <!-- variable en el scope -->
    icon="fa-plus" <!-- el string sin evaluar -->
    onclick="clicked = true" <!-- expresion sin evaluar -->
>
</my-button>
```

---

##Link

El proceso de enlace de la directiva sucede despues de que la directiva es compilada y es mostrada en el DOM, el callback tiene una firma que provee al desarrollador herramientas que puede usar para generar lógica de la directiva solo posible despues de que esta es enlazada.

```javascript
link: function (scope, element, attrs, ctrl, transclude) {

}
```

* `scope` - El scope interno de la directiva.
* `element` - Elemento JQuery de la directiva despues de compilada.
* `attrs` - Objeto con los atributos HTML y sus valores pasados a la directiva.
* `ctrl` - Controlador propio de la directiva.
* `transclude` - Método para compilar el contenido interno de elemento de la directiva.

---

##Directivas predefinidas
Angular ofrece un conjunto de directivas predefinidas que tienen comportamientos especiales.
* `ng-model="value"` - Crea un _two way data-binding_ entre el controlador y la directiva, esto quiere decir que si el valor que resguarda es modificado en alguno se ve reflejado en el otro, normalmente usado sobre `<input>`

```html
<input type="text" ng-model="user.name">
```

* `ng-repeat="value in values"` - Puede entenderse como in `for value in values` ya que itera sobre el arreglo dado, creando un _child scope_ por cada iteracion que contiene el valor del arreglo dentro de el

```html
<p ng-repeat="user in users">
    <strong>{{ user.name }}</strong> - <i>{{ user.email }}</i>
</p>
```

Tendria como resultado

> **Eloy Toro** - _eloytoro@4geeks.com.ve_

> **Rigoberto** - _rigoberto@4geeks.com.ve_

---

Representación gráfica de la estructura de scopes en un DOM

![scopes](img/concepts-scope.png)

_Imagen de los docs de [Scope](https://docs.angularjs.org/guide/scope)_

---

* `ng-show="value"` `ng-hide="value"` - Muestra u oculta el elemento dependiendo del valor booleano pasado por parametro.

```html
<div ng-show="isVisible"></div>
```

* `ng-class="{ class: value }"` - Agrega clases al elemento dependiendo de los valores booleanos que cada clase tiene.

```html
<button ng-class="{ active: isActive, error: hasError }"></button>
```

---

#Eventos

Angular tiene un sistema de propagación de eventos que facilita la comunicación entre diferentes scopes.
Cada scope tiene un API para poder propagar o escuchar eventos
* `$scope.$on(event, callback)` - Ejecuta el callback cuando el evento es atajado.
* `$scope.$broadcast(event, params)` - Propaga un evento hacia scopes hijos pasando parametros.
* `$scope.$emit(event, params)` - Igual que _broadcast_ pero hacia scopes padres.
* `$scope.$watch(expression, callback)` - Ataja cambios sobre valores en el scope.

---

Cabe destacar que la jerarquía de scopes en angular es similar a la de un árbol, todos los scopes son hijos de `$rootScope` el cual puede ser inyectado como un servicio, toda propiedad existente en este scope especial sera heredada por sus hijos, todos los _broadcasts_ que genere este scope llegarán a todos los scopes y todos los _emits_ serán atajados por este scope.

```javascript
$scope.$broadcast('UserLogin', {
    username: 'eloy',
    password: '12345'
});

$scope.$on('UserLogin', function (event, user) {
    /* ... */
});
```

Y para revisar cambios sobre propiedades del scope

```javascript
$scope.$watch('title', function () {
    console.log($scope.title);
});
```

---

#Filtros

Los filtros sirven para modificar y/o parsear data en el DOM a tiempo real de una manera limpia y estructurada

```javascript
.filter('caps', function () {
    return function (input) {
        return input.toUpperCase();
    };
})
```

```html
<p> Mi nombre es {{ user.name | caps }}</p>
```

Resultaria en

> Mi nombre es ELOY

Los filtros tambien pueden tomar parametros, se separan por `:` en el DOM

---

##Filtros pre-definidos

* `date:format` - Existe para mostrar objetos `Date` en el DOM usando el formato especificado (asi como `'dd/MM/yyyy'`)
* `json`
* `currency:symbol:fraction` - Para convertir números en moneda (`currency:'Bs':0`)
* [Documentación de filtros](https://docs.angularjs.org/api/ng/filter)

##Filtros sobre arreglos

* `limitTo:limit:begin`
* `orderBy:expression:reverse`
* `filter:expression:comparator`
