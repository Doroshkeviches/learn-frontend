#### [Stage#1](../../) > [Clean Code S1E1](../)

# Code Quality Manual

- [Code Quality Manual](#code-quality-manual)
  - [Why?](#why)
  - [Общие подходы](#общие-подходы)
    - [1. DRY — _Don't Repeat Yourself_](#1-dry--dont-repeat-yourself)
    - [2. KISS — _keep it short simple / keep it simple, stupid_](#2-kiss--keep-it-short-simple--keep-it-simple-stupid)
    - [3. YAGNI — _You ain't gonna need it_](#3-yagni--you-aint-gonna-need-it)
    - [4. Comments](#4-comments)
      - [4.1. TODOs](#41-todos)
    - [5. Files naming](#5-files-naming)
    - [Continue](#continue)

## Why?

Легко поддерживаемый и читаемый код — это то, чего хочет любой опытный разработчик. Это код, который легко прочитать через два месяца, полгода, год и более после его написания не только автору, но и любому другому программисту. А поскольку в большинстве случаев код разрабатывается в группах, ваши товарищи по команде должны иметь возможность легко понять вашу часть приложения, не прилагая усилий для расшифровки написанной логики.

Точно так же вам будет гораздо комфортнее разбираться в чужом коде, если он написан максимально понятно и соответствует единому стилистическому стандарту, принятому в команде.

Но вы можете спросить, как правила оформления кода (например, выбор кавычек `'` или `"` и регистра букв) влияют на его читаемость?

Очень кратко: напрямую.

Немного дольше:

Когда вы пишете код в одном стиле, вы привыкаете к этому написанию. Нейроны вашего мозга мгновенно распознают, что за переменной, написанной с заглавной буквы, стоит класс, а за словом с маленькой буквы — локально изменяемая переменная. Вы также не испытываете раздражения, когда видите код, написанный другим программистом, использующим тот же стиль, и это очень важно. Чтение чужого кода само по себе не всегда является приятным занятием, но если этот код еще и вызывает раздражение... В общем, сложностей в жизни программиста и так достаточно, поэтому не стоит создавать себе дополнительные.

Еще одна причина — единый стандарт экономит время на написание кода. Вы не тратите ни минуты на размышления о том, в каком регистре назвать переменную и какой стиль написания выбрать, а пишете в соответствии с принятым стилем.

## Общие подходы

### 1. DRY — _Don't Repeat Yourself_

or **DIE** — _Duplication Is Evil_

Принцип призывает вас не повторяться при написании кода. Все, что вы пишете в проекте, должно быть определено только один раз.
Если этот принцип не соблюдать, программист будет вынужден вносить изменения в несколько повторяющихся фрагментов кода вместо одного. Кроме того, дублированный код приводит к накоплению нежелательного кода и, таким образом, затрудняет его понимание и чтение.

<details>
    <summary>
    Wanna know more!
    </summary>

**The history:**
Этот принцип был впервые упомянут в книге ["The Pragmatic Programmer" by Andrew Hunt](https://ideafix.name/wp-content/uploads/stuff/book51.pdf) (1999). Однако еще до выхода книги в свет она была широко известна и широко использовалась. При этом `The Pragmatic Programmer` точно определил принцип и дал ему название.

В книге DRY описывается как:

> Каждое знание должно иметь единственное, однозначное,
> Авторитетное представительство внутри системы.

где под «частью знаний» можно понимать функциональный, логически завершенный фрагмент кода вашего приложения или алгоритма.

</details>

**Examples:**

<details>
	<summary>
		1. CSS: Группировка селекторов
	</summary>

```css
h1 {
  color: #ff0000;
  font-family: Arial;
}
h2 {
  color: #ff0000;
  font-family: Arial;
}
h3 {
  color: #ff0000;
  font-family: Arial;
}
h4 {
  color: #ff0000;
  font-family: Arial;
}
```

Этот код можно реорганизовать с помощью группировки селекторов:

```css
h1,
h2,
h3,
h4 {
  color: #ff0000;
  font-family: Arial;
}
```

</details>

<details>
	<summary>
		2. CSS: Перемещайте повторяющиеся элементы стиля внутри классов.
	</summary>

Если один набор свойств CSS определяет стиль нескольких элементов на странице, эти элементы обычно объединяются в один класс CSS:

```css
p {
  margin-bottom: 10px;
  text-indent: 10px;
}

/* Re-used styles */
.quotation {
  font-family: "Helvetica";
  font-style: italic;
  text-indent: 20px;
}

.bold-text {
  font-weight: bold;
}
```

```html
<section>
  <h2 class="bold-text">A book</h2>
  <p>
    I don't know what to write here, but it's definitely the first paragraph.
  </p>
  <p class="quotation">«Hello world»</p>
  <p>
    I still don't know what to write here, but it's definitely the second
    paragraph.
  </p>
  <p class="quotation">«Hello world 2»</p>
  <p>Just some common bla-bla text :).</p>
</section>
```

</details>

<details>
	<summary>
		3. JS: Cycles
	</summary>

```js
// non DRY code
console.log("corn");
console.log("pita");
console.log("potato");
console.log("tortilla");
```

```js
// DRY code
const chips = ["corn", "pita", "potato", "tortilla"];

for (let i = 0; i < chips.length; i++) {
  console.log(chips[i]);
}
```

</details>

<details>
	<summary>
		4. JS: Functions
	</summary>

It is convenient to put duplicated logic into functions.

```js
const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

// non DRY code
if (weekday === "Sunday" || weekday === "Saturday") {
  console.log(`Today is ${today} so my day plan includes: sleep, eat, rest`);
} else {
  console.log(`Today is ${today} so my day plan includes: work, work, work`);
}

// DRY code
const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

if (weekday === "Sunday" || weekday === "Saturday") {
  logDayPlan(today, "sleep, eat, rest");
} else {
  logDayPlan(today, "work, work, work");
}

function logDayPlan(weekday, tasks) {
  console.log(`Today is ${weekday} so my day plan includes: ${tasks}`);
}
```

</details>

### 2. KISS — _keep it short simple / keep it simple, stupid_

Иногда самым правильным решением является простейшая реализация задачи без ничего лишнего.

Чем проще код, тем легче его понять как вам, так и другим людям, занимающимся его поддержкой. Простота означает отказ от использования сложных шаблонов и ненужных усложнений.

<details>
    <summary>Examples:</summary>

Примером нарушения этого принципа является написание отдельной функции только для выполнения операции сложения или использование побитового оператора (сдвиг вправо >> 1) для деления целых чисел на 2.

`(4 >> 1) === (4 / 2)`

Для некоторых компиляторов программ это может быть более эффективно, чем обычное деление `/2`, но ясность кода сильно снижается.

> Важное примечание: для механизмов JS эффективность операции сдвига компенсируется дорогостоящим преобразованием в целое число. - [more here](https://thefullsnack.com/en/bitwise-javascript-fast.html).

Принимая этот подход, вы применяете умное кодирование и чрезмерную оптимизацию. И то, и другое в конечном итоге будет делать ваш код все менее и менее понятным как для других разработчиков, так и для вас самих. Помните, что вам, возможно, придется снова столкнуться с этим кодом через месяц, два или год.

</details>

<details>
    <summary>Want to know more!</summary>

**History:**

Принцип проектирования, используемый ВМС США в 1960 году. Принцип KISS гласит, что большинство систем работают лучше всего, если они остаются простыми, а не усложняются. Поэтому в дизайне простота должна быть ключевой целью и следует избегать ненужной сложности. Фраза ассоциировалась с авиаконструктором Кларенсом Джонсоном (1910–1990). В 1970-е годы широко использовался термин «принцип KISS». Вариации этой фразы включают: «Keep it Simple, Silly", "keep it short and simple", "keep it simple and straightforward", and "keep it small and simple.».

[More on Wikipedia](https://en.wikipedia.org/wiki/KISS_principle)

</details>

### 3. YAGNI — _You ain't gonna need it_

Все, что не требуется для того, чтобы проект работал так, как запланировано, в нем быть не должно.

Проще говоря, не стоит писать функционал на будущее, если он вам не нужен прямо сейчас. Желание писать код на будущее может иметь множество неприятных последствий:

— Вы теряете драгоценное время, которое можно было бы использовать для добавления, тестирования и улучшения действительно необходимого функционала.
- Новые функции должны быть протестированы и задокументированы.
- Ваши ненужные новые функции могут позже помешать вам добавить новые, но уже необходимые функции.
— Если код, который вы пишете, в конечном итоге понадобится, возможно, это не тот код.
— В конце концов лишний код может никогда и не понадобиться.
- Лишний код усложняет вашу программу (см. KISS).
- Добавление нового ненужного функционала может привести к желанию добавить еще больше нового ненужного функционала, что приведет к эффекту снежного кома.

[Martin Fowler about YAGNI](https://martinfowler.com/bliki/Yagni.html)

### 4. Comments

Объясните код, если необходимо, где это возможно.

Используйте комментарии для пояснения кода:

- Что он охватывает?
- Какова его цель?
- Почему это решение используется или предпочтительнее?

В то же время не пытайтесь покрыть весь код комментариями. Использование осмысленных имен переменных и функций, разбиение кода на логические фрагменты с помощью функций и другие приемы помогают сделать код максимально читабельным и понятным, не прибегая к комментариям (самодокументируемый код).

Тем не менее, бывают случаи, когда пояснительные комментарии необходимы независимо от того, как выглядит ваш код.

Обычно это происходит тогда, когда вам нужно добавить контекст к неинтуитивному решению.

```js
// Not recommended
const MAIN_TEXT_COLOUR = "#000000"; // color for main text on the page
```

Комментарий здесь излишен, поскольку он объясняет назначение константы, очевидное из названия переменной.

Вот хороший пример из библиотеки Lodash:

```js
// Recommended

function addSetEntry(set, value) {
  // Don't return `set.add`, as this call chain doesn't work in Internet Explorer 11
  set.add(value);
  return set;
}
```

[More about comments](https://javascript.info/comments)

#### 4.1. TODOs

_Some part of comments_

TODO — от английского _to do_ используется для обозначения запланированного изменения непосредственно в комментариях к коду. Обычно под этой задачей подразумеваются изменения не срочные, но весьма важные. Поэтому разработчики оставляют прямо в коде своего рода напоминание себе и другим программистам.

— Перед таким обозначением используйте префикс «TODO: ...».
- Используйте только этот тип обозначений для задач TODO.

```js
// TODO: move this magic number (15 rows) to the configuration file
for (let i = 0; i < 15; i++) {
  const row = document.createElement("tr");
  table.appendChild(row);
}
```

```html
<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

### 5. Files naming

Используйте в проекте то же руководство по стилю именования файлов.

Также удобно разделять файлы на `/js`, `/assets`, `/styles` (если иное не указано в требованиях). Также допускается покомпонентная структура папок (имеется в виду хранение всех файлов, относящихся к определенному компоненту, в одной папке).

```
/assets
	right-arrow-image.svg
	left-arrow-image.svg
/js
	app.js
	image-slider.js
/styles
	basic.css
	image-slider.css
/html
	index.html
	image-slider.html
```

### Continue

- [HTML and CSS recommendations - advanced level](html-and-css-extended.md)
- [Commits recommendations](commits.md)
