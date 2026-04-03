# Типы нод

Ноды описываются в ключе `nodes` файла [манифеста блока](./manifest.md). Каждая нода привязывается к CSS-селектору и задает, как конкретный элемент блока редактируется в интерфейсе.

## Поля ноды

У ноды есть общие поля, которые используются у разных типов и задают базовую настройку элемента в редакторе. Отдельно от них есть типозависимые поля, которые работают только для конкретных типов.

Общие поля:

- `name` — название ноды в интерфейсе редактирования
- `type` — тип ноды
- `allowInlineEdit` — управление доступностью ноды для инлайн-редактирования. Если передать `false`, нода будет недоступна для инлайн-редактирования, но останется доступной в форме редактирования блока
- `useInDesigner` — управление участием ноды в дизайнере блока. Если передать `false`, элемент будет проигнорирован в дизайнере блока
- `group` — группировка нод. Если нескольким нодам в одном блоке задать одинаковое значение, при клике на любую из них откроется общая форма редактирования группы

Поля для отдельных типов:

- `dimensions` — параметры размеров изображения для `img`
- `create2xByDefault` — включать создание версии `2x` по умолчанию для `img`
- `skipContent` — не изменять внутренний контент при сохранении для `link`
- `extra` — описание редактируемых параметров компонента для `component`

Набор полей зависит от типа ноды и конкретного сценария блока.

## Типы нод

### text

Текстовая нода для заголовков, абзацев и других текстовых элементов.

```php
'.landing-block-node-card-title' => [
    'name' => 'Заголовок',
    'type' => 'text',
],
```

```html
<h2 class="landing-block-node-card-title">Company24 video</h2>
```

### img

Нода изображения. Допускается как отдельный тег `<img>`, так и фоновое изображение для контейнера, например `<div>`.

Для этого типа рекомендуется задавать `dimensions`, чтобы контролировать размер загружаемых изображений и не перегружать портал слишком большими файлами.

Поддерживаются варианты `dimensions`:

- `width` / `height` — привести к фиксированному размеру
- `maxWidth` / `maxHeight` — уменьшать, если изображение больше заданного размера
- `minWidth` / `minHeight` — увеличивать, пока не достигнут минимум

```php
'.landing-block-node-card-image' => [
    'name' => 'Изображение',
    'type' => 'img',
    'dimensions' => [
        'maxWidth' => 1920,
        'maxHeight' => 1080,
    ],
],
```

```html
<img class="landing-block-node-card-image" src="/upload/demo.jpg" alt="">
```

Чтобы изображение отображалось, у ноды должен быть задан источник изображения:
- для тега `<img>` используется атрибут `src`
- для фонового элемента, например, `<div>`, используется CSS-свойство `background-image`

### link

Нода ссылки. Позволяет редактировать адрес и связанные параметры ссылки, например текст ссылки или режим открытия.

```php
'.landing-block-node-card-button' => [
    'name' => 'Кнопка',
    'type' => 'link',
],
```

```html
<a class="landing-block-node-card-button btn btn-primary" href="/">Read more</a>
```

Если ссылка оборачивает нетекстовый контент, можно указать `skipContent => true`, чтобы не изменять внутреннее содержимое при сохранении:

```php
'.landing-block-node-card-button' => [
    'name' => 'Кнопка',
    'type' => 'link',
    'skipContent' => true,
],
```

### icon

Нода иконки. Обычно меняет CSS-класс, который определяет отображаемую иконку.

```php
'.landing-block-node-list-item-icon' => [
    'name' => 'Иконка',
    'type' => 'icon',
],
```

```html
<i class="landing-block-node-list-item-icon fa fa-check"></i>
```

### embed

Нода встраиваемого медиа-контента, например видео.

В типовом сценарии для этой ноды используются поля:
- `src` — адрес встраиваемого контента. Для `<iframe>` сохраняется в атрибут `src`, для других вариантов встраивания может использоваться `data-src`
- `source` — исходный URL, сохраняется в атрибут `data-source`
- `preview` — URL превью-изображения, сохраняется в `data-preview`
- `ratio` — соотношение сторон контейнера. Используется служебный CSS-класс вида `embed-responsive-*`

```php
'.landing-block-node-video' => [
    'name' => 'Видео',
    'type' => 'embed',
],
```

```html
<div class="embed-responsive embed-responsive-16by9">
    <iframe
        class="landing-block-node-video"
        width="100%"
        src="//www.youtube.com/embed/q4d8g9Dn3ww"
        data-source="https://www.youtube.com/watch?v=q4d8g9Dn3ww"
        data-preview="https://example.com/preview.jpg"
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

### map

Нода карты для блоков с географической привязкой.

В текущей реализации используются провайдеры `google` и `yandex`. Если провайдер явно не задан, используется `google` по умолчанию.

Типовая структура значения карты в `data-map` включает:
- `center` — координаты центра карты
- `zoom` — уровень масштабирования
- `markers` — массив маркеров

```php
'.landing-block-node-map' => [
    'name' => 'Карта',
    'type' => 'map',
],
```

```html
<div
    class="landing-block-node-map"
    data-map-provider="google"
    data-map='{
        "center":{"lat":55.751244,"lng":37.618423},
        "zoom":12,
        "markers":[
            {
                "title":"Офис",
                "description":"Москва, центр",
                "showByDefault":true,
                "latLng":{"lat":55.751244,"lng":37.618423}
            }
        ]
    }'>
</div>
```

### component

Нода для встраивания компонента в структуру блока.

```php
'.landing-block-node-catalog' => [
    'name' => 'Каталог',
    'type' => 'component',
],
```

```html
<div class="landing-block-node-catalog"></div>
```

### styleimg

Нода изображения, которым управляют через стилевые настройки блока.

```php
'.landing-block-node-cover' => [
    'name' => 'Фоновое изображение',
    'type' => 'styleimg',
],
```

```html
<div class="landing-block-node-cover"></div>
```

## Группировка нод

Чтобы несколько нод открывались в одной форме редактирования, укажите одинаковое значение `group`.

```php
'.landing-block-node-title' => [
    'name' => 'Заголовок',
    'type' => 'text',
    'group' => 'hero-content',
],
'.landing-block-node-text' => [
    'name' => 'Текст',
    'type' => 'text',
    'group' => 'hero-content',
],
'.landing-block-node-button' => [
    'name' => 'Кнопка',
    'type' => 'link',
    // без group: редактируется отдельно
],
```
