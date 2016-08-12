/*
 * Простые параметризированые типы
 * Optional
 */

/*
 * Задача :
 * 1. Создать метод, который позволит взять часть объекта, 
 *    заданую путем из названий полей.
 *
 *    Пример:
 *    Файл pkgsInfo.js. Объекты из массива pkgs.
 *    
 * 2. Создать метод, который возвращает сообщение об ошибке, 
 *    если тип пакетa - callback, интерфейс - 'chat', 
 *    и поле error существует.
 *
 *    P.S. Интерфейс задается вторым элементов в массиве,
 *    который хранится в поле типа пакета.
 *    
 * P.S. Корректно обрабатывать отсутсвие нужных полей у объекта.
 * Так как это вполне естественно. Пакеты могут быть 
 * разных типов и соответсвенно иметь или не иметь характерные 
 * для этих типов поля.
 *
 */

/*
 * Определим функцию, которая будет возвращать поле объекта,
 * если пришел объект, или null в ином случае
 *
 */
function getField(obj, fieldname) {
  return typeof obj === 'object'
       ? obj[fieldname]
       : null;
}

/*
 * Эта функция поможет решить 1 задачу c помощью reduce
 * практически божественным способом
 *
 */

// path - ['callback', '1']
// path - ['error', '1']
function getByPath(path) {
  let fieldnames = path.split('.');
  return fieldnames.reduce(getField, this);
}

/*
 * Проблемы начинаются уже здесь. 
 * Допустим, что мы передаем в пакете поле со значением null. 
 * Его логическое значение отличается от undefined.
 * Несмотря на это вызовы getByPath c такими аргументами 
 * дадут одинаковый результат:
 *   getByPath.call({ field: null }, 'field');
 *   getByPath.call({}, 'field');
 * Это урезает наш функционал: null мы не способны обрабатывать.
 * Ладно, поехали дальше
 *
 */

/*
 * Для реализации 2 задачи нужно будет проверять все
 * значения на null, а затем только их использовать
 *
 */

function getErrMessage() {
  let interfaceName = this.getByPath('callback.1');
  if (interfaceName !== null && interfaceName === 'chat') {
    let errorMessage = this.getByPath('error.1');
    if (errorMessage !== null) {
      return errorMessage;
    }
  }
  return null;
}

/*
 *  Отличная работа! 
 *  Больше проверок на null Богу императивного программирования!
 *  При этом мы решаем такую простую задачу, 
 *  как взять одно поле, если второе равно 'chat'.
 *  В итоге, чем больше действий необходимо сделать - 
 *  тем больше проверок мы совершим.
 *
 */

/*
 * Посмотрим на пример решения этой задачи 
 * с помощью монады Optional.
 *
 * Напишем функцию getFieldM, которая будет первым аргументом 
 * принимать Optional, который может быть Just или Nothing.
 *
 */

let { Nothing, Just , doM } = require('./optional');

function getFieldM(objM, fieldname) {
  return objM.bindM(obj => typeof obj === 'object'
                         ? new Just(obj[fieldname])
                         : new Nothing());
}

/*
 * Reduce теперь берет getFieldM, как функцию свертки и
 * также необходимо обернуть this, чтобы он стал Optional.
 *
 */

// path - ['callback', '1']
// path - ['error', '1']
function getByPathM(path) {
  let fieldnames = path.split('.');
  return fieldnames.reduce(getFieldM, new Just(this));
}

/*
 * А сейчас самое главное: перепишем нашу основную задачу 
 * с помощью методов связки монад (bindM, appendM).
 *
 */

function getErrMessageM() {
  return this.getByPathM('callback.1')
    .bindM( interfaceName => interfaceName === 'chat'
                             ? new Just(interfaceName)
                             : new Nothing())
    .appendM(this.getByPathM('error.1'));
}

function getErrMessageDoM() {
  let obj = this;
  return doM((function* () {
    let interfaceName = yield obj.getByPathM('callback.1');
    return interfaceName === 'chat'
         ? obj.getByPathM('error.1');
         : new Nothing();
  })());
}

let { pkgs } = require('./pkgsInfo');
pkgs.forEach(pkg => {
  pkg.__proto__ = { 
    getByPath,
    getByPathM,
    getErrMessage, 
    getErrMessageM, 
    getErrMessageDoM
  }
});

console.log('getErrMessage:');
pkgs.forEach(pkg => console.log(pkg.getErrMessage()));
console.log('getErrMessageM:');
pkgs.forEach(pkg => console.log(pkg.getErrMessageM()));
console.log('getErrMessageDoM:');
pkgs.forEach(pkg => console.log(pkg.getErrMessageDoM()));

