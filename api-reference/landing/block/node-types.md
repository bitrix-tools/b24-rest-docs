# Типы нод

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Нода — это редактируемый элемент блока: заголовок, картинка, кнопка, иконка, видео или карта. Ноды описываются в ключе `nodes` файла [манифеста блока](./manifest.md): каждая привязана к CSS-селектору, а ее тип определяет, какой формой элемент редактируется в интерфейсе и в каком формате хранится значение.

Тип ноды нужен в двух случаях: когда вы собираете собственный блок и передаете манифест методом [landing.repo.register](../user-blocks/landing-repo-register.md), и когда меняете блок через REST — селектор и формат значения в [landing.block.updatenodes](./methods/landing-block-update-nodes.md) зависят от типа ноды.

Ноды описывают только редактируемые элементы. Оформление блока задает ключ `style`, дополнительные настройки — ключ [attrs](./attributes.md), повторяемые элементы — ключ `cards`.

После этой статьи вы сможете описать ноды в манифесте своего блока и подобрать формат значения для метода [landing.block.updatenodes](./methods/landing-block-update-nodes.md).

## Какие бывают типы нод

#|
|| **Тип** | **Что редактирует** | **Типовая разметка** ||
|| `text` | Текст заголовка, абзаца или подписи | `<h2>`, `<div>`, `<span>` ||
|| `img` | Изображение или фон контейнера. Используйте, когда изображение меняют как контент | `<img>`, `<div>` с `background-image` ||
|| `link` | Адрес ссылки и связанные параметры | `<a>` ||
|| `icon` | CSS-класс иконки | `<i>` ||
|| `embed` | Встраиваемое медиа с внешнего сервиса, например видео с YouTube | `<iframe>` ||
|| `map` | Карту с центром, масштабом и маркерами | `<div>` с атрибутом `data-map` ||
|| `component` | Встроенный компонент Битрикс24, например каталог товаров | Пустой `<div>`-контейнер ||
|| `styleimg` | Изображение, которым управляют стилевые настройки. Используйте для фона и обложек, которые задают в форме дизайна | Пустой `<div>`-контейнер ||
|#

## Поля ноды

У ноды есть общие поля, которые используются у разных типов и задают базовую настройку элемента в редакторе. Отдельно от них есть типозависимые поля, которые работают только для конкретных типов.

Общие поля:

- `name` — название ноды в интерфейсе редактирования
- `type` — тип ноды
- `allowInlineEdit` — управление доступностью ноды для инлайн-редактирования. Если передать `false`, нода будет недоступна для инлайн-редактирования, но останется доступной в форме редактирования блока
- `useInDesigner` — управление участием ноды в дизайнере блока. Если передать `false`, элемент будет проигнорирован в дизайнере блока
- `group` — группировка нод. Если нескольким нодам в одном блоке задать одинаковое значение, при клике на любую из них откроется общая форма редактирования группы

Поля для отдельных типов:

#|
|| **Поле** | **Для каких типов** | **Что задает** ||
|| `dimensions` | `img` | Ограничения размеров загружаемого изображения ||
|| `create2xByDefault` | `img` | Создание версии изображения `2x` по умолчанию ||
|| `skipContent` | `link` | Сохранение внутреннего содержимого ссылки без изменений ||
|| `extra` | `component` | Описание редактируемых параметров компонента ||
|#

Набор полей зависит от типа ноды и конкретного сценария блока.

## Описание типов

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

Нода изображения. Нодой может быть отдельный тег `<img>` или фоновое изображение контейнера, например `<div>`.

Для этого типа рекомендуется задавать `dimensions`, чтобы контролировать размер загружаемых изображений и не хранить в Битрикс24 слишком большие файлы.

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
- для фонового элемента, например `<div>`, используется CSS-свойство `background-image`

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

Значение такой ноды — объект. Его ключи передают в методе [landing.block.updatenodes](./methods/landing-block-update-nodes.md), а система раскладывает их по атрибутам элемента:

- `src` — адрес встраиваемого контента. Для `<iframe>` сохраняется в атрибут `src`, для других вариантов встраивания может использоваться `data-src`
- `source` — исходный URL, сохраняется в атрибут `data-source`
- `preview` — URL превью-изображения, сохраняется в `data-preview`
- `ratio` — соотношение сторон контейнера. Допустимые значения: `embed-responsive-16by9`, `embed-responsive-9by16`, `embed-responsive-4by3`, `embed-responsive-3by4`, `embed-responsive-21by9`, `embed-responsive-9by21`, `embed-responsive-1by1`. Значение применяется, только если в том же вызове передан новый `src` и родитель ноды имеет класс `embed-responsive`

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

Провайдер задается атрибутом `data-map-provider`, поддерживаются значения `google` и `yandex`. Как провайдер выбирается при добавлении блока, описано в статье [Карты в блоках](./special/maps.md).

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

## Как изменить ноду через REST

Селекторы нод из манифеста используют методы изменения блока:

- содержимое ноды меняет [landing.block.updatenodes](./methods/landing-block-update-nodes.md). Ключ в параметре `data` — это селектор ноды, а формат значения зависит от типа ноды. Форматы для каждого типа перечислены в разделе [Форматы значений в data](./methods/landing-block-update-nodes.md#value-formats)
- название тега ноды меняет [landing.block.changeNodeName](./methods/landing-block-change-node-name.md), например `h2` на `h3`
- изображение для ноды типа `img` сначала загружают методом [landing.block.uploadfile](./methods/landing-block-upload-file.md), а затем подставляют полученный `src` методом `landing.block.updatenodes`

Узнать, какие ноды есть в конкретном блоке, можно методом [landing.block.getmanifest](./methods/landing-block-get-manifest.md) для размещенного блока или [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) для шаблона из репозитория.

## Права и ограничения

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Ограничения:

- изменить можно только те элементы, которые описаны в ключе `nodes`. Селекторы, которых нет в манифесте, метод [landing.block.updatenodes](./methods/landing-block-update-nodes.md) игнорирует
- селектор ноды лучше не делать совпадающим с селектором карточки того же блока: система этого не запрещает, но в редакторе будет непонятно, что редактируется
- у селектора из `nodes` не должно быть в `style` фонового типа `background`, `block-default` или `block-border`: [landing.repo.register](../user-blocks/landing-repo-register.md) вернет ошибку `MANIFEST_INTERSECT_IMG`
- свой набор нод описывают только в собственном блоке: его регистрируют методом [landing.repo.register](../user-blocks/landing-repo-register.md). Манифест штатного блока Битрикс24 через REST не меняется, подробнее: [Файл манифеста](./manifest.md)

## Продолжите изучение

- [{#T}](./manifest.md)
- [{#T}](./attributes.md)
- [{#T}](./extended-description.md)
- [{#T}](./localization.md)
- [{#T}](./methods/landing-block-update-nodes.md)
- [{#T}](./methods/landing-block-get-manifest.md)
