# Слайдеры

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Слайдер листает содержимое блока прямо на странице: обложки, отзывы, карточки товаров или фотографии команды. Посетитель переключает слайды стрелками, пагинацией или свайпом, а блок при этом занимает место одного экрана.

Сценарий подходит блокам, где элементов много, а место ограничено. Если изображения нужно открывать в полном размере, используйте [Галереи](./gallery.md).

Поведение включает расширение `landing_carousel`: его подключают в [манифесте блока](../manifest.md).

## Как настроить слайдер

Минимальный вариант:

```php
'assets' => [
    'ext' => ['landing_carousel'],
],
```

```html
<div class="js-carousel">
    <div class="js-slide">Slide 1</div>
    <div class="js-slide">Slide 2</div>
</div>
```

## Что делает расширение `landing_carousel`

Расширение находит контейнеры с классом `js-carousel`, собирает слайдер из их прямых потомков и читает настройки из `data-*` атрибутов контейнера. Отдельный селектор слайда расширение не задает: слайдом становится каждый прямой потомок контейнера.

Стрелки и пагинацию расширение добавляет само: в разметке блока их нет. Появятся они, только если заданы классы оформления — `data-arrows-classes` для стрелок и `data-pagi-classes` для пагинации. Без этих атрибутов элементы управления не создаются: задать одни лишь `data-arrow-left-classes` и `data-arrow-right-classes` недостаточно.

Слайдер построен на библиотеке Slick, поэтому внутри `data-responsive` используются имена ее параметров, а не имена `data-*` атрибутов.

## Разметка

В разметке используются два служебных класса:

- `js-carousel` — корневой контейнер слайдера
- `js-slide` — отдельный слайд. Этот класс нужен для оформления: по нему подключаются стили штатных блоков. На поиск слайдов он не влияет

По умолчанию слайдер показывает один слайд, без стрелок, пагинации и автопрокрутки. Поведение настраивается через `data-*` атрибуты на элементе `js-carousel`.

## Основные атрибуты

Логические атрибуты принимают значения `true` и `false`.

#|
|| **Атрибут** | **Значение** | **Что задает** ||
|| `data-slides-show` | Число | Количество слайдов на экране. По умолчанию `1` ||
|| `data-slides-scroll` | Число | Количество слайдов за один шаг ||
|| `data-initial-slide` | Число | Слайд, который показан при загрузке. Отсчет с единицы: `1` — первый слайд ||
|| `data-rows` | Число | Количество строк слайдера ||
|| `data-infinite` | `true`, `false` | Зацикливание слайдов ||
|| `data-autoplay` | `true`, `false` | Автопрокрутку ||
|| `data-speed` | Число | Интервал автопрокрутки в миллисекундах. По умолчанию `3000` ||
|| `data-pause-hover` | `true`, `false` | Остановку автопрокрутки при наведении ||
|| `data-fade` | `true`, `false` | Смену слайдов через прозрачность. Корректно работает при `data-slides-show="1"` ||
|| `data-vertical` | `true`, `false` | Вертикальный режим слайдера ||
|| `data-adaptive-height` | `true`, `false` | Подстройку высоты контейнера под текущий слайд ||
|| `data-center-mode` | `true`, `false` | Центрирование активного слайда ||
|| `data-center-padding` | Размер с единицей, например `40px` | Отступы по краям в режиме центрирования ||
|| `data-variable-width` | `true`, `false` | Слайды переменной ширины ||
|| `data-rtl` | `true`, `false` | Отображение справа налево ||
|| `data-lazy-load` | Режим загрузки, например `ondemand` | Ленивую загрузку изображений ||
|| `data-arrows-classes` | Строка CSS-классов | Классы для обеих стрелок. Без этого атрибута стрелки не создаются ||
|| `data-arrow-left-classes` | Строка CSS-классов | Классы для левой стрелки ||
|| `data-arrow-right-classes` | Строка CSS-классов | Классы для правой стрелки ||
|| `data-pagi-classes` | Строка CSS-классов | Классы для блока пагинации. Без этого атрибута пагинация не выводится ||
|| `data-nav-for` | CSS-селектор другого слайдера | Связь двух слайдеров, например с полосой превью ||
|| `data-is-thumbs` | `true`, `false` | Режим слайдера-превью для связки с `data-nav-for`. Работает, только если у контейнера задан атрибут `id` ||
|| `data-responsive` | JSON-массив правил | Настройки для отдельных брейкпоинтов ||
|#

## Адаптивные правила `data-responsive`

В `data-responsive` передают валидный JSON-массив. У каждого правила два ключа:

- `breakpoint` — ширина экрана в пикселях
- `settings` — настройки для этого брейкпоинта

Внутри `settings` используются имена параметров Slick:

#|
|| **Параметр в `settings`** | **Аналог среди `data-*`** | **Что задает** ||
|| `slidesToShow` | `data-slides-show` | Количество слайдов на экране ||
|| `slidesToScroll` | `data-slides-scroll` | Количество слайдов за один шаг ||
|| `autoplay` | `data-autoplay` | Автопрокрутку ||
|| `autoplaySpeed` | `data-speed` | Интервал автопрокрутки в миллисекундах ||
|| `pauseOnHover` | `data-pause-hover` | Остановку автопрокрутки при наведении ||
|| `fade` | `data-fade` | Смену слайдов через прозрачность ||
|| `vertical` | `data-vertical` | Вертикальный режим слайдера ||
|| `arrows` | — | Показ стрелок. На верхнем уровне стрелки включают классами `data-arrows-classes` ||
|| `prevArrow`, `nextArrow` | `data-arrow-left-classes`, `data-arrow-right-classes` | Разметку или селектор стрелок ||
|| `dots` | — | Показ пагинации ||
|| `dotsClass` | `data-pagi-classes` | CSS-класс контейнера пагинации. К значению из `data-pagi-classes` расширение всегда добавляет служебный класс `js-pagination` ||
|#

## Пример

```html
<div class="js-carousel"
    data-arrows-classes="u-arrow-v1 g-absolute-centered--y g-width-45 g-height-45 g-color-white g-bg-primary"
    data-arrow-left-classes="fa fa-chevron-left g-left-0"
    data-arrow-right-classes="fa fa-chevron-right g-right-0"
    data-pagi-classes="u-carousel-indicators-v1 g-absolute-centered--x g-bottom-60 text-center"
    data-slides-show="3"
    data-slides-scroll="2"
    data-autoplay="true"
    data-speed="1000"
    data-pause-hover="true"
    data-center-mode="true"
    data-center-padding="40px"
    data-initial-slide="1"
    data-adaptive-height="true"
    data-lazy-load="ondemand"
    data-responsive='[
        {
            "breakpoint": 768,
            "settings": {
                "slidesToShow": 2
            }
        },
        {
            "breakpoint": 576,
            "settings": {
                "slidesToShow": 1
            }
        }
    ]'>

    <div class="js-slide g-height-50vh g-brd-gray-light-v3 g-brd-around g-bg-primary-opacity-0_1">
        <div class="g-flex-centered w-100 h-100">
            <h3>Slide 1</h3>
        </div>
    </div>

    <div class="js-slide g-height-50vh g-brd-gray-light-v3 g-brd-around g-bg-primary-opacity-0_1">
        <div class="g-flex-centered w-100 h-100">
            <h3>Slide 2</h3>
        </div>
    </div>
</div>
```

## Совмещение с галереей

Слайдер сочетается с галереей: изображения листаются в блоке и открываются в окне просмотра. Порядок подключения расширений важен, он описан в статье [Галереи](./gallery.md).

## Примеры штатных блоков

Коды некоторых штатных блоков:

- `01.big_with_text`
- `01.big_with_text_blocks`
- `28.5.team_4_cols_slider`
- `39.1.five_blocks_carousel`
- `45.2.gallery_app_with_slider` — с галереей

## Как изменить настройки слайдера через REST

Поведение слайдера задают `data-*` атрибуты контейнера, поэтому их значения меняет метод [landing.block.updateattrs](../methods/landing-block-update-attrs.md). Доступны только те атрибуты, которые описаны в ключе [attrs](../attributes.md) манифеста блока.

Слайды — это карточки блока, поэтому их состав меняют методы [landing.block.addcard](../methods/landing-block-add-card.md), [landing.block.clonecard](../methods/landing-block-clone-card.md), [landing.block.removecard](../methods/landing-block-remove-card.md) и [landing.block.updateCards](../methods/landing-block-update-cards.md), а содержимое слайда — [landing.block.updatenodes](../methods/landing-block-update-nodes.md).

## Права и ограничения

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Ограничения:

- свой класс контейнера задать нельзя: расширение ищет `js-carousel`
- в редакторе зацикливание принудительно отключается, поэтому `data-infinite` проверяют в превью или на опубликованной странице
- при включенном `data-vertical` одновременно работает вертикальный свайп, поэтому для мобильных вертикальный режим обычно отключают правилом в `data-responsive`

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./gallery.md)
- [{#T}](./timer.md)
- [{#T}](../manifest.md)
- [{#T}](../node-types.md)
